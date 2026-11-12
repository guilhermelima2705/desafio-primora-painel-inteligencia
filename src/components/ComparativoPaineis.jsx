import { useState } from 'react';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert, Card, Flex, Grid, Progress, Select, Statistic, Table, Tag, Typography } from 'antd';
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const { Paragraph } = Typography;
const { useBreakpoint } = Grid;
const numero = new Intl.NumberFormat('pt-BR');
const formatoPercentual = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const exibirPercentual = (valor) => (valor == null ? 'Não disponível' : `${formatoPercentual.format(valor)}%`);
const posicao = (unidade, indice) => (unidade.riscoPercentual == null ? '—' : indice + 1);

// Aviso menor no celular, usando a API de estilos do próprio Alert (antd 6)
const estiloAvisoCelular = { root: { padding: '10px 12px' }, icon: { fontSize: 16, marginInlineEnd: 8 }, title: { fontSize: 14, fontWeight: 650 } };

// Lista "Indicadores por unidade" e aviso da carteira
export function RankingResumo({ unidades }) {
  const telas = useBreakpoint();
  return <aside className="comparison-context">
    <Card className="ranking-summary" title="Indicadores por unidade">
      <p className="panel-description">Ordenação pelo risco proporcional, do maior para o menor.</p>
      {unidades.map((unidade, indice) => <Flex className="ranking-item" align="center" gap={11} key={unidade.id}>
        <span className="ranking-position">{posicao(unidade, indice)}</span>
        <Flex vertical gap={4}><strong>{unidade.nome}</strong>
          <span>Risco <b>{exibirPercentual(unidade.riscoPercentual)}</b>{' · '}Sucesso <b>{exibirPercentual(unidade.sucessoPercentual)}</b></span>
        </Flex>
      </Flex>)}
    </Card>
    <Alert title="Comparação proporcional à carteira" type="info" showIcon styles={telas.md ? undefined : estiloAvisoCelular}
      description={telas.md
        ? 'O ranking usa a soma de clientes em risco e em estado crítico dividida pela carteira total. Assim, uma unidade maior não recebe prioridade apenas por ter mais clientes.'
        : 'Ranking pela soma de clientes em risco e críticos ÷ carteira total. Unidades grandes não ganham prioridade só por tamanho.'}/>
  </aside>;
}

// Gráfico de barras do ranking de risco (Recharts)
export function GraficoRisco({ unidades }) {
  const telas = useBreakpoint();
  return <Card title="Ranking de risco proporcional" className="comparativo-card comparativo-chart-card">
    <Paragraph type="secondary" className="comparativo-chart-description">
      Percentual da carteira em risco ou estado crítico. Barras maiores indicam maior participação desses clientes, sem definir um score preditivo ou limites de alerta.
    </Paragraph>
    <div className="comparativo-chart" role="group" aria-label="Gráfico de risco proporcional das quatro unidades; os valores exatos estão disponíveis logo abaixo do gráfico">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={unidades} layout="vertical" margin={{ top: 8, right: 44, bottom: 8, left: 0 }} accessibilityLayer>
          <defs><linearGradient id="risk-bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#126078"/><stop offset="100%" stopColor="#23B7CA"/></linearGradient></defs>
          <CartesianGrid stroke="#E8ECF2" horizontal={false}/>
          <XAxis type="number" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(valor) => `${valor}%`} tick={{ fontSize: 11, fill: '#52647A' }} tickLine={false} axisLine={{ stroke: '#CCD7E3' }}/>
          <YAxis type="category" dataKey="nome" width={telas.md ? 124 : 96} tick={{ fontSize: 11, fill: '#0B1733' }} tickLine={false} axisLine={false}/>
          <Tooltip cursor={{ fill: '#EDF3F9' }} contentStyle={{ borderRadius: 10, border: '1px solid #D7E2ED', boxShadow: '0 6px 20px #102C4614', color: '#0B1733' }}
            labelStyle={{ fontWeight: 600, marginBottom: 6 }} formatter={(valor) => [exibirPercentual(valor), 'Risco proporcional']}/>
          <Bar dataKey="riscoPercentual" name="Risco proporcional" fill="url(#risk-bar)" radius={[0, 6, 6, 0]} maxBarSize={28}>
            <LabelList dataKey="riscoPercentual" position="right" formatter={exibirPercentual} fontSize={11} fill="#0B1733"/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>;
}

// Caixa de risco ou sucesso: título com ícone, número e barra de progresso
function CaixaIndicador({ tipo, icone, titulo, valor, cor, trilho, altura }) {
  return <Flex className={`comparativo-mobile-metric comparativo-mobile-metric--${tipo}`} vertical justify="center" gap={4}>
    <Statistic title={<>{icone}{titulo}</>} value={exibirPercentual(valor)}/>
    {valor != null && <Progress percent={valor} showInfo={false} size={['100%', altura]} strokeColor={cor} railColor={trilho}/>}
  </Flex>;
}

