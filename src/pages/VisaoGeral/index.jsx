
import { Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function VisaoGeral() {
  return (
    <div>
      <Title level={2}>Visão Geral</Title>

      <Paragraph type="secondary">
        Acompanhe os indicadores comerciais e a saúde
        da carteira das unidades regionais.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={6}>
          <Card title="Unidades">
            <Text type="secondary">
              Cartões das unidades serão exibidos aqui.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Engajamento">
            <Text type="secondary">
              Indicadores de engajamento.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Funil Comercial">
            <Text type="secondary">
              Indicadores do funil comercial.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={6}>
          <Card title="Saúde da Carteira">
            <Text type="secondary">
              Distribuição da saúde dos clientes.
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
