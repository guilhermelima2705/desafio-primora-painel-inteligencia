import { useState } from 'react';
import { Col, Row, Select } from 'antd';
import UnidadeCard from '../../components/UnidadeCard';
import DashboardHeading from '../../components/DashboardHeading';
import { EngagementChart, HealthChart } from '../../components/AnalyticsCharts';
import dataset from '../../data/dataset_painel_multitenant.json';

export default function VisaoGeral() {
  const [unidadeId, setUnidadeId] = useState(dataset.tenants[0].id);
  const unidade = dataset.tenants.find((item) => item.id === unidadeId);
  const indice = dataset.tenants.findIndex((item) => item.id === unidadeId);

  return <div className="overview-page">
    <DashboardHeading eyebrow="Inteligência regional" title="Visão Geral">Carteiras, engajamento e resultados da unidade selecionada.</DashboardHeading>
    <div className="selection-control">
      <label htmlFor="unidade-select">Unidade regional</label>
      <Select id="unidade-select" value={unidadeId} onChange={setUnidadeId}
        options={dataset.tenants.map((item) => ({ value: item.id, label: item.nome }))}/>
    </div>
    <Row gutter={[16,16]} className="unit-grid"><Col xs={24} sm={12} xl={6}>
      <UnidadeCard nome={unidade.nome} porte={unidade.porte} carteiraTotalClientes={unidade.carteiraTotalClientes} engagementEvents7d={unidade.engagementEvents7d} sucessosFunil90d={unidade.funnel90d.sucesso} indice={indice}/>
    </Col></Row>
    <div className="overview-charts"><EngagementChart unidades={[unidade]}/><HealthChart unidades={[unidade]}/></div>
    <p className="source-note">Dados fictícios do dataset oficial da Primora, utilizados para demonstração acadêmica. Os gráficos apresentam períodos e volumes próprios de cada indicador.</p>
  </div>;
}
