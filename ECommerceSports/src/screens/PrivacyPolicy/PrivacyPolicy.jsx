import React from "react";
import Footer from "../Footer/Footer";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <>
      <div className='privacy_policy_container'>
        <h2>PrivacyPolicy</h2>
        <p className='privacy_policy_details'>
          This Privacy Policy outlines the information that is collected, used,
          and shared by Quality Cricket FZC Please read this Privacy Policy
          carefully before using our website or services, or submitting any
          personal information. By using our website or services, you indicate
          that you accept this Privacy Policy and that you agree to abide by it.
        </p>
        <div className='privacy_policy_sub_container'>
          <h4 className='sub_privacy_header'>
            Collection and Use of Personal Information
          </h4>
          <p className='sub_privacy_para'>
            We may collect personal information from our users, such as name,
            address, email address, phone number, and payment information. This
            information is used to provide our services and process payments, as
            well as to communicate with you about our services. We may also
            collect non-personal information, such as IP addresses, device
            information, browser information, and usage data. This information
            is used to improve our website and services, as well as to analyze
            user behavior and preferences.
          </p>
          <h4 className='sub_privacy_header'>
            Sharing of Personal Information
          </h4>
          <p className='sub_privacy_para'>
            We may share personal information with third parties in order to
            provide our services and process payments. We may also share
            personal information with third parties for analytics and marketing
            purposes. We may also disclose personal information if required to
            do so by law, or if we believe that such action is necessary to
            protect and defend the rights and property of the Company, our
            customers, or others.
          </p>
          <h4 className='sub_privacy_header'>Cookies</h4>
          <p className='sub_privacy_para'>
            We may use cookies to improve your user experience. A cookie is a
            small piece of data that is stored on your computer or device when
            you visit our website. This data is used to provide a more
            personalized user experience, as well as to track user behavior and
            preferences.
          </p>
          <h4 className='sub_privacy_header'>Security </h4>
          <p className='sub_privacy_para'>
            We take reasonable measures to protect the personal information we
            collect from misuse, unauthorized access, disclosure, alteration,
            and destruction.
          </p>
          Credit/debit card details and personally identifiable information will
          not be stored, sold, shared, or rented to any third parties.
          <h4 className='sub_privacy_header'>Your Rights</h4>
          <p className='sub_privacy_para'>
            You have the right to access, delete, or modify the personal
            information that we have collected. You also have the right to
            opt-out of any communications from us.
          </p>
          <h4 className='sub_privacy_header'>Changes to this Privacy Policy</h4>
          <p className='sub_privacy_para'>
            We may revise this Privacy Policy from time to time. The most
            current version of the Privacy Policy will always be posted on our
            website.
          </p>
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

export default PrivacyPolicy;
