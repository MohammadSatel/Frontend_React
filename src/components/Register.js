import axios from 'axios';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../App';

const Register = () => {
  const [uName, setUName] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const { uservalue } = useContext(UserContext);
  const [user, setUser] = uservalue;
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/';

  const doRegister = async () => {
    if (!uName || !pwd || !email) {
      toast.error('All fields are required');
      return;
    }

    try {
      const registerResponse = await axios.post(`${SERVER_URL}register`, { username: uName, password: pwd, email });
      toast.success('User created successfully!');

      const loginResponse = await axios.post(`${SERVER_URL}login/`, { username: uName, password: pwd });
      const tempToken = loginResponse.data.access;
      sessionStorage.setItem('token', tempToken);

      const userInfo = JSON.parse(atob(tempToken.split('.')[1]));
      setUser(userInfo.username);
      toast('You are logged in now');
      navigate('/categories');
    } catch (error) {
      console.error('Registration or login failed:', error);
      toast.error('Registration or login failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Sign Up</h2>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBInput label='Username' type='text' onChange={(e) => setUName(e.target.value)} />
        <MDBInput label='Password' type='password' onChange={(e) => setPwd(e.target.value)} />
        <MDBInput label='Email' type='email' onChange={(e) => setEmail(e.target.value)} />

        <MDBBtn onClick={doRegister}>Sign Up</MDBBtn>
      </MDBContainer>
    </div>
  );
};

export default Register;
