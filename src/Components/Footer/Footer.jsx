import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
       <div className="footer-input-btn">
        <h2>Ready to watch? Enter your email to create or restart your membership </h2>
   <input className="footer-input" type="text" placeholder="Email address"/>
   <button>Get Started  <FontAwesomeIcon icon ={faAngleRight}/></button>
 </div>
      <div className="two-footer">
        <div>
          <ul>
            <li>FAQ</li>
            <li>Account</li>
            <li>Investor Relations</li>
            <li>Ways to watch</li>
            <li>Privacy</li>
            <li>Corporate Information</li>
            <li>Speed Test</li>
            <li>Only on Netflix</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Help Center</li>
            <li>Media Center</li>
            <li>Jobs</li>
            <li>Terms of use</li>
            <li>Cookie Preference</li>
            <li>Contact Us</li>
            <li>Legal Notice</li>
          </ul>
        </div>
      </div>
       <div className="footer-icons">
   <FontAwesomeIcon icon={faYoutube}   className="y-icons"/>
   <FontAwesomeIcon icon={faFacebook}  className="f-icons"/>
   <FontAwesomeIcon icon={faInstagram} className="i-icons"/>
 </div>
    </div>
  );
};

export default Footer;
