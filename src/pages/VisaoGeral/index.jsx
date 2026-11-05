import { Col, Row } from 'antd';
import UnidadeCard from '../../components/UnidadeCard';
import DashboardHeading from '../../components/DashboardHeading';
import { EngagementChart, HealthChart } from '../../components/AnalyticsCharts';
import dataset from '../../data/dataset_painel_multitenant.json';

export default function VisaoGeral() {
  return <div className="overview-page">
    <DashboardHeading eyebrow="Inteligência regional" title="Visão Geral">Carteiras, engajamento e resultados das quatro unidades em um só lugar.</DashboardHeading>
    <Row gutter={[16,16]} className="unit-grid">{dataset.tenants.map((u,i) => <Col key={u.id} xs={24} sm={12} xl={6}>
      <UnidadeCard nome={u.nome} porte={u.porte} carteiraTotalClientes={u.carteiraTotalClientes} engagementEvents7d={u.engagementEvents7d} sucessosFunil90d={u.funnel90d.sucesso} indice={i}/>
    </Col>)}</Row>
    <div className="overview-charts"><EngagementChart unidades={dataset.tenants}/><HealthChart unidades={dataset.tenants}/></div>
    <p className="source-note">Dados fictícios do dataset oficial da Primora, utilizados para demonstração acadêmica. Os gráficos apresentam períodos e volumes próprios de cada indicador.</p>
  </div>;
}
