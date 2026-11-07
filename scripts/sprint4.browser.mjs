import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const modulePath = process.env.PLAYWRIGHT_MODULE;
if (!modulePath) throw new Error('Defina PLAYWRIGHT_MODULE para um Playwright já disponível.');
const { chromium } = await import(pathToFileURL(modulePath).href);
const dataset = JSON.parse(readFileSync(new URL('../src/data/dataset_painel_multitenant.json', import.meta.url), 'utf8'));
const base = process.env.BASE_URL || 'http://127.0.0.1:5173';
const format = new Intl.NumberFormat('pt-BR');
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true });
try {
  const page = await browser.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let documentLoads = 0;
  page.on('request', request => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentLoads++; });
  async function select(label, name, count) {
    const control = page.getByRole('combobox', { name: label, exact: true });
    await control.click();
    const options = page.locator('.ant-select-dropdown:visible .ant-select-item-option');
    await options.first().waitFor({ state: 'visible' });
    assert.equal(await options.count(), count);
    await options.filter({ hasText: name }).click();
    await page.locator('.ant-select-dropdown:visible').waitFor({ state: 'hidden' });
  }
  async function stableDocument(action) {
    const before = documentLoads;
    await page.evaluate(() => { window.__sprint4Document = 'preservado'; });
    await action();
    assert.equal(await page.evaluate(() => window.__sprint4Document), 'preservado');
    assert.equal(documentLoads, before, 'Uma seleção recarregou a página');
  }
  async function dataRows(selector) {
    return page.locator(selector).evaluateAll(rows => rows.map(row => [...row.cells].map(cell => cell.textContent.trim())));
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base);
  await page.waitForSelector('.unit-card');
  assert.equal(await page.locator('.unit-card h3').innerText(), dataset.tenants[0].nome);
  for (const unit of dataset.tenants) {
    await stableDocument(async () => {
      await select('Unidade regional', unit.nome, 4);
      assert.equal(await page.locator('.unit-card h3').innerText(), unit.nome);
      assert.equal(await page.locator('.unit-primary').innerText(), format.format(unit.carteiraTotalClientes));
      assert.deepEqual(await page.locator('.unit-secondary strong').allTextContents(), [format.format(unit.engagementEvents7d), format.format(unit.funnel90d.sucesso)]);
      assert.deepEqual(await dataRows('.dark-panel tbody tr'), unit.engagementTrend30d.map((value, i) => [String(i + 1), format.format(value)]));
      assert.deepEqual(await dataRows('.overview-charts > :nth-child(2) tbody tr'), [[unit.nome, ...['saudavel', 'atencao', 'risco', 'critico'].map(key => String(unit.healthDistribution[key]))]]);
      assert.equal(await page.locator('.recharts-area').count(), 1);
      assert.ok(await page.locator('.recharts-area-area').getAttribute('d'));
    });
    console.log('OK unidade:', unit.nome);
  }
  await page.goto(base + '/historico-clientes');
  await page.waitForSelector('.client-profile');
  assert.equal(await page.locator('.client-profile h3').innerText(), dataset.clientes[0].nome);
  for (const client of dataset.clientes) {
    await stableDocument(async () => {
      await select('Cliente', client.nome, 3);
      assert.equal(await page.locator('.client-profile h3').innerText(), client.nome);
      assert.ok((await page.locator('.client-id').innerText()).includes(client.id));
      assert.deepEqual(await page.locator('.client-profile dd').allTextContents(), [client.tenantNome, String(client.eventos.length)]);
      assert.deepEqual(await dataRows('.client-health tbody tr'), client.healthSeries.map(point => [point.data.split('-').reverse().join('/'), String(point.score)]));
      const events = [...client.eventos].sort((a,b) => b.data.localeCompare(a.data));
      assert.deepEqual(await page.locator('.timeline-event time').evaluateAll(items => items.map(item => item.dateTime)), events.map(event => event.data));
      assert.deepEqual(await page.locator('.timeline-event > .ant-typography').allTextContents(), events.map(event => event.titulo));
      assert.equal(await page.locator('.recharts-line-dot').count(), client.healthSeries.length);
    });
    console.log('OK cliente:', client.nome);
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/historico-clientes', '/comparativo']) {
      await page.goto(base + route);
      await page.waitForSelector('.recharts-surface');
      const geometry = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, charts: [...document.querySelectorAll('.recharts-responsive-container')].map(chart => chart.getBoundingClientRect().width) }));
      assert.ok(geometry.scroll <= geometry.width, `${width} ${route}: rolagem externa`);
      assert.ok(geometry.charts.every(value => value > 0));
      if (route === '/comparativo') {
        assert.equal(await page.locator('.ranking-item').count(), 4);
        assert.equal(await page.locator('.ant-table-tbody tr[data-row-key]').count(), 4);
      } else {
        await stableDocument(() => route === '/' ? select('Unidade regional', dataset.tenants[3].nome, 4) : select('Cliente', dataset.clientes[2].nome, 3));
      }
      console.log('OK responsividade:', width, route);
    }
    if (width < 992) await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page.locator(width < 992 ? '.ant-drawer .ant-menu-item' : '.app-sidebar .ant-menu-item').filter({ hasText: 'Histórico de Clientes' }).click();
    await page.waitForURL('**/historico-clientes');
    if (width < 992) await page.locator('.ant-drawer-content').waitFor({ state: 'hidden' });
  }
  assert.deepEqual(errors, []);
  console.log('Sprint 4: todas as seleções, séries, eventos, navegação e larguras passaram, sem recarregamento ou erros de execução.');
} finally {
  await browser.close();
}
