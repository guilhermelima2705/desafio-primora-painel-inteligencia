import { Col, Row, Typography } from 'antd';
import UnidadeCard from '../../components/UnidadeCard';
import dataset from '../../data/dataset_painel_multitenant.json';

const { Title, Paragraph } = Typography;

const unidades = dataset.tenants;

export default function VisaoGeral() {
  return (
    <div>
      <Title level={2}>Visão Geral</Title>

      <Paragraph type="secondary">
        Acompanhe a carteira de clientes, os eventos de engajamento e os
        sucessos no funil das unidades regionais.
      </Paragraph>
      <Paragraph type="secondary">
        Dados fictícios do arquivo dataset_painel_multitenant.json, utilizados
        para demonstração acadêmica.
      </Paragraph>

      <Row gutter={[16, 16]}>
        {unidades.map((unidade) => (
          <Col key={unidade.id} xs={24} md={12} xl={6}>
            <UnidadeCard
              nome={unidade.nome}
              porte={unidade.porte}
              carteiraTotalClientes={unidade.carteiraTotalClientes}
              engagementEvents7d={unidade.engagementEvents7d}
              sucessosFunil90d={unidade.funnel90d.sucesso}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}