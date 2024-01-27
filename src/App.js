// App.js
import React, { useEffect, useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Single import is sufficient
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Define Context outside of the App component
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState('user');
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload.username);
    }
  }, []);

  // Context value object
  const contextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <div className='App'>
        <NavBar />
        <Outlet />
        <ToastContainer />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
