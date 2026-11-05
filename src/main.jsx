
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import App from './App';
import './styles/global.css';

const theme = {
  token: {
    colorPrimary: '#127D90',
    colorInfo: '#276895',
    colorText: '#0B1733',
    colorBgLayout: '#EFF5F7',
    colorTextSecondary: '#667085',
    colorBorderSecondary: '#E8ECF2',
    borderRadius: 10,
    borderRadiusLG: 18,
    fontSize: 14,
    lineHeight: 1.6,
    boxShadowTertiary: '0 2px 8px rgba(11, 23, 51, 0.04)',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  components: {
    Card: { headerBg: 'transparent' },
    Table: { headerBg: '#EAF1F8', headerColor: '#203C57', borderColor: '#DCE5EF', rowHoverBg: '#E9F3FA' },
    Menu: {
      itemHeight: 48,
      itemBorderRadius: 10,
      iconSize: 19,
      collapsedIconSize: 20,
      darkItemColor: '#B7C5DA',
      darkItemHoverBg: '#185360',
      darkItemBg: '#103D4B',
      darkSubMenuItemBg: '#103D4B',
      darkItemSelectedBg: '#1D6473',
      darkItemSelectedColor: '#FFFFFF',
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
