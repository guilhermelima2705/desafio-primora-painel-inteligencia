import { useState } from 'react';
import { Card, Select, Tag } from 'antd';
import { ShopOutlined, ApartmentOutlined, HistoryOutlined } from '@ant-design/icons';
import ClienteTimeline from '../../components/ClienteTimeline';
import DashboardHeading from '../../components/DashboardHeading';
import { ClientHealthChart } from '../../components/AnalyticsCharts';
import EstadoDataset from '../../components/EstadoDataset';
import { useListaDataset } from '../../hooks/useListaDataset';
import { ClienteDAO } from '../../dao/ClienteDAO';
import './historico.css';

export default function HistoricoClientes() {
  const lista = useListaDataset(ClienteDAO);
  const [clienteId, setClienteId] = useState(null);
  const cliente = lista.itens.find((item) => item.id === clienteId) ?? lista.itens[0];
  return <div className="historico-page">
    <DashboardHeading eyebrow="Relacionamento com o cliente" title="Histórico de Clientes" geradoEm={lista.geradoEm}>A jornada do cliente, dos sinais de saúde às interações comerciais.</DashboardHeading>
    <EstadoDataset lista={lista} recurso="clientes">
      {cliente && <>
        <div className="selection-control">
          <label htmlFor="cliente-select">Cliente</label>
          <Select id="cliente-select" value={cliente.id} onChange={setClienteId}
            options={lista.itens.map((item) => ({ value: item.id, label: item.nome }))}/>
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
      </>}
    </EstadoDataset>
  </div>;
}
