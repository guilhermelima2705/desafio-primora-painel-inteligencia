
import { Drawer, Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';

const { Sider } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: 'Visão Geral',
  },
  {
    key: '/comparativo',
    icon: <BarChartOutlined />,
    label: 'Comparativo',
  },
  {
    key: '/historico-clientes',
    icon: <HistoryOutlined />,
    label: 'Histórico de Clientes',
  },
];

export default function Sidebar({ isDesktop, open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = (
    <>
      <div style={{ padding: '24px 16px', textAlign: 'center' }}>
        <Title level={4} style={{ color: '#fff', margin: 0 }}>
          PRIMORA
        </Title>
        <Text style={{ color: '#19C7E8', fontSize: 12 }}>
          Painel de Inteligência
        </Text>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
          onClose();
        }}
        style={{ background: '#0B1733' }}
      />
    </>
  );

  if (isDesktop) {
    return (
      <Sider
        theme="dark"
        width={260}
        style={{ background: '#0B1733', minHeight: '100vh' }}
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
        section: { background: '#0B1733', color: '#fff' },
        header: { borderBottom: '1px solid #174B78' },
        body: { padding: 0 },
      }}
      closeIcon={<span style={{ color: '#fff' }} aria-label="Fechar menu">×</span>}
    >
      {navigation}
    </Drawer>
  );
}
