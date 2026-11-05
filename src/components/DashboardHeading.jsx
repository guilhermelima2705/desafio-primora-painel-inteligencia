import { Typography } from 'antd';
import dataset from '../data/dataset_painel_multitenant.json';

export default function DashboardHeading({ eyebrow, title, children }) {
  return <header className="dashboard-heading">
    <div><span className="eyebrow">{eyebrow}</span><Typography.Title level={2}>{title}</Typography.Title>
      <Typography.Paragraph>{children}</Typography.Paragraph></div>
    <div className="dataset-stamp"><span className="status-dot" />Base demonstrativa<strong>Atualizada em {dataset.geradoEm.split('-').reverse().join('/')}</strong></div>
  </header>;
}
