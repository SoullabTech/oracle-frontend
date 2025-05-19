// src/routes.ts
import DashboardPage from '@/pages/DashboardPage';

export const protectedRoutes = [
  { path: '/dashboard', element: <DashboardPage /> },
];
