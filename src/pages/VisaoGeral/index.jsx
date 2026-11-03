import { Col, Row, Typography } from 'antd';
import UnidadeCard from '../../components/UnidadeCard';
import { unidades } from './unidades';

const { Title, Paragraph } = Typography;

export default function VisaoGeral() {
  return (
    <div>
      <Title level={2}>Visão Geral</Title>

      <Paragraph type="secondary">
        Acompanhe a carteira de clientes, os eventos de engajamento e os
        sucessos no funil das unidades regionais.
      </Paragraph>
      <Paragraph type="secondary">
        Dados fictícios do dataset oficial da Primora, utilizados para
        demonstração acadêmica.
      </Paragraph>

      <Row gutter={[16, 16]}>
        {unidades.map((unidade) => (
          <Col key={unidade.id} xs={24} md={12} xl={6}>
            <UnidadeCard
              nome={unidade.nome}
              porte={unidade.porte}
              carteiraTotalClientes={unidade.carteiraTotalClientes}
              engagementEvents7d={unidade.engagementEvents7d}
              sucessosFunil90d={unidade.sucessosFunil90d}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
