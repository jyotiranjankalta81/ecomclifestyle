import React from "react";
import "./LoginSecurity.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function LoginSecurity () {
  return (
    <>
      <section className='your-address-sec'>
        <button className='btn-1' type='button'>
          <ArrowBackIosIcon /> back
        </button>
      </section>
      <section className='Login-Section'>
        <div className='-div'>
          <h2> Login & security </h2>

          <form action=''>
            <label htmlFor=''>Name</label> <br />
            <input
              type='text'
              id='fname'
              name='firstname'
              placeholder='Your name'
            />
            <br />
            <label htmlFor=''>Mobile Number</label> <br />
            <input
              type='number'
              id='fname'
              name='firstname'
              placeholder='EnterContact numbar'
            />
            <br />
            <label htmlFor=''>Email:</label>
            <br />
            <input
              type='email'
              id='fname'
              name='firstname'
              placeholder='Enter email'
            />
            <br />
            <button className='login-Btn'>Save</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginSecurity;
