import * as React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// routes
import Router1 from './SuperAdmin/routes';
import Router2 from './Admin/routes'
import LoginPage from './Admin/pages/LoginPage';
// theme
import ThemeProvider from './SuperAdmin/theme';
// components
import { StyledChart } from './SuperAdmin/components/chart';
import ScrollToTop from './SuperAdmin/components/scroll-to-top';
import styles from "./index.css"

// import 'bootstrap/dist/css/bootstrap.min.css';

// ----------------------------------------------------------------------


export default function App() {

  // const user = useSelector((state) => state.authReducer.user);
  return (
    <HelmetProvider>
      <BrowserRouter>
      <ToastContainer />
        <ThemeProvider>
          
          <ScrollToTop />
          <StyledChart />
        
         <Router1 />

        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
      
  );
}
