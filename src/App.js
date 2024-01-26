import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';

function App() {
  const [user, setuser] = useState('user')
  const token = sessionStorage.getItem('token')
  const tokenData = { "Content-Type": "application/json", "Authorization": "Bearer " + token, }
  useEffect(() => {
    token && 'user' && setuser(JSON.parse(atob(token.split('.')[1])).username)
  }, [])

  return (
    <Context.Provider value={{ uservalue: [user, setuser], tokenvalue: [tokenData] }}>
      <div className='App'>
        <NavBar />
        <Outlet />
        <ToastContainer />
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;

export const Context = React.createContext()