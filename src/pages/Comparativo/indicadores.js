// Todas as métricas partem dos campos oficiais de tenants, sem alterar o JSON.
export function percentual(numerador, denominador) {
  return denominador > 0 ? (numerador / denominador) * 100 : null;
}

export function criarComparativo(tenants) {
  return tenants.map((unidade) => {
    const clientesEmRisco = unidade.healthDistribution.risco
      + unidade.healthDistribution.critico;

    return {
      ...unidade,
      clientesEmRisco,
      // Participação de clientes em risco ou críticos na carteira total.
      riscoPercentual: percentual(clientesEmRisco, unidade.carteiraTotalClientes),
      // Tarefas concluídas com sucesso sobre todas as tarefas geradas em 90 dias.
      sucessoPercentual: percentual(unidade.funnel90d.sucesso, unidade.funnel90d.gerada),
    };
  }).sort((a, b) =>
    (b.riscoPercentual ?? -1) - (a.riscoPercentual ?? -1)
    || a.nome.localeCompare(b.nome, 'pt-BR'),
  );
}
