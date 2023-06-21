import React from "react";
import "./YourAccount.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import pic1 from "./pic1.svg";
import pic2 from "./pic2.svg";
import pic3 from "./pic3.svg";
import pic4 from "./pic4.svg";

function YourAccount () {
  return (
    <>
      <section className='your-address-sec'>
        <button className='btn-1' type='button'>
          <ArrowBackIosIcon /> back
        </button>
      </section>
      <h1 style={{ textAlign: "center" }}>Your Account</h1>
      <section className='Your-address-sec'>
        <div className='address-div'>
          <img src={pic1} alt='img' />
          <div className='account-div'>
            <h3> Your Orders</h3>
            <h4>Track, return, or buy things again</h4>
          </div>
        </div>
        <div className='address-div'>
          <img src={pic2} alt='img' />
          <div className='account-div'>
            <h3>Login & security</h3>
            <h4> Edit login, name,mobile number and email</h4>
          </div>
        </div>
        <div className='address-div'>
          <img src={pic3} alt='img' />
          <div className='account-div'>
            <h3>Your Address</h3>
            <h4>Edit addresses for orders </h4>
          </div>
        </div>
      </section>
      <section className='Your-address-sec1'>
        <div className='address-div1'>
          <img src={pic4} alt='img' />
          <div className='account-div1'>
            <h3> Your Orders</h3>
          </div>
        </div>
      </section>
    </>
  );
}

export default YourAccount;
