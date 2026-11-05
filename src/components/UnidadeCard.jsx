import { Card, Statistic, Tag } from 'antd';
import { TeamOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function UnidadeCard({
  nome,
  porte,
  carteiraTotalClientes,
  engagementEvents7d,
  sucessosFunil90d,
}) {
  return (
    <Card
      className="unidade-card"
      title={nome}
      style={{ height: '100%' }}
      styles={{ title: { whiteSpace: 'normal', paddingBlock: 12 } }}
    >
      <div className="unidade-metrics">
        <div>
          <Tag color="cyan">Porte: {porte}</Tag>
        </div>
        <Statistic
          className="unidade-metric unidade-metric-carteira"
          prefix={<TeamOutlined aria-hidden="true" />}
          title="Carteira total de clientes"
          value={carteiraTotalClientes}
          groupSeparator="."
        />
        <Statistic
          className="unidade-metric unidade-metric-engajamento"
          prefix={<ThunderboltOutlined aria-hidden="true" />}
          title="Eventos de engajamento (7 dias)"
          value={engagementEvents7d}
          groupSeparator="."
        />
        <Statistic
          className="unidade-metric unidade-metric-sucesso"
          prefix={<CheckCircleOutlined aria-hidden="true" />}
          title="Sucessos no funil (90 dias)"
          value={sucessosFunil90d}
          groupSeparator="."
        />
      </div>
    </Card>
  );
}
