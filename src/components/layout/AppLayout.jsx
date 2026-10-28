
import { useState } from 'react';
import { Button, Grid, Layout, Typography, Tag } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const { lg: isDesktop = false } = Grid.useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        isDesktop={isDesktop}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <Layout className="app-main">
        <Header
          className="app-header"
          style={{
            background: '#FFFFFF',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #E8ECF2',
          }}
        >
          {!isDesktop && (
            <Button
              className="app-menu-button"
              type="text"
              icon={<MenuOutlined />}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            />
          )}
          <Text strong style={{ fontSize: 18, color: '#0B1733' }}>
            Painel de Inteligência Multi-tenant
          </Text>

          <Tag color="cyan">Protótipo acadêmico</Tag>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: '24px',
            background: '#F5F8FC',
            borderRadius: 12,
            minHeight: 400,
          }}
        >
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center', color: '#667085' }}>
          Projeto Integrador — Primora © 2026
        </Footer>
      </Layout>
    </Layout>
  );
}
