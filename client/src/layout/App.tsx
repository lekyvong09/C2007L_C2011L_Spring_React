import React, { useState } from 'react';
import './App.css';
import Catalog from '../features/catalog/Catalog';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Container } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import AboutPage from '../features/about/AboutPage';
import ContactPage from '../features/contact/ContactPage';
import Uploader from '../features/upload/uploader';
import ProductDetail from '../features/catalog/ProductDetail';
import {ToastContainer} from 'react-toastify';
import AxiosInterceptor from '../interceptor/AxiosInterceptor';
import NotFound from '../features/error/NotFound';
import BasketPage from '../features/basket/BasketPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {mode: paletteType}
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <AxiosInterceptor>
          <ToastContainer position='bottom-right' hideProgressBar />
          <CssBaseline />
          <Header onSetDarkMode={setDarkMode} darkMode={darkMode} />
          <Container>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='catalog' element={<Catalog/>} />
              <Route path='catalog/:productId' element={<ProductDetail/>} />
              <Route path='about' element={<AboutPage />} />
              <Route path='contact' element={<ContactPage />} />
              <Route path='upload' element={<Uploader />} />
              <Route path='not-found' element={<NotFound />} />
              <Route path='basket' element={<BasketPage/>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </AxiosInterceptor>
      </ThemeProvider>
      
    </>
  );
}

export default App;
