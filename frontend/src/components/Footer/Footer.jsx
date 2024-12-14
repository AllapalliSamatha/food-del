import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Company Logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typecasting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s when an unknown printer took a galley of type
            and scrambled it to make a type-specific book.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook Icon" />
            <img src={assets.twitter_icon} alt="Twitter Icon" />
            <img src={assets.linkedin_icon} alt="LinkedIn Icon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li key="home">Home</li>
            <li key="about-us">About Us</li>
            <li key="delivery">Delivery</li>
            <li key="privacy-policy">Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li key="phone">+1-212-456-789</li>
            <li key="email">contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 Tomato.com - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
