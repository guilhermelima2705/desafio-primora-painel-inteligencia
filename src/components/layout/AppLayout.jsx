import { useState } from 'react';
import { Button, Grid, Layout, Typography, Tag } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, MenuOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const { lg: isDesktop = false } = Grid.useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const menuLabel = isDesktop
    ? (collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral')
    : 'Abrir menu';

  return (
    <Layout className="app-shell">
      <Sidebar
        isDesktop={isDesktop}
        collapsed={collapsed}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <Layout className="app-main">
        <Header className="app-header">
          <Button
            className="app-menu-button"
            type="text"
            icon={isDesktop
              ? (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)
              : <MenuOutlined />}
            aria-label={menuLabel}
            title={menuLabel}
            aria-expanded={isDesktop ? !collapsed : menuOpen}
            onClick={() => {
              if (isDesktop) setCollapsed(!collapsed);
              else setMenuOpen(true);
            }}
          />
          <Text className="app-header-caption">Painel de Inteligência</Text>
          <Tag className="app-academic-badge">Protótipo acadêmico</Tag>
        </Header>

        <Content className="app-content">
          <Outlet />
        </Content>

        <Footer className="app-footer">
          Projeto Integrador — Primora © 2026
        </Footer>
      </Layout>
    </Layout>
  );
}
