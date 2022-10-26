import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';
import React from 'react';
import View from './pages/View';
import Header from './Components/Header';
import {createTheme, ThemeProvider } from "@mui/material" 
//import { ThemeProvider } from '@emotion/react';
function App() {
  const theme = createTheme({});  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route path='/add' element={<AddEdit/>} />
      <Route path='/update/:id' element={<AddEdit/>} />
      <Route path='/view/:id' element={<View/>} />
    </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
