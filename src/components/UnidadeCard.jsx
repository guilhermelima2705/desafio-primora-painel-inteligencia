import { Card, Tag } from 'antd';
import { TeamOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';
const numero = new Intl.NumberFormat('pt-BR');

export default function UnidadeCard({ nome, porte, carteiraTotalClientes, engagementEvents7d, sucessosFunil90d, indice = 0 }) {
  return <Card className={`unit-card unit-tone-${indice}`}>
    <div className="unit-card-top"><span className="unit-icon"><TeamOutlined aria-hidden="true"/></span><Tag>{porte}</Tag></div>
    <h3>{nome}</h3><div className="unit-primary">{numero.format(carteiraTotalClientes)}</div><p className="unit-label">Clientes na carteira</p>
    <div className="unit-secondary"><div><ThunderboltOutlined aria-hidden="true"/><strong>{numero.format(engagementEvents7d)}</strong><span>Eventos · 7 dias</span></div><div><CheckCircleOutlined aria-hidden="true"/><strong>{numero.format(sucessosFunil90d)}</strong><span>Sucessos · 90 dias</span></div></div>
  </Card>;
}
