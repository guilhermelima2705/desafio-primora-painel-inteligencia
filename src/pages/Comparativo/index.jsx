
import { Card, Col, Row, Typography, Alert } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Comparativo() {
  return (
    <div>
      <Title level={2}>Comparativo entre Unidades</Title>

      <Paragraph type="secondary">
        Compare o desempenho das unidades regionais,
        considerando as diferenças de porte e os
        indicadores proporcionais da carteira.
      </Paragraph>

      <Alert
        message="Comparação proporcional"
        description="Os indicadores serão normalizados pelo tamanho
        da carteira de clientes de cada unidade."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Ranking de Unidades">
            <Text type="secondary">
              O ranking comparativo será exibido aqui.
            </Text>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Gráfico Comparativo">
            <Text type="secondary">
              Visualização gráfica dos indicadores.
            </Text>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Tabela Comparativa">
            <Text type="secondary">
              Tabela com indicadores absolutos e proporcionais.
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
