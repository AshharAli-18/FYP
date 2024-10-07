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
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Products Management',
    path: '/dashboard/ProductsManagement',
    icon: <InventoryIcon />,
  },
  {
    title: 'Discounts Management',
    path: '/dashboard/DiscountsManagement',
    icon: <MonetizationOnIcon />,
  },
  {
    title: 'Orders Management',
    path: '/dashboard/OrdersManagement',
    icon: <ShoppingBagIcon />,
  },
  {
    title: 'Customers Management',
    path: '/dashboard/CustomersManagement',
    icon: <PersonIcon />,
  },
  {
    title: 'Reviews',
    path: '/dashboard/CustomerReviews',
    icon: <ReviewsIcon/>,
    
  },
];

export default navConfig;
