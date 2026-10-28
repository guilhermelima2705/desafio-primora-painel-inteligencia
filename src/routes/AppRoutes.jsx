
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import AppLayout from '../components/layout/AppLayout';
import VisaoGeral from '../pages/VisaoGeral';
import Comparativo from '../pages/Comparativo';
import HistoricoClientes from '../pages/HistoricoClientes';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<VisaoGeral />} />
          <Route path="/comparativo" element={<Comparativo />} />
          <Route
            path="/historico-clientes"
            element={<HistoricoClientes />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
