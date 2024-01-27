import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '30px',
    background: 'url("/background-image.jpg") no-repeat center center', // Ensures the image covers the available space without repeating
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100vh', // Set to 100% of the viewport height
  };

  const overlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the alpha value for the overlay
    padding: '20px',
    borderRadius: '10px',
    backdropFilter: 'blur(5px)', // Adjust the blur as needed
    maxWidth: '600px', // Sets a max width for the content
    width: '100%', // Ensures it doesn't exceed the width of its parent
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    marginTop: '20px', // Adds some space above the link
    display: 'inline-block', // Necessary for margins to work on inline elements like <a>
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h1>Welcome to Our Site!</h1>
        <p>Your journey starts here.</p>
        <Link to="/explore" style={linkStyle}>Explore Now</Link>
      </div>
    </div>
  );
};

export default Welcome;
