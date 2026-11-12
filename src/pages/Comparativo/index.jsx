import { Card, Typography } from 'antd';

import DashboardHeading from '../../components/DashboardHeading';
import { GraficoRisco, PainelUnidade, RankingResumo, TabelaComparativa } from '../../components/ComparativoPaineis';
import dataset from '../../data/dataset_painel_multitenant.json';
import { criarComparativo } from './indicadores';
import './comparativo.css';
import './painel-unidade.css'; // depois do comparativo.css, para manter a ordem das regras

const { Paragraph } = Typography;

const unidades = criarComparativo(dataset.tenants);

export default function Comparativo() {
  return (
    <div className="comparativo-page">

      <DashboardHeading
        eyebrow="Análise entre unidades"
        title="Comparativo entre Unidades"
      >
        Risco e sucesso comercial, com as diferenças de porte consideradas no
        cálculo.
      </DashboardHeading>

      <div className="comparison-grid">
        <RankingResumo unidades={unidades} />
        <GraficoRisco unidades={unidades} />
      </div>

      <PainelUnidade unidades={unidades} />
      <TabelaComparativa unidades={unidades} />

      {/* Cálculos originais */}
      <Card
        title="Como os indicadores são calculados"
        className="comparativo-card comparativo-calculations"
      >
        <Paragraph>
          <strong>Risco proporcional:</strong> (clientes em risco + clientes
          críticos) ÷ carteira total de clientes × 100.
        </Paragraph>

        <Paragraph>
          <strong>Taxa de sucesso do funil:</strong> tarefas concluídas com
          sucesso ÷ tarefas geradas nos últimos 90 dias × 100.
        </Paragraph>

        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          As taxas usam a precisão original, e o arredondamento é só na
          exibição. Denominador zero aparece como “Não disponível”. São
          medidas descritivas do dataset, sem previsão de risco.
        </Paragraph>
      </Card>

    </div>
  );
}