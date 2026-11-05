import { Drawer, Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  HistoryOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import primoraLogo from '../../assets/primora-logo.png';

const { Sider } = Layout;

const menuItems = [
  { key: '/', icon: <AppstoreOutlined />, label: 'Visão Geral' },
  { key: '/comparativo', icon: <BarChartOutlined />, label: 'Comparativo' },
  {
    key: '/historico-clientes',
    icon: <HistoryOutlined />,
    label: 'Histórico de Clientes',
  },
];

export default function Sidebar({ isDesktop, collapsed, open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const compact = isDesktop && collapsed;

  const navigation = (
    <>
      <div className={`app-brand${compact ? ' app-brand-compact' : ''}`}>
        <div className="app-brand-logo"><img src={primoraLogo} alt="Primora — Soluções em Tecnologia" /></div>

      </div>
      <nav aria-label="Navegação principal" className="app-navigation">
        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={compact}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
            onClose();
          }}
        />
      </nav>
    </>
  );

  if (isDesktop) {
    return (
      <Sider
        className="app-sidebar"
        theme="dark"
        width={260}
        collapsedWidth={80}
        collapsed={collapsed}
        trigger={null}
      >
        {navigation}
      </Sider>
    );
  }

  return (
    <Drawer
      title="Navegação"
      placement="left"
      size={260}
      open={open}
      onClose={onClose}
      keyboard
      mask={{ closable: true }}
      styles={{
        section: { background: '#122D48', color: '#fff' },
        header: { borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
        body: { padding: 0 },
      }}
      closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
    >
      {navigation}
    </Drawer>
  );
}
