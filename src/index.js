import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Categories from './components/Categories';
import Products from './components/Products';
import History from './components/History';
import Welcome from './components/Welcome';
import ResetPass from './components/ResetPass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Welcome />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='resetpass' element={<ResetPass />} />
          <Route path='categories' element={<Categories />}>
            <Route index element={<Products />} />
            <Route path='history' element={<History />} />
            <Route path=':catID' element={<Products />} />
            <Route path='allProducts' element={<Products />} />
          </Route>
          {/* Consider adding Products route here if it should be accessible directly */}
          <Route path='*' element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
