import { useState } from 'react';
import { Card, Select, Tag } from 'antd';
import { ShopOutlined, ApartmentOutlined, HistoryOutlined } from '@ant-design/icons';
import ClienteTimeline from '../../components/ClienteTimeline';
import DashboardHeading from '../../components/DashboardHeading';
import { ClientHealthChart } from '../../components/AnalyticsCharts';
import dataset from '../../data/dataset_painel_multitenant.json';

export default function HistoricoClientes() {
  const [clienteId, setClienteId] = useState(dataset.clientes[0].id);
  const cliente = dataset.clientes.find((item) => item.id === clienteId);
  return <div className="historico-page">
    <DashboardHeading eyebrow="Relacionamento com o cliente" title="Histórico de Clientes">A jornada do cliente, dos sinais de saúde às interações comerciais.</DashboardHeading>
    <div className="selection-control">
      <label htmlFor="cliente-select">Cliente</label>
      <Select id="cliente-select" value={clienteId} onChange={setClienteId}
        options={dataset.clientes.map((item) => ({ value: item.id, label: item.nome }))}/>
    </div>
    <div className="history-grid">
      <aside className="client-sidebar"><Card className="client-profile">
        <span className="profile-icon"><ShopOutlined aria-hidden="true"/></span><span className="eyebrow">Perfil do cliente</span><h3>{cliente.nome}</h3>
        <dl><dt><ApartmentOutlined aria-hidden="true"/> Unidade regional</dt><dd>{cliente.tenantNome}</dd><dt><HistoryOutlined aria-hidden="true"/> Eventos registrados</dt><dd>{cliente.eventos.length}</dd></dl>
        <p className="client-id">Identificação: {cliente.id}</p>
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
