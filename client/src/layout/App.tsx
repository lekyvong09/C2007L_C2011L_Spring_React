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


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {mode: paletteType}
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header onSetDarkMode={setDarkMode} darkMode={darkMode} />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='catalog' element={<Catalog/>} />
            <Route path='catalog/:productId' element={<Catalog/>} />
            <Route path='about' element={<AboutPage />} />
            <Route path='contact' element={<ContactPage />} />
            <Route path='upload' element={<Uploader />} />
          </Routes>
          
        </Container>
      </ThemeProvider>
      
    </>
  );
}

export default App;
