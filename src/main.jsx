
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';
import './styles/global.css';

const theme = {
  token: {
    colorPrimary: '#4A91D8',
    colorInfo: '#19C7E8',
    colorText: '#0B1733',
    colorBgLayout: '#F5F8FC',
    colorTextSecondary: '#667085',
    colorBorderSecondary: '#E8ECF2',
    borderRadius: 10,
    borderRadiusLG: 12,
    fontSize: 14,
    lineHeight: 1.6,
    boxShadowTertiary: '0 2px 8px rgba(11, 23, 51, 0.04)',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  components: {
    Menu: {
      itemHeight: 48,
      itemBorderRadius: 10,
      iconSize: 19,
      collapsedIconSize: 20,
      darkItemColor: '#B7C5DA',
      darkItemHoverBg: '#122440',
      darkItemBg: '#0B1733',
      darkSubMenuItemBg: '#0B1733',
      darkItemSelectedBg: '#174B78',
      darkItemSelectedColor: '#19C7E8',
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
