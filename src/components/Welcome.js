import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const containerStyle = {
    // maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '30px',
    paddingLeft: '450px',
    paddingRight: '450px',
    position: 'relative',
    background: 'url("/background-image.jpg")', // Updated path
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100vh', // Set to 100% of the viewport height
  };

  const overlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the alpha value for the overlay
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)', // Adjust the blur as needed
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h2>Welcome to My Supermarket</h2>

<br></br>

        <Link to={'categories'} style={linkStyle}>Explore the Shop</Link>
      </div>
    </div>
  );
};

export default Welcome;
