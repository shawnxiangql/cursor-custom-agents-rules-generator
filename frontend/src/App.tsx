import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

import Layout from './components/layout/Layout';
import { RootState } from './store';

// 懒加载页面组件
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ItemsList = lazy(() => import('./pages/items/ItemsList'));
const ItemsCategories = lazy(() => import('./pages/items/ItemsCategories'));
const ItemsSearch = lazy(() => import('./pages/items/ItemsSearch'));
const Family = lazy(() => import('./pages/family/Family'));
const Settings = lazy(() => import('./pages/settings/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// 加载占位组件
const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// 受保护的路由组件
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 需要登录的路由 */}
          <Route path="/items" element={
            <ProtectedRoute>
              <ItemsList />
            </ProtectedRoute>
          } />
          <Route path="/items/all" element={
            <ProtectedRoute>
              <ItemsList />
            </ProtectedRoute>
          } />
          <Route path="/items/categories" element={
            <ProtectedRoute>
              <ItemsCategories />
            </ProtectedRoute>
          } />
          <Route path="/items/search" element={
            <ProtectedRoute>
              <ItemsSearch />
            </ProtectedRoute>
          } />
          <Route path="/family" element={
            <ProtectedRoute>
              <Family />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          {/* 404页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App; 