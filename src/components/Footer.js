import React from 'react';
import '../Footer.css'; // Ensure your CSS file follows a naming convention and is located appropriately

const Footer = () => {
  return (
    // Using a semantic footer tag with an aria-label for better accessibility
    <footer className="sticky-footer" aria-label="Main Footer">
      {/* Wrap copyright text in a <small> tag for semantic HTML */}
      <small>© 2024 - Mohammad Satel</small>
    </footer>
  );
};

export default Footer;
