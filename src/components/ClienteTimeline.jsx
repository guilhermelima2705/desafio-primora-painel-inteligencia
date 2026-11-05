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
      className="cliente-timeline"
      items={eventosOrdenados.map((evento) => {
        const tipo = tiposEvento[evento.tipo] ?? {
          rotulo: evento.tipo,
          cor: 'default',
        };

        return {
          key: `${evento.data}-${evento.tipo}-${evento.titulo}`,
          color: ({ blue: '#277DA8', orange: '#B67618', purple: '#7961A8', cyan: '#168A9D', geekblue: '#386E9D', green: '#258775', gold: '#A77B20', magenta: '#AD5B84' })[tipo.cor] ?? '#6E8490',
          content: (
            <div className="timeline-event">
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
              {evento.valor != null && <div className="event-value">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(evento.valor)}</div>}
            </div>
          ),
        };
      })}
    />
  );
}
