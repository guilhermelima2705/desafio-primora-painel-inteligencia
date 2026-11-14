import { Alert, Button, Empty, Spin } from 'antd';

export default function EstadoDataset({ lista, recurso, children }) {
  if (lista.status === 'carregando') {
    return <div role="status" aria-live="polite"><Spin size="small" /> Carregando {recurso}…</div>;
  }
  if (lista.status === 'erro') {
    return <Alert type="error" showIcon title={`Não foi possível carregar ${recurso}.`}
      description="Verifique se a API está disponível e tente novamente."
      action={<Button onClick={lista.tentarNovamente}>Tentar novamente</Button>} />;
  }
  if (lista.itens.length === 0) {
    return <Empty description={`Sem dados de ${recurso} para exibir.`} />;
  }
  return children;
}
