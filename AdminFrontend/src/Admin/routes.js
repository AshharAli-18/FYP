import { Navigate, useRoutes } from 'react-router-dom';
// Admin Components
// layouts
import DashboardLayoutAdmin from './layouts/dashboard';
import AdminSimpleLayout from './layouts/simple';
//
import ProductsmanagementAdmin from './pages/Productsmanagement';
import LoginPageAdmin from './pages/LoginPage';
import ProductsPageAdmin from './pages/ProductsPage';
import DashboardAppPageAdmin from './pages/DashboardAppPage';
import SubscriptionAdmin from './pages/Subscription'
import AddProductAdmin from './pages/AddProduct';
import PaymentManagementAdmin from './pages/PaymentManagement'
import EditProductAdmin from './pages/Editproduct';
import DetailProductAdmin from './pages/DetailProduct';
import OrdersManagementAdmin from './pages/OrdersManagement';
import CustomersManagementAdmin from './pages/CustomersManagement';
import DetailOrderAdmin from './pages/DetailOrder';
import CustomerReviewsAdmin from './pages/CustomerReviews';
import DiscountsManagementAdmin from './pages/DiscountsManagement';
import AddDiscountAdmin from './pages/AddDiscount';

import userWebsite from '../User/User';




// SuperAdmin Components
import DashboardLayout from '../SuperAdmin/layouts/dashboard';
import SimpleLayout from '../SuperAdmin/layouts/simple';
//
import UserPage from '../SuperAdmin/pages/TenantsManagement';
import LoginPage from '../SuperAdmin/pages/LoginPage';
import Page404 from '../SuperAdmin/pages/Page404';
import ProductsPage from '../SuperAdmin/pages/ProductsPage';
import DashboardAppPage from '../SuperAdmin/pages/DashboardAppPage';
import Calendar from '../SuperAdmin/pages/Calendar';
import Subscription from '../SuperAdmin/pages/Subscription'
import Add from '../SuperAdmin/pages/AddTenant';
import EditTenant from '../SuperAdmin/pages/EditTenant';
import PaymentManagement from '../SuperAdmin/pages/PaymentManagement'


export default function Router() {
  const routes = useRoutes([
    {
      path: 'Admindashboard',
      element: <DashboardLayoutAdmin />,
      children: [
        { element: <Navigate to="/Admindashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPageAdmin /> },
        { path: 'ProductsManagement', element: <ProductsmanagementAdmin /> },
        { path: 'DiscountsManagement', element: <DiscountsManagementAdmin /> },
        { path: 'AddProduct', element: <AddProductAdmin /> },
        { path: 'AddDiscount', element: <AddDiscountAdmin /> },
        { path: 'EditProduct/:productid', element: <EditProductAdmin/> },
        { path: 'DetailProduct/:productid', element: <DetailProductAdmin/> },
        { path: 'EditProduct', element: <EditProductAdmin/> },
        { path: 'OrdersManagement', element: <OrdersManagementAdmin /> },
        { path: 'DetailOrder/:orderid', element: <DetailOrderAdmin /> },
        { path: 'CustomersManagement', element: <CustomersManagementAdmin /> },
        { path: 'CustomerReviews', element: <CustomerReviewsAdmin /> },
        
      ],
    },
    {
      path: '/Admin',
      element: <LoginPageAdmin />,
    },
   
    {
      path: '*',
      element: <Page404/>,
    },

    {
      path: 'dashboard',
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
      path: 'SuperAdmin',
      element: <LoginPage />,
    },
    
   
    
  ]);

  return routes;
}
