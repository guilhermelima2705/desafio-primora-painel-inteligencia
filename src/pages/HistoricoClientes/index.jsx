import { Card, Tag } from 'antd';
import { ShopOutlined, ApartmentOutlined, HistoryOutlined } from '@ant-design/icons';
import ClienteTimeline from '../../components/ClienteTimeline';
import DashboardHeading from '../../components/DashboardHeading';
import { ClientHealthChart } from '../../components/AnalyticsCharts';
import dataset from '../../data/dataset_painel_multitenant.json';
const cliente = dataset.clientes.find(c => c.id === 'cli-timeline-001');

export default function HistoricoClientes() {
  return <div className="historico-page">
    <DashboardHeading eyebrow="Relacionamento com o cliente" title="Histórico de Clientes">A jornada do cliente, dos sinais de saúde às interações comerciais.</DashboardHeading>
    <div className="history-grid">
      <aside className="client-sidebar"><Card className="client-profile">
        <span className="profile-icon"><ShopOutlined aria-hidden="true"/></span><span className="eyebrow">Perfil do cliente</span><h3>{cliente.nome}</h3>
        <dl><dt><ApartmentOutlined aria-hidden="true"/> Unidade regional</dt><dd>{cliente.tenantNome}</dd><dt><HistoryOutlined aria-hidden="true"/> Eventos registrados</dt><dd>{cliente.eventos.length}</dd></dl>
        <Tag>Base demonstrativa</Tag>
      </Card><p className="source-note">Dados fictícios do dataset oficial da Primora para demonstração acadêmica.</p></aside>
      <div className="client-journey"><ClientHealthChart series={cliente.healthSeries}/>
        <Card className="analytics-panel timeline-panel" title="Linha do tempo" extra={<span className="panel-period">{cliente.eventos.length} eventos</span>}>
          <p className="panel-description">Do mais recente para o mais antigo. Categorias identificadas por cor e texto.</p>
          <ClienteTimeline eventos={cliente.eventos}/>
        </Card>
      </div>
    </div>
  </div>;
}
