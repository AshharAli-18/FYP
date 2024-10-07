import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { Grid, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReviewsIcon from '@mui/icons-material/Reviews';
import moment from 'moment';

// redux
import {useSelector, useDispatch} from 'react-redux'




// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
} from '../sections/@dashboard/app';





// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const loginObject = useSelector(state => state.user.user.data[0].fname);
  const { products } = useSelector(state => state.data);
  const { customers } = useSelector(state => state.customers);
  const {orders} = useSelector(state => state.orders);
  const product = {
    name: 'i Phone',
    category: 'mobile',
    price: 10000,
    color: 'red'
  }

  
  useEffect(() => {
    if (!orders.length) return;
  
    console.log('Orders:', orders); // Log orders to see their structure
  
    // Group orders by month and calculate total revenue for each month
    const revenueByMonth = orders.reduce((acc, order) => {
      const month = moment(order.orderdate).format('MM/YYYY');
      if (month === 'Invalid date') {
        console.error('Invalid date encountered:', order.orderdate);
      } else {
        console.log('Valid date:', month);
      }
      const totalRevenue = acc[month] ? acc[month] + order.grandtotal : order.grandtotal;
      return { ...acc, [month]: totalRevenue };
    }, {});
  
    // Extract chart labels (months) and data (revenues)
    const chartDataEntries = Object.entries(revenueByMonth);
    const sortedChartDataEntries = chartDataEntries.sort((a, b) => {
      return moment(a[0], 'MM/YYYY').valueOf() - moment(b[0], 'MM/YYYY').valueOf();
    });
  
    const chartLabelsdynamic = sortedChartDataEntries.map(entry => {
      const formattedDate = moment(entry[0], 'MM/YYYY').format('MM/DD/YYYY');
      if (formattedDate === 'Invalid date') {
        console.error('Invalid formatted date:', entry[0]);
      }
      return formattedDate;
    });
  
    const chartDatadynamic = sortedChartDataEntries.map(entry => entry[1]);
  
    // Set chart labels and data
    setChartLabels(chartLabelsdynamic);
    setChartData(chartDatadynamic);
  
    console.log("user is:", loginObject);
    console.log("Chartlabels :", chartLabelsdynamic);
    console.log("ChartData :", chartDatadynamic);
  }, [orders]);
    
  
  
  return (
    <>
      <Helmet>
        <title> Admin Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
  Welcome <span style={{ color: 'grey' }}>{loginObject}</span> to the Admin Dashboard
</Typography>

      
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
      {orders && orders.length > 0 && (
        <AppWidgetSummary
          title="Total Sales"
          total={orders.reduce((sum, order) => sum + order.grandtotal, 0)}
          color="primary"
          icon={'mdi:chart-areaspline'}
        />
      )}
    </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Customers" total={customers.length} color="primary" icon={'mdi:account'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4
          }>
            <AppWidgetSummary title="Total Products"  total={products.length} color="primary" icon={'mdi-stackoverflow'} />
          </Grid>


          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Revenue Status"
              subheader="Monthly Progress"
              chartLabels={chartLabels}
              chartData={[
                {
                  
                  type: 'area',
                  fill: 'gradient',
                  data: chartData,
                },
              
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

        
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Notifications"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={orders.slice(-5).map(order => ({
                id: faker.datatype.uuid(),
                title: `${order.fname} - Rs.${order.grandtotal}`,
                type: order.status,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Todo List"
            />
          </Grid>
        </Grid>
      </Container>
    </>
   
  );
}
