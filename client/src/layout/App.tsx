import React, { useState } from 'react';
import './App.css';
import Catalog from '../features/catalog/Catalog';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Container } from '@mui/system';


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
          <Catalog/>
        </Container>
      </ThemeProvider>
      
    </>
  );
}

export default App;
