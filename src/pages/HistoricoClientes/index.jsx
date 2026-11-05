import { Card, Col, Row, Typography } from 'antd';
import ClienteTimeline from '../../components/ClienteTimeline';
import dataset from '../../data/dataset_painel_multitenant.json';

const cliente = dataset.clientes.find((cliente) => cliente.id === 'cli-timeline-001');

const { Title, Paragraph, Text } = Typography;
const estilosCard = {
  title: { whiteSpace: 'normal', paddingBlock: 12 },
};

export default function HistoricoClientes() {
  return (
    <div className="historico-page">
      <Title level={2}>Histórico de Clientes</Title>

      <Paragraph type="secondary">
        Consulte a jornada do cliente e acompanhe os eventos registrados
        ao longo do relacionamento com sua unidade regional.
      </Paragraph>
      <Paragraph type="secondary">
        Dados fictícios do dataset oficial da Primora, utilizados para
        demonstração acadêmica.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Informações do Cliente" styles={estilosCard}>
            <Paragraph>
              <Text strong>Cliente</Text>
              <br />
              {cliente.nome}
            </Paragraph>
            <Paragraph style={{ marginBottom: 0 }}>
              <Text strong>Unidade</Text>
              <br />
              {cliente.tenantNome}
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Linha do Tempo de Eventos" styles={estilosCard}>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>
              Eventos do mais recente para o mais antigo.
            </Paragraph>
            <ClienteTimeline eventos={cliente.eventos} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
