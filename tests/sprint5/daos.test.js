import assert from 'node:assert/strict';
import test, { beforeEach } from 'node:test';
import dataset from '../../src/data/dataset_painel_multitenant.json' with { type: 'json' };
import { UnidadeDAO } from '../../src/dao/UnidadeDAO.js';
import { ClienteDAO } from '../../src/dao/ClienteDAO.js';
import { Unidade } from '../../src/models/Unidade.js';
import { Cliente } from '../../src/models/Cliente.js';

const opcoes = { baseUrl: 'https://api.example' };

beforeEach(t => {
  t.mock.method(globalThis, 'fetch', async url => {
    if (url === 'https://api.example/unidades') return Response.json(dataset.tenants);
    if (url === 'https://api.example/clientes') return Response.json(dataset.clientes);
    throw new Error('Rota inesperada');
  });
});

test('UnidadeDAO lista quatro unidades e busca cada ID', async () => {
  const dao = new UnidadeDAO(opcoes);
  const consulta = dao.listar();
  assert.ok(consulta instanceof Promise);
  const unidades = await consulta;
  assert.equal(unidades.length, 4);
  assert.deepEqual(unidades.map(u => u.id), dataset.tenants.map(u => u.id));
  for (const unidade of unidades) {
    assert.ok(unidade instanceof Unidade);
    const resultado = await dao.buscarPorId(unidade.id);
    assert.ok(resultado instanceof Unidade);
    assert.equal(resultado.id, unidade.id);
  }
  assert.equal(await dao.buscarPorId('inexistente'), null);
});

test('ClienteDAO lista três clientes, busca cada ID e filtra por unidade', async () => {
  const dao = new ClienteDAO(opcoes);
  const consulta = dao.listar();
  assert.ok(consulta instanceof Promise);
  const clientes = await consulta;
  assert.equal(clientes.length, 3);
  assert.deepEqual(clientes.map(c => c.id), dataset.clientes.map(c => c.id));
  for (const cliente of clientes) {
    assert.ok(cliente instanceof Cliente);
    const resultado = await dao.buscarPorId(cliente.id);
    assert.ok(resultado instanceof Cliente);
    assert.equal(resultado.id, cliente.id);
  }
  const sul = await dao.listarPorUnidade('vetor-sul');
  assert.equal(sul.length, 2);
  assert.ok(sul.every(c => c instanceof Cliente && c.tenantId === 'vetor-sul'));
  assert.deepEqual(await dao.listarPorUnidade('vetor-norte'), []);
  assert.deepEqual(await dao.listarPorUnidade('inexistente'), []);
  assert.equal(await dao.buscarPorId('inexistente'), null);
});

test('Consultas rejeitam argumentos inválidos com TypeError', async () => {
  for (const id of [undefined, null, 123, {}, '', '  ']) {
    await assert.rejects(new UnidadeDAO(opcoes).buscarPorId(id), TypeError);
    await assert.rejects(new ClienteDAO(opcoes).buscarPorId(id), TypeError);
    await assert.rejects(new ClienteDAO(opcoes).listarPorUnidade(id), TypeError);
  }
});

test('Consultas independentes preservam o dataset e todos os valores de evento', async () => {
  const antes = structuredClone(dataset);
  const unidades = await new UnidadeDAO(opcoes).listar();
  unidades[0].funnel90d.sucesso = -1;
  unidades.pop();
  const clientes = await new ClienteDAO(opcoes).listar();
  for (const cliente of clientes) {
    const original = antes.clientes.find(c => c.id === cliente.id);
    assert.deepEqual(cliente.getEventos().map(({ data, tipo, titulo, valor }) => ({ data, tipo, titulo, valor })),
      original.eventos.map(({ data, tipo, titulo, valor }) => ({ data, tipo, titulo, valor })));
    cliente.getEventos().length = 0;
  }
  assert.deepEqual(dataset, antes);
  assert.equal((await new UnidadeDAO(opcoes).listar()).length, 4);
});
