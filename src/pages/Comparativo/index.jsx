import { Alert, Card, Table, Tag, Typography } from 'antd';
import {
  Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import dataset from '../../data/dataset_painel_multitenant.json';
import { criarComparativo } from './indicadores';
import './comparativo.css';
import DashboardHeading from '../../components/DashboardHeading';

const { Paragraph } = Typography;
const unidades = criarComparativo(dataset.tenants);
const numero = new Intl.NumberFormat('pt-BR');
const formatoPercentual = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const exibirPercentual = (valor) => valor == null
  ? 'Não disponível'
  : `${formatoPercentual.format(valor)}%`;

const colunas = [
  { title: 'Posição', key: 'posicao', width: 80, render: (_, unidade, indice) =>
    unidade.riscoPercentual == null ? '—' : indice + 1 },
  { title: 'Unidade', dataIndex: 'nome', width: 190 },
  { title: 'Porte', dataIndex: 'porte', width: 140,
    render: (porte) => <Tag color="cyan">{porte}</Tag> },
  { title: 'Carteira de clientes', dataIndex: 'carteiraTotalClientes',
    align: 'right', width: 130, render: (valor) => numero.format(valor) },
  { title: 'Clientes em risco ou críticos', dataIndex: 'clientesEmRisco',
    align: 'right', width: 160, render: (valor) => numero.format(valor) },
  { title: 'Risco proporcional', dataIndex: 'riscoPercentual',
    align: 'right', width: 140, render: (valor) => <span className="comparativo-risk">{exibirPercentual(valor)}</span> },
  { title: 'Tarefas geradas (90 dias)', key: 'geradas', align: 'right', width: 140,
    render: (_, unidade) => numero.format(unidade.funnel90d.gerada) },
  { title: 'Sucessos (90 dias)', key: 'sucessos', align: 'right', width: 130,
    render: (_, unidade) => numero.format(unidade.funnel90d.sucesso) },
  { title: 'Taxa de sucesso (90 dias)', dataIndex: 'sucessoPercentual',
    align: 'right', width: 150, render: (valor) => <span className="comparativo-success">{exibirPercentual(valor)}</span> },
];

export default function Comparativo() {
  return (
    <div className="comparativo-page">
      <DashboardHeading eyebrow="Análise entre unidades" title="Comparativo entre Unidades">Risco e sucesso comercial, com as diferenças de porte consideradas no cálculo.</DashboardHeading>
      <div className="comparison-grid">
      <aside className="comparison-context">
      <Card className="ranking-summary" title="Indicadores por unidade">
        <p className="panel-description">Ordenação pelo risco proporcional, do maior para o menor.</p>
        {unidades.map((u,i) => <div className="ranking-item" key={u.id}><span className="ranking-position">{u.riscoPercentual == null ? '—' : i+1}</span><div><strong>{u.nome}</strong><span>Risco <b>{exibirPercentual(u.riscoPercentual)}</b> · Sucesso <b>{exibirPercentual(u.sucessoPercentual)}</b></span></div></div>)}
      </Card>
      <Alert
        title="Comparação proporcional à carteira"
        description="O ranking usa a soma de clientes em risco e em estado crítico dividida pela carteira total. Assim, uma unidade maior não recebe prioridade apenas por ter mais clientes."
        type="info"
        showIcon
      />

      </aside>
      <Card title="Ranking de risco proporcional" className="comparativo-card">
        <Paragraph type="secondary">
          Percentual da carteira em risco ou estado crítico. Barras maiores
          indicam maior participação desses clientes, sem definir um score
          preditivo ou limites de alerta.
        </Paragraph>
        <div className="comparativo-chart" role="group" aria-label="Gráfico de risco proporcional das quatro unidades; valores também disponíveis na tabela abaixo">
          <ResponsiveContainer width="100%" height={320} minWidth={0}>
            <BarChart
              data={unidades}
              layout="vertical"
              margin={{ top: 8, right: 44, bottom: 8, left: 0 }}
              accessibilityLayer
            >
              <defs><linearGradient id="risk-bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#126078"/><stop offset="100%" stopColor="#23B7CA"/></linearGradient></defs>
              <CartesianGrid stroke="#E8ECF2" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(valor) => `${valor}%`} tick={{ fontSize: 11, fill: '#52647A' }}
                tickLine={false} axisLine={{ stroke: '#CCD7E3' }} />
              <YAxis type="category" dataKey="nome" width={124}
                tick={{ fontSize: 11, fill: '#0B1733' }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#EDF3F9' }}
                contentStyle={{ borderRadius: 10, border: '1px solid #D7E2ED', boxShadow: '0 6px 20px #102C4614', color: '#0B1733' }}
                labelStyle={{ fontWeight: 600, marginBottom: 6 }}
                formatter={(valor) => [exibirPercentual(valor), 'Risco proporcional']} />
              <Bar dataKey="riscoPercentual" name="Risco proporcional" fill="url(#risk-bar)"
                radius={[0, 6, 6, 0]} maxBarSize={28}>
                <LabelList dataKey="riscoPercentual" position="right"
                  formatter={exibirPercentual} fontSize={11} fill="#0B1733" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      </div>
      <Card title="Tabela comparativa das unidades" className="comparativo-card">
        <Paragraph type="secondary">
          O gráfico facilita identificar a ordem de atenção. A tabela permite
          conferir os valores absolutos, os denominadores e as taxas exatas
          (exibidas com uma casa decimal). No celular, deslize a tabela para
          consultar todas as colunas.
        </Paragraph>
        <Table
          className="comparativo-table"
          rowKey="id"
          columns={colunas}
          dataSource={unidades}
          pagination={false}
          scroll={{ x: 1260 }}
          size="middle"
        />
      </Card>

      <Card title="Como os indicadores são calculados" className="comparativo-card">
        <Paragraph>
          <strong>Risco proporcional:</strong> (clientes em risco + clientes
          críticos) ÷ carteira total de clientes × 100.
        </Paragraph>
        <Paragraph>
          <strong>Taxa de sucesso do funil:</strong> tarefas concluídas com
          sucesso ÷ tarefas geradas nos últimos 90 dias × 100.
        </Paragraph>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          As taxas usam a precisão original no cálculo e na ordenação; o
          arredondamento ocorre apenas na apresentação. Um denominador zero
          resulta em “Não disponível”. São medidas descritivas do dataset,
          sem previsão de risco ou comparação de volumes de períodos diferentes.
        </Paragraph>
      </Card>
    </div>
  );
}
