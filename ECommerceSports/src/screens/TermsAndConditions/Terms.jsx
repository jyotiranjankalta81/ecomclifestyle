import React from "react";
import Footer from "../Footer/Footer";
// import "./Terms.css";

const Terms = () => {
  return (
    <>
      <div className='privacy_policy_container'>
        <h2>Terms and conditions:</h2>
        <p className='privacy_policy_details'>
          The website will not provide any services or products to any Office of
          Foreign Assets Control (OFAC) sanctioned countries in accordance with
          UAE law.
        </p>
        <p className='privacy_policy_details'>
          Governing Law and Jurisdiction, any purchase, dispute, or claim
          arising out of or in connection with this website shall be governed
          and construed in accordance with the laws of the UAE.{" "}
        </p>
        <div className='privacy_policy_sub_container'>
          <h4 className='sub_privacy_header'>Contact Us</h4>
          <p className='sub_privacy_para'>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at &nbsp;
            <a
              href='https://mail.google.com/mail/u/0/#inbox?compose=new'
              target='_blank'
            >
              customerservice@qualitycricket.com
            </a>
            &nbsp;.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
