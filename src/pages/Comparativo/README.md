# Comparativo entre unidades

A página importa diretamente `src/data/dataset_painel_multitenant.json` e apresenta as quatro unidades fictícias, sem API ou persistência.

## Indicadores e denominadores

- Clientes em risco ou críticos: `healthDistribution.risco + healthDistribution.critico`.
- Risco proporcional (%): `(healthDistribution.risco + healthDistribution.critico) / carteiraTotalClientes * 100`.
- Taxa de sucesso do funil em 90 dias (%): `funnel90d.sucesso / funnel90d.gerada * 100`.

A carteira total normaliza o ranking de risco por porte. A taxa do funil usa todas as tarefas geradas como base; tarefas vistas, falhas e sucessos não são somados como se fossem conjuntos independentes. Não se divide sucesso por carteira, nem eventos de sete dias por tarefas de noventa dias.

O ranking é decrescente por risco proporcional, sem score composto, pesos ou limites de alerta inventados. Empates são ordenados pelo nome. Divisão com denominador zero retorna ausência de informação, apresentada como “Não disponível” e posicionada após unidades com base válida. O JSON é preservado e a ordenação usa taxas não arredondadas; a apresentação usa uma casa decimal.

## Gráfico e tabela

As barras horizontais mostram o risco proporcional numa escala comum de 0 a 100%, permitindo comparar rapidamente a ordem de atenção sem favorecer a maior unidade. A tabela apresenta a mesma métrica e as bases absolutas, além do sucesso do funil, para uma leitura mais precisa. Não são medidas preditivas.

O gráfico ocupa a largura disponível e tem altura definida. A tabela possui rolagem horizontal interna para preservar a leitura das colunas no celular. Os títulos dos cartões podem quebrar linha. A interface informa que os dados são fictícios.

## Referências acadêmicas consultadas

Os documentos fornecidos com o desafio, `Desafio_2_Frontend_PainelMultiTenant.docx` e `LEIA-ME.md.docx`, pedem comparação proporcional e justificativa para gráfico e tabela. A stack React/Vite/Ant Design existente foi mantida, com adição apenas do Recharts. Filtros, agrupamento da timeline e alterações nos demais módulos estão fora desta implementação.

## Verificação

```powershell
node --test src/pages/Comparativo/indicadores.test.js
npm.cmd run lint
npm.cmd run build
```

Os testes verificam o ranking e taxas conhecidas do dataset oficial, a preservação dos dados, denominador zero e desempate. A validação visual deve conferir `/comparativo` em desktop e celular, o gráfico, a rolagem da tabela e a navegação entre as três páginas.
