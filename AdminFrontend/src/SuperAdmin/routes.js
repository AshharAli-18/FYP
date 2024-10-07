import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/TenantsManagement';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Calendar from './pages/Calendar';
import Subscription from './pages/Subscription'
import Add from './pages/AddTenant';
import EditTenant from './pages/EditTenant';
import PaymentManagement from './pages/PaymentManagement'
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'Calendar', element: <Calendar /> },
        { path: 'Subscription', element: <Subscription /> },
        { path: 'AddTenant', element: <Add /> },
        { path: 'EditTenant/:phone', element: <EditTenant/> },
        { path: 'PaymentManagement', element: <PaymentManagement /> },
        
      ],
    },
   
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    
  ]);

  return routes;
}
