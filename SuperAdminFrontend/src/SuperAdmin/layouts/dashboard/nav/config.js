import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TimelineIcon from '@mui/icons-material/Timeline';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Tenant Management',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Subscription Management',
    path: '/dashboard/Subscription',
    icon: <TimelineIcon />,
  },
  {
    title: 'Payment Management',
    path: '/dashboard/PaymentManagement',
    icon: <MonetizationOnIcon />,
  },
  {
    title: 'Calendar',
    path: '/dashboard/Calendar',
    icon: <CalendarMonthIcon />,
  },
  
  
];

export default navConfig;
