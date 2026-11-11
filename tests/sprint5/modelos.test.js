import assert from 'node:assert/strict';
import test from 'node:test';
import dataset from '../../src/data/dataset_painel_multitenant.json' with { type: 'json' };
import { Unidade } from '../../src/models/Unidade.js';
import { Cliente } from '../../src/models/Cliente.js';
import { Evento } from '../../src/models/Evento.js';
import { RegistroSaude } from '../../src/models/RegistroSaude.js';

test('Unidade preserva todos os campos e protege as referências na entrada e na saída', () => {
  const original = dataset.tenants[0];
  const entrada = structuredClone(original);
  const unidade = new Unidade(entrada);
  entrada.engagementTrend30d[0] = -1;
  entrada.funnelTrend30d[0] = -1;
  entrada.riscoDrivers.push('alterado');
  entrada.funnel90d.sucesso = -1;
  entrada.healthDistribution.saudavel = -1;
  unidade.engagementTrend30d[0] = -2;
  unidade.funnelTrend30d[0] = -2;
  unidade.riscoDrivers.pop();
  unidade.funnel90d.sucesso = -2;
  unidade.healthDistribution.saudavel = -2;
  assert.deepEqual(Object.fromEntries(Object.keys(original).map(campo => [campo, unidade[campo]])), original);
  assert.deepEqual(Object.keys(unidade), []);
});

test('Cliente encapsula eventos e scores em ordem e protege as coleções', () => {
  const original = dataset.clientes[0];
  const entrada = structuredClone(original);
  const cliente = new Cliente(entrada);
  entrada.eventos[0].titulo = 'alterado';
  entrada.healthSeries[0].score = 0;
  entrada.eventos.length = 0;
  cliente.getEventos().reverse();
  cliente.getHistoricoSaude().pop();
  const eventos = cliente.eventos;
  const scores = cliente.healthSeries;
  assert.ok(eventos.every(evento => evento instanceof Evento));
  assert.ok(scores.every(score => score instanceof RegistroSaude));
  assert.throws(() => { eventos[0].titulo = 'alterado'; }, TypeError);
  assert.throws(() => { scores[0].score = 0; }, TypeError);
  assert.deepEqual(eventos.map(evento => Object.fromEntries(
    Object.keys(original.eventos[0]).map(campo => [campo, evento[campo]]),
  )), original.eventos.map(({ data, tipo, titulo }) => ({ data, tipo, titulo })));
  assert.deepEqual(scores.map(({ data, score }) => ({ data, score })), original.healthSeries);
  assert.equal(cliente.tenantId, original.tenantId);
  assert.equal(cliente.tenantNome, original.tenantNome);
});

test('Evento preserva horário, valor ausente e zero', () => {
  const dados = { data: '2026-09-01T09:12:00', tipo: 'compra', titulo: 'Pedido' };
  assert.equal(new Evento(dados).valor, undefined);
  assert.equal(new Evento({ ...dados, valor: 0 }).valor, 0);
  assert.equal(new Evento(dados).data, dados.data);
  assert.throws(() => new Evento({ ...dados, data: dados.data + 'Z' }), TypeError);
  assert.throws(() => new Evento({ ...dados, valor: '0' }), TypeError);
});

test('RegistroSaude aceita os limites e rejeita scores e datas inválidos', () => {
  const data = '2024-02-29';
  for (const score of [0, 100]) assert.equal(new RegistroSaude({ data, score }).score, score);
  for (const score of [-1, 101, NaN, Infinity, '50', null]) {
    assert.throws(() => new RegistroSaude({ data, score }), TypeError);
  }
  assert.throws(() => new RegistroSaude({ data: '2026-02-29', score: 50 }), TypeError);
});

test('Modelos rejeitam campos obrigatórios inválidos', () => {
  assert.throws(() => new Unidade({ ...dataset.tenants[0], nome: ' ' }), TypeError);
  assert.throws(() => new Unidade({ ...dataset.tenants[0], funnel90d: {} }), TypeError);
  assert.throws(() => new Cliente({ ...dataset.clientes[0], eventos: null }), TypeError);
  assert.throws(() => new Evento({ ...dataset.clientes[0].eventos[0], tipo: '' }), TypeError);
});
