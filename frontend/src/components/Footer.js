// Footer.js

import React from 'react';
import './Footer.css'; // Archivo de estilos CSS para el footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>Derechos de autor &copy; {new Date().getFullYear()} Varto INC</p>
      </div>
    </footer>
  );
};

export default Footer;