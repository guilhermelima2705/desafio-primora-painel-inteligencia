import assert from 'node:assert/strict';
import test from 'node:test';
import { buscarLista } from '../../src/api/http.js';

const baseUrl = 'https://api.example/';

test('cliente HTTP preserva array vazio e metadata da mesma resposta', async (t) => {
  const signal = new AbortController().signal;
  const fetch = t.mock.method(globalThis, 'fetch', async () => new Response('[]', {
    headers: { 'X-Dataset-Gerado-Em': '2026-09-01' },
  }));
  assert.deepEqual(await buscarLista('/unidades', { baseUrl, signal }), {
    itens: [], geradoEm: '2026-09-01',
  });
  assert.deepEqual(fetch.mock.calls[0].arguments, ['https://api.example/unidades', { signal }]);
});

for (const [nome, resposta, mensagem] of [
  ['rede', () => { throw new TypeError('fetch failed'); }, /conectar/],
  ['HTTP', () => new Response('erro', { status: 503 }), /503/],
  ['JSON inválido', () => new Response('{'), /JSON inválido/],
  ['resposta não-array', () => new Response('{}'), /formato inesperado/],
]) {
  test(`cliente HTTP sinaliza falha de ${nome}`, async (t) => {
    t.mock.method(globalThis, 'fetch', resposta);
    await assert.rejects(buscarLista('/clientes', { baseUrl }), mensagem);
  });
}

test('cliente HTTP tolera cabeçalho de data ausente', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('[]'));
  assert.equal((await buscarLista('/clientes', { baseUrl })).geradoEm, null);
});

test('cliente HTTP preserva cancelamento', async (t) => {
  const controller = new AbortController();
  t.mock.method(globalThis, 'fetch', async (_url, { signal }) => signal.throwIfAborted());
  controller.abort();
  await assert.rejects(buscarLista('/clientes', { baseUrl, signal: controller.signal }), { name: 'AbortError' });
});
