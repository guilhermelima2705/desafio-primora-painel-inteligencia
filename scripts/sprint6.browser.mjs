import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const modulePath = process.env.PLAYWRIGHT_MODULE;
if (!modulePath) throw new Error('Defina PLAYWRIGHT_MODULE para um Playwright disponível.');
const { chromium } = await import(pathToFileURL(modulePath).href);
const base = process.env.BASE_URL || 'http://127.0.0.1:5173';
const api = process.env.API_URL || 'https://localhost:7246';
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge' });

try {
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  const paths = [['/', 'unidades'], ['/comparativo', 'unidades'], ['/historico-clientes', 'clientes']];
  for (const [path, recurso] of paths) {
    const endpoint = `${api}/${recurso}`;
    let simularErro = true;
    let responder;
    const aguardar = new Promise(resolve => { responder = resolve; });
    const interceptar = async route => {
      if (simularErro) {
        await aguardar;
        await route.fulfill({ status: 503, body: 'indisponível' });
      } else {
        await route.fulfill({ json: [] });
      }
    };
    await page.route(endpoint, interceptar);
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    await page.locator('[role=status]').filter({ hasText: `Carregando ${recurso}` }).waitFor();
    responder();
    await page.getByText(`Não foi possível carregar ${recurso}.`, { exact: true }).waitFor();
    simularErro = false;
    await page.getByRole('button', { name: 'Tentar novamente' }).click();
    await page.getByText(`Sem dados de ${recurso} para exibir.`, { exact: true }).waitFor();
    assert.equal(await page.locator('.dataset-stamp time').count(), 0);
    await page.unroute(endpoint, interceptar);

    const requisicao = page.waitForResponse(endpoint);
    await page.reload();
    assert.equal((await requisicao).status(), 200);
    const data = page.locator('.dataset-stamp time');
    await data.waitFor();
    assert.equal(await data.getAttribute('datetime'), '2026-09-01');
    assert.equal(await data.textContent(), '01/09/2026');
    if (path === '/comparativo') {
      assert.deepEqual(await page.locator('.ranking-item strong').allTextContents(),
        ['Vetor Litoral', 'Vetor Sul', 'Vetor Centro-Oeste', 'Vetor Norte']);
    }
    console.log('OK carregamento, erro, retry, lista vazia e API real:', path);
  }
} catch (error) {
  console.error(await browser.contexts()[0]?.pages()[0]?.locator('body').innerText());
  throw error;
} finally {
  await browser.close();
}
