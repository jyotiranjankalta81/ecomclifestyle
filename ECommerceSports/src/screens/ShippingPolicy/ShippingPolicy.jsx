import React from "react";
import Footer from "../Footer/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <div className='privacy_policy_container'>
        <div className='shipping_policy'>
          <h4 className='sub_privacy_header'>Shipping Policy</h4>
          <p className='sub_privacy_para'>
            This Shipping Policy describes the shipping practices of Quality
            Cricket FZC and the corporation is located at Sharjah. With respect
            to ordering goods online from the website (www.qualitycricket.com)
            Standard shipping within 24-48 working hours based on the delivery
            location. Orders above AED 300 is eligible for free shipping. Orders
            below AED 300 is for flat shipping rate of AED 15 per order.
          </p>

          <h4 className='sub_privacy_header'>Returns and Refunds:</h4>
          <p className='sub_privacy_para'>
            Please refer to our Return and Refund Policy for more information on
            returns and refunds.
          </p>

          <h4 className='sub_privacy_header'>International Shipping:</h4>
          <p className='sub_privacy_para'>
            Please add items to the cart by registering your email address and
            select your region for shipping charges. If you cannot find your
            region, please send us a message via WhatsApp, live chat, or email
            info@qualitycricket.com requesting a freight quote.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
