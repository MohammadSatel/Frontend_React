import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const containerStyle = {
    textAlign: 'center',
    padding: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url("/background-image.jpg")', // Ensure the image path is correct
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100vh',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)',
    width: '100%',
    maxWidth: '400px',
  };

  const handleReset = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual password reset API endpoint
      await axios.post('YOUR_API_ENDPOINT', { email });
      toast.success('Password reset instructions have been sent to your email');
      navigate('/login'); // Redirect to login page or any other page as needed
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send password reset instructions. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />
        <button onClick={handleReset} style={{ padding: '10px 20px', margin: '10px 0' }}>Send Reset Instructions</button>
        <div>
          Remembered your password? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
