import { Typography } from 'antd';

export default function DashboardHeading({ eyebrow, title, children, geradoEm }) {
  const data = /^\d{4}-\d{2}-\d{2}$/.test(geradoEm ?? '') ? geradoEm.split('-').reverse().join('/') : null;

  return <header className="dashboard-heading">
    <div><span className="eyebrow">{eyebrow}</span><Typography.Title level={2}>{title}</Typography.Title>
      <Typography.Paragraph>{children}</Typography.Paragraph></div>
    <div className="dataset-stamp"><span className="status-dot" />Base demonstrativa
      {data && <strong>Atualizada em <time dateTime={geradoEm}>{data}</time></strong>}
    </div>
  </header>;
}
