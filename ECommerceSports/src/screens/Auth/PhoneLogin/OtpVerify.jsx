import { useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import "./phonelogin.style.scss";
import AuthStore from "../../../store/AuthStore";

const OtpVerify = ({ title, description, mobileNo }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    let data = {
      PHONENO: mobileNo,
      OTP: otp
    }
    AuthStore.verifyOTP(data, null, null, null, navigationCallBackLogin);
  };

  const navigationCallBackLogin = () => {
    window.location.reload();
  }


  return (
    <div className="phone-container">
      <div
        className="verify-form">
        <div className="verify-heading">{title}</div>
        <div className="verify-desc">{description}</div>
        <div className="mobile-no">{mobileNo}</div>
        <div className="input-group">
          <label htmlFor="otp">OTP</label>
          <OtpInput
            id="otp"
            className=""
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle="otp-container"
            inputStyle="otp-input"
            separator={<span style={{ margin: "0.2rem" }}> </span>}
          />
        </div>

        <div className="verify-btn-container">
          <button style={{ cursor: 'pointer' }} className="verify-btn" onClick={handleVerify} >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
