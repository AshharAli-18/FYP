import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import InventoryIcon from '@mui/icons-material/Inventory';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/Admindashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Products Management',
    path: '/Admindashboard/ProductsManagement',
    icon: <InventoryIcon />,
  },
  {
    title: 'Orders Management',
    path: '/Admindashboard/OrdersManagement',
    icon: <ShoppingBagIcon />,
  },
  {
    title: 'Customers Management',
    path: '/Admindashboard/CustomersManagement',
    icon: <PersonIcon />,
  },
  {
    title: 'Discounts Management',
    path: '/Admindashboard/DiscountsManagement',
    icon: <MonetizationOnIcon />,
  },
  {
    title: 'Reviews',
    path: '/Admindashboard/CustomerReviews',
    icon: <ReviewsIcon/>,
    
  },
  

 
];

export default navConfig;
