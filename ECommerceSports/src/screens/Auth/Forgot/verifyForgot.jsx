import { useState } from "react";
import OtpInput from "react-otp-input";
import "./verifyForgot.scss";
const VerifyForgot = ({ title, description, emaildesc, emailotp, handleVerify }) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="emailverify-container">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (otp.length < 6) return;
        handleVerify(otp);
      }}
      className="emailverify-form">
      <div className="emailverify-heading">{title}</div>
      <div className="emailverify-desc">{description}</div>
      <div className="email-add" ><span style={{color: "#3F51B5"}}>{emaildesc}</span> Please enter it below to complete verification.
</div>
      <div className="input-group">
        <label htmlFor="otp">OTP</label>
        <OtpInput
          id="otp"
          value={otp}
          className=""
          onChange={setOtp}
          numInputs={6}
          containerStyle="otp-container"
          inputStyle="otp-input"
          separator={<span style={{ margin: "0.2rem" }}> </span>}
        />
      </div>

      <div className="verify-btn-container">
        <button type="submit" className="verify-btn">
          Verify
        </button>
      </div>
    </form>
    </div>
  );
};

export default VerifyForgot;
