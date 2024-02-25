import React from 'react'
import '../../styles/Footer.css';
import footer_logo from '../assets/logo_big.png';
import instagram_icon from '../assets/instagram_icon.png';
import pinterest_icon from '../assets/pintester_icon.png';

const Footer = () => {
  return (
    <div className="footer">

      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icons">
        <div className="footer-icon-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={pinterest_icon} alt="" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr/>
        <p>Copyright @ 2024 - All Rights Reserverd.</p>
      </div>
    </div>
  )
}

export default Footer
