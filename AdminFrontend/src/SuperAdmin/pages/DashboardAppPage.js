import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';

// @mui
import { Grid, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react';

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
  const [SubscriptionData, setSubscriptionData] = useState([]);
  const [PaymentData, setPaymentData] = useState([]);
  const [total, setTotal] = useState([]);
  const { tenants } = useSelector(state => state.tenants);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const loginObject = useSelector(state => state.superadmin.superadmin.data[0].fname);
  const extractChartData = () => {
    // Map to accumulate revenues for each month
    const monthlyRevenueMap = new Map();

    // Iterate through PaymentData
    PaymentData.forEach(payment => {
        const date = new Date(payment.date);
        const monthYear = `${(date.getMonth() + 1).toString().padStart(2, '0')}/01/${date.getFullYear()}`;

        if (!monthlyRevenueMap.has(monthYear)) {
            // If the monthYear doesn't exist in the map, add it
            monthlyRevenueMap.set(monthYear, parseFloat(payment.amount));
        } else {
            // If the monthYear exists, accumulate the revenue
            const currentRevenue = monthlyRevenueMap.get(monthYear);
            monthlyRevenueMap.set(monthYear, currentRevenue + parseFloat(payment.amount));
        }
    });

    // Convert map to arrays for chart labels and chart data
    const labels = [];
    const data = [];
    monthlyRevenueMap.forEach((revenue, monthYear) => {
        labels.push(new Date(monthYear));
        data.push(revenue);
    });

    // Sort labels array by month and year
    labels.sort((a, b) => a - b);

    // Format sorted labels back to strings
    const sortedLabels = labels.map(date => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate()).toString().padStart(2, '0'); // Add this line to include day
        const year = date.getFullYear();
        return `${month}/${day}/${year}`; // Include day in the format
    });

    // Set chart labels and chart data state
    setChartLabels(sortedLabels);
    setChartData(data);

    // Log updated chart data and chart labels
    console.log("chartData:", data);
    console.log("chart labels:", sortedLabels);
    console.log(loginObject);
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const reqData = await fetch("http://api.dopes.online/api/subuser");
      const resData = await reqData.json();
      setSubscriptionData(resData);
      console.log("Subscription data:", resData); // Use resData instead of SubscriptionData

      const reqData1 = await fetch("http://api.dopes.online/api/payments");
      const resData1 = await reqData1.json();
      setPaymentData(resData1);
      console.log("Payment data:", resData1);
      
      // Calculate total amount
      const totalAmount = resData.reduce((acc, subscription) => acc + subscription.monthlyamount, 0);
      console.log("Total amount:", totalAmount);
      setTotal(totalAmount);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []); 

useEffect(() => {
  extractChartData(); // Call extractChartData here to ensure payment data is available
}, [PaymentData]);
  return (
    <>
      <Helmet>
        <title> Super Admin Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome  <span style={{ color: 'grey' }}>{loginObject}</span> to the  Super Admin Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Sales" total={total} color="primary" icon={'mdi:chart-areaspline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Tenants" total={tenants.length} color="primary" icon={'mdi:account'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="New Tenants" total={350} color="primary" icon={'mdi:account-arrow-up'} />
          </Grid>
          
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Revenue Status"
              subheader="Monthly Progress"
              chartLabels={chartLabels}
              chartData={[
                {
                  name: 'Sales',
                  type: 'area',
                  fill: 'gradient',
                  data: chartData
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
              title="News Update"
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
              list={tenants.slice(-5).map(tenant => ({
                id: faker.datatype.uuid(),
                title: `${tenant.firstname} - ${tenant.service}`,
                type: tenant.status,
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
