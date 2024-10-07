import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Productsmanagement from './pages/Productsmanagement';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Subscription from './pages/Subscription'
import AddProduct from './pages/AddProduct';
import PaymentManagement from './pages/PaymentManagement'
import EditProduct from './pages/Editproduct';
import DetailProduct from './pages/DetailProduct';
import OrdersManagement from './pages/OrdersManagement';
import CustomersManagement from './pages/CustomersManagement';
import DetailOrder from './pages/DetailOrder';
import CustomerReviews from './pages/CustomerReviews';
import DiscountsManagement from './pages/DiscountsManagement';
import AddDiscount from './pages/AddDiscount';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    // {
    //   path: '',
    //   element: <Navigate to="/login" />,
    // },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'ProductsManagement', element: <Productsmanagement /> },
        { path: 'DiscountsManagement', element: <DiscountsManagement /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'Subscription', element: <Subscription /> },
        { path: 'AddProduct', element: <AddProduct /> },
        { path: 'AddDiscount', element: <AddDiscount /> },
        { path: 'EditProduct/:productid', element: <EditProduct/> },
        { path: 'DetailProduct/:productid', element: <DetailProduct/> },
        { path: 'EditProduct', element: <EditProduct/> },
        { path: 'PaymentManagement', element: <PaymentManagement /> },
        { path: 'OrdersManagement', element: <OrdersManagement /> },
        { path: 'DetailOrder/:orderid', element: <DetailOrder /> },
        { path: 'CustomersManagement', element: <CustomersManagement /> },
        { path: 'CustomerReviews', element: <CustomerReviews /> },
        
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
       { element: <Navigate to="/login" />, index: true },
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