// Painel mostrado no tablet e no celular, no lugar da tabela
export function PainelUnidade({ unidades }) {
  const telas = useBreakpoint();
  const altura = telas.md ? 8 : 6;
  const [unidadeId, setUnidadeId] = useState(unidades[0]?.id);
  const indice = unidades.findIndex((unidade) => unidade.id === unidadeId);
  const unidade = unidades[indice];
  const dados = unidade && [
    ['Carteira de clientes', unidade.carteiraTotalClientes], ['Clientes em risco ou críticos', unidade.clientesEmRisco],
    ['Tarefas geradas (90 dias)', unidade.funnel90d.gerada], ['Sucessos (90 dias)', unidade.funnel90d.sucesso],
  ];
  return <Card title="Comparativo por unidade" className="comparativo-mobile-units comparativo-card">
    <div className="comparativo-mobile-selector">
      <label htmlFor="comparativo-unidade-select">Selecione uma unidade</label>
      <Select id="comparativo-unidade-select" aria-label="Selecionar unidade" value={unidadeId} onChange={setUnidadeId} size="large"
        options={unidades.map((item) => ({ value: item.id, label: item.nome }))} placeholder="Escolha uma unidade" disabled={unidades.length === 0}/>
    </div>
    {unidade && <div className="comparativo-mobile-details">
      <Flex className="comparativo-mobile-detail-heading" align="center" gap={10}>
        <span className="comparativo-mobile-position">{posicao(unidade, indice)}</span>
        <Flex className="comparativo-mobile-unit" vertical gap={3}><strong>{unidade.nome}</strong><span>Porte: {unidade.porte}</span></Flex>
      </Flex>
      <div className="comparativo-mobile-metrics">
        <CaixaIndicador tipo="risk" icone={<WarningOutlined className="comparativo-mobile-icon"/>} titulo="Risco proporcional" valor={unidade.riscoPercentual} cor="#D9741A" trilho="#F6DDB8" altura={altura}/>
        <CaixaIndicador tipo="success" icone={<CheckCircleOutlined className="comparativo-mobile-icon"/>} titulo="Taxa de sucesso" valor={unidade.sucessoPercentual} cor="#2E9461" trilho="#C9E6D5" altura={altura}/>
      </div>
      <div className="comparativo-mobile-data">
        {dados.map(([rotulo, valor]) => <Flex className="comparativo-mobile-data-row" align="center" justify="space-between" gap={10} key={rotulo}>
          <span>{rotulo}</span><strong>{numero.format(valor)}</strong>
        </Flex>)}
      </div>
    </div>}
    {!unidade && <Paragraph type="secondary">Não existem unidades disponíveis para apresentar.</Paragraph>}
  </Card>;
}

const titulo = (linha1, linha2) => <span className="comparativo-th"><span>{linha1}</span>{linha2 && <span>{linha2}</span>}</span>;
const centro = { align: 'center' };
const colunas = [
  { title: titulo('Posição'), key: 'posicao', width: '7%', ...centro, render: (_, unidade, indice) => posicao(unidade, indice) },
  { title: titulo('Unidade'), dataIndex: 'nome', width: '16%' },
  { title: titulo('Porte'), dataIndex: 'porte', width: '12%', ...centro, render: (porte) => <Tag color="cyan">{porte}</Tag> },
  { title: titulo('Carteira de', 'clientes'), dataIndex: 'carteiraTotalClientes', width: '9%', ...centro, render: (valor) => numero.format(valor) },
  { title: titulo('Clientes em risco', 'ou críticos'), dataIndex: 'clientesEmRisco', width: '12%', ...centro, render: (valor) => numero.format(valor) },
  { title: titulo('Risco', 'proporcional'), dataIndex: 'riscoPercentual', width: '10%', ...centro, render: (valor) => <span className="comparativo-risk">{exibirPercentual(valor)}</span> },
  { title: titulo('Tarefas geradas', '(90 dias)'), key: 'geradas', width: '12%', ...centro, render: (_, unidade) => numero.format(unidade.funnel90d.gerada) },
  { title: titulo('Sucessos', '(90 dias)'), key: 'sucessos', width: '9%', ...centro, render: (_, unidade) => numero.format(unidade.funnel90d.sucesso) },
  { title: titulo('Taxa de sucesso', '(90 dias)'), dataIndex: 'sucessoPercentual', width: '13%', ...centro, render: (valor) => <span className="comparativo-success">{exibirPercentual(valor)}</span> },
];

// Tabela completa (computador)
export function TabelaComparativa({ unidades }) {
  return <Card title="Tabela comparativa das unidades" className="comparativo-card comparativo-desktop-table">
    <Paragraph type="secondary" className="comparativo-chart-description">
      O gráfico facilita identificar a ordem de atenção. A tabela permite conferir os valores absolutos, os denominadores e as taxas exatas (exibidas com uma casa decimal).
    </Paragraph>
    <Table className="comparativo-table" rowKey="id" columns={colunas} dataSource={unidades} pagination={false} tableLayout="fixed" size="small"/>
  </Card>;
}
