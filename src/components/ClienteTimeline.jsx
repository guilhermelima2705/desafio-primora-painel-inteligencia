import { Tag, Timeline, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const tiposEvento = {
  health_score: { rotulo: 'Score de saúde', cor: 'blue' },
  flag: { rotulo: 'Alerta', cor: 'orange' },
  tarefa_status: { rotulo: 'Status de tarefa', cor: 'purple' },
  tarefa_vista: { rotulo: 'Tarefa visualizada', cor: 'cyan' },
  tarefa_criada: { rotulo: 'Tarefa criada', cor: 'geekblue' },
  compra: { rotulo: 'Compra', cor: 'green' },
  recomendacao: { rotulo: 'Recomendação', cor: 'gold' },
  bonificacao: { rotulo: 'Bonificação', cor: 'magenta' },
  nota: { rotulo: 'Nota', cor: 'default' },
  cluster_mudanca: { rotulo: 'Mudança de cluster', cor: 'purple' },
};

const formatoData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default function ClienteTimeline({ eventos = [] }) {
  const eventosOrdenados = [...eventos].sort((a, b) =>
    b.data.localeCompare(a.data),
  );

  return (
    <Timeline
      items={eventosOrdenados.map((evento) => {
        const tipo = tiposEvento[evento.tipo] ?? {
          rotulo: evento.tipo,
          cor: 'default',
        };

        return {
          key: `${evento.data}-${evento.tipo}-${evento.titulo}`,
          content: (
            <div style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <Text type="secondary">
                  <time dateTime={evento.data}>
                    {formatoData.format(new Date(evento.data))}
                  </time>
                </Text>
                <Tag color={tipo.cor} style={{ whiteSpace: 'normal' }}>
                  {tipo.rotulo}
                </Tag>
              </div>
              <Paragraph style={{ marginBottom: 16 }}>
                {evento.titulo}
              </Paragraph>
            </div>
          ),
        };
      })}
    />
  );
}
