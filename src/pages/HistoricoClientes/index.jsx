
import { Card, Col, Row, Typography, Select, Empty } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function HistoricoClientes() {
  return (
    <div>
      <Title level={2}>Histórico de Clientes</Title>

      <Paragraph type="secondary">
        Consulte a jornada dos clientes e acompanhe
        os eventos registrados ao longo do relacionamento
        com as unidades regionais.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Seleção de Cliente">
            <Select
              placeholder="Selecione um cliente"
              style={{ width: '100%', maxWidth: 400 }}
              disabled
            />

            <Paragraph
              type="secondary"
              style={{ marginTop: 12, marginBottom: 0 }}
            >
              A seleção de clientes será implementada
              nas próximas sprints.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Informações do Cliente">
            <Text type="secondary">
              A identificação do cliente e sua unidade
              regional serão exibidas aqui.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Linha do Tempo de Eventos">
            <Empty
              description="Os eventos do cliente serão exibidos aqui."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
