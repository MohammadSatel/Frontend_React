import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Categories from './components/Categories';
import Products from './components/Products';
import { ThemeProvider } from 'react-bootstrap';
import History from './components/History';
import Welcome from './components/Welcome';
import ResetPass from './components/ResetPass';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='*' element={<h1>page not found</h1>}/>
            <Route index element={<Welcome />} />
            <Route path='/categories' element={<Categories />}>
              <Route index element={<Products />} />
              <Route path='history' element={<History />} />
              <Route path=':catID' element={<Products />} />
              <Route path='allProducts' element={<Products />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/resetpass' element={<ResetPass />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
