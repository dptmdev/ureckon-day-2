import React from 'react';
import AppHeader from '../components/Common/AppHeader';
import AppContent from '../components/Common/AppContent';
import AppFooter from '../components/Common/AppFooter';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const DefaultLayout = ({ cart, addToCart }) => {
  return (
    <>
      <AppHeader cart={cart} />
      <main>
        <Outlet context={{ addToCart }} /> {/* Pass addToCart to child routes */}
      </main>
      <AppContent />
      <AppFooter />
      <ToastContainer />
    </>
  );
};

export default DefaultLayout;
