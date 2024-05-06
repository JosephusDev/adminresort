import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import {
  Dashboard,
  Quarto,
  Reserva
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página inicial',
      },
      {
        icon: 'bed',
        path: '/quartos',
        label: 'Quartos',
      },
      {
        icon: 'book',
        path: '/reservas',
        label: 'Reservas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/quartos" element={<Quarto />} />
      <Route path="/reservas" element={<Reserva />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
