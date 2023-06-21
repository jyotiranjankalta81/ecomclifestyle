import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./Footers.css";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const Footer = () => {
  return (
    <>
      <div className='footer_container'>
        <div className='footer_social_container'>
          <p>Get connected with us on social networks</p>
          <div className='social_icons'>
            <img src='/Images/Footer/facebook.png' alt='' />
            <img src='/Images/Footer/google.png' alt='' />
            <img src='/Images/Footer/instagram.png' alt='' />
            <img src='/Images/Footer/linkedin.png' alt='' />
            <img src='/Images/Footer/twitter.png' alt='' />
            <img src='/Images/Footer/whatsapp.png' alt='' />
            {/* <FacebookOutlinedIcon />
            <TwitterIcon />
            <GoogleIcon />
            <InstagramIcon />
            <LinkedInIcon /> */}
          </div>
        </div>
        <div className='divider'></div>
        <div className='footer_content_container'>
          <div className='boxes_logo'>
            <img src={Logo} alt='' />
          </div>
          <div className='boxes'>
            <h3>RELETED LINKS</h3>
            <div className='sub_boxes'>
              <Link to='/' className='menu_links'>
                Home
              </Link>
              <Link to='/about' className='menu_links'>
                About
              </Link>
              <Link to='/sale' className='menu_links'>
                Sale
              </Link>
              <Link to='/accessories' className='menu_links'>
                Accessories
              </Link>
              <Link to='/products' className='menu_links'>
                All Products
              </Link>
              <Link to='/contact' className='menu_links'>
                Contact Us
              </Link>
            </div>
          </div>
          <div className='boxes'>
            <h3>USEFUL LINKS</h3>
            <div className='sub_boxes'>
              <Link to='/privacy-policy' className='menu_links'>
                Privacy Policy
              </Link>
              <Link to='/terms-conditions' className='menu_links'>
                Terms & Conditions
              </Link>
              <Link to='/shipping-policy' className='menu_links'>
                Shipping Policy
              </Link>
              <Link to='/refund-and-return' className='menu_links'>
                Refund Policy
              </Link>
              <Link to='/faq' className='menu_links'>
                FAQ's
              </Link>
            </div>
          </div>
          <div className='boxes'>
            <h3>CONTACT</h3>
            <div className='sub_boxes'>
              <p className='menu_items'>
                <HomeIcon /> Quality Cricket FZC B Block, Office – B15-140 SRTIP
                Free Zone Sharjah, UAE
              </p>
              <p className='menu_items'>
                <EmailIcon /> customerservice@qualitycricket.com
              </p>
              <p className='menu_items'>
                <CallIcon /> +971 50 206 5090
              </p>
              <div
                className='top_down'
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <div className='scroll_to_top'>
                  <KeyboardDoubleArrowUpIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
