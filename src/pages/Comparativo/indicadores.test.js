import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { criarComparativo, percentual } from './indicadores.js';

const dataset = JSON.parse(readFileSync(
  new URL('../../data/dataset_painel_multitenant.json', import.meta.url), 'utf8',
));

test('ranking oficial prioriza risco proporcional, sem privilegiar o porte', () => {
  const antes = JSON.stringify(dataset);
  const resultado = criarComparativo(dataset.tenants);
  assert.deepEqual(resultado.map((unidade) => unidade.id), [
    'vetor-litoral', 'vetor-sul', 'vetor-centro-oeste', 'vetor-norte',
  ]);
  assert.equal(resultado.length, 4);
  assert.equal(JSON.stringify(dataset), antes);
  const litoral = resultado[0];
  assert.equal(litoral.clientesEmRisco, 30);
  assert.ok(Math.abs(litoral.riscoPercentual - 39.473684210526315) < 1e-10);
  assert.ok(Math.abs(litoral.sucessoPercentual - 28.852459016393443) < 1e-10);
  const centro = resultado.find((unidade) => unidade.id === 'vetor-centro-oeste');
  assert.equal(centro.clientesEmRisco, 82);
  assert.ok(Math.abs(centro.sucessoPercentual - 47.05882352941176) < 1e-10);
});

test('denominador zero não produz taxa infinita nem zero enganoso', () => {
  assert.equal(percentual(0, 0), null);
  assert.equal(percentual(10, 0), null);
  assert.equal(percentual(0, 10), 0);
});

test('empates são determinísticos e unidades sem base ficam por último', () => {
  const base = dataset.tenants[0];
  const criar = (nome, carteira) => ({
    ...base, nome, carteiraTotalClientes: carteira,
    healthDistribution: { risco: 1, critico: 0 },
  });
  const resultado = criarComparativo([
    criar('Zeta', 10), criar('Sem base', 0), criar('Alfa', 10),
  ]);
  assert.deepEqual(resultado.map((unidade) => unidade.nome), ['Alfa', 'Zeta', 'Sem base']);
  assert.equal(resultado[2].riscoPercentual, null);
});
