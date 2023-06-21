import { useState } from "react";
import "./phonelogin.style.scss";
import { Link } from "react-router-dom";
import OtpVerify from "./OtpVerify";
import { observer } from "mobx-react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthStore from "../../../store/AuthStore";
import { toast } from 'react-toastify';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignInSchema = Yup.object().shape({
  PHONENO: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
});

const PhoneLogin = observer(() => {
  const [verify, setVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState("");


  const login = (e) => {
    setMobileNo(e.PHONENO);
    AuthStore.loginWithNumber(e,navigationCallBack);
  };

  const navigationCallBack = () => {
    setVerify(true);
  }

  const MoNumberInput = () => {
    return (
      <div className="phone-container">
        <Formik
          initialValues={{ PHONENO: "" }}
          onSubmit={(values) => login(values)}
          validationSchema={SignInSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="phone-form">
              <div className="heading">Login</div>
              <div className="button-container">
                <Link to="/login" className="navi-button">
                  Email
                </Link>
                <button
                  className="pl-button pl-button--active"
                  id="secondary-button"
                >
                  Phone Number
                </button>
              </div>
              <div className="sendotp">
                <div className="input-group">
                  <label htmlFor="tel">Phone Number</label>
                  <input
                    required
                    name="PHONENO"
                    type="number"
                    id="tel"
                    onChange={handleChange}
                    onBlur={handleBlur("PHONENO")}
                    value={values.PHONENO}
                    placeholder="Enter phone number"
                  />
                  {errors.PHONENO && touched.PHONENO ? (
                    <span className="error">{errors.PHONENO}</span>
                  ) : null}
                </div>
              </div>

              <div className="btn-group">
                <button type="submit" className="login-btn">
                  Send OTP
                </button>
              </div>
              <span className="newusertag">New to Quality Cricket</span>
              <Link to="/login/register" className="creatbtn">
                Create Account
              </Link>
            </form>
          )}
        </Formik>
      </div>
    );
  };

  return (
    <>
      {!verify ? (
        <MoNumberInput />
      ) : (
        <OtpVerify
          title={"Login"}
          description={"We have send the OTP to your mobile number"}
          mobileNo={mobileNo}
        />
      )}
    </>
  );
});

export default PhoneLogin;
