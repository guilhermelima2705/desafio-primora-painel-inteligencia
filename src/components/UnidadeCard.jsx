import { Card, Statistic, Tag } from 'antd';

export default function UnidadeCard({
  nome,
  porte,
  carteiraTotalClientes,
  engagementEvents7d,
  sucessosFunil90d,
}) {
  return (
    <Card
      title={nome}
      style={{ height: '100%' }}
      styles={{ title: { whiteSpace: 'normal', paddingBlock: 12 } }}
    >
      <div style={{ display: 'grid', gap: 20 }}>
        <div>
          <Tag color="cyan">Porte: {porte}</Tag>
        </div>
        <Statistic
          title="Carteira total de clientes"
          value={carteiraTotalClientes}
          groupSeparator="."
        />
        <Statistic
          title="Eventos de engajamento (7 dias)"
          value={engagementEvents7d}
          groupSeparator="."
        />
        <Statistic
          title="Sucessos no funil (90 dias)"
          value={sucessosFunil90d}
          groupSeparator="."
        />
      </div>
    </Card>
  );
}
