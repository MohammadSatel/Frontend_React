import React, { useContext, useState } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSignOutAlt } from 'react-icons/fa';
import { UserContext } from '../App';

const Login = () => {
    // Initialize token state directly from sessionStorage
    const [uName, setuName] = useState("");
    const [pwd, setPwd] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem('token') || "");
    const { uservalue } = useContext(UserContext);
    const [user, setUser] = uservalue;
    const navigate = useNavigate();
    const SERVER_URL = 'http://localhost:3000/';

    // Function to handle login
    const doLogin = async () => {
        if (!uName || !pwd) {
            toast.error('Username and password are required');
            return;
        }

        try {
            const response = await axios.post(`${SERVER_URL}login/`, { username: uName, password: pwd });
            const tempToken = response.data.access;
            setToken(tempToken);
            sessionStorage.setItem('token', tempToken);
            const object = JSON.parse(atob(tempToken.split('.')[1]));
            setUser(object.username);
            toast('You are logged in now');
            navigate('/categories');
        } catch (error) {
            toast.error("Username or password isn't correct");
        }
    };

    // Function to handle logout
    const logOut = async () => {
        try {
            await axios.get(`${SERVER_URL}logout/`);
            sessionStorage.removeItem('token');
            setUser('user');
            setToken("");
            toast("You've been logged out. Goodbye :)");
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Redirect to reset password page
    const goToReset = () => {
        navigate('/resetpass');
    };

    // If user is already logged in
    if (token) {
        return (
            <div>
                <h1>You're logged in, {user}</h1>
                <Link to='/categories'>Back to shop</Link>
                <br /><br />
                <MDBBtn onClick={logOut}><FaSignOutAlt /> Log Out</MDBBtn>
            </div>
        );
    }

    // Login form
    return (
        <>
            <br /><h2>Login</h2>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBInput label='Username' type='text' onChange={(e) => setuName(e.target.value)} />
                <MDBInput label='Password' type='password' onChange={(e) => setPwd(e.target.value)} />
                <div className="text-center mt-4">
                    <button className="btn btn-link" onClick={goToReset}>Forgot password?</button>
                </div>
                <MDBBtn onClick={doLogin}>Sign in</MDBBtn>
                <div className="text-center">
                    <p>Not a member? <Link to='/register'>Register</Link></p>
                </div>
            </MDBContainer>
        </>
    );
}

export default Login;
