import { useState } from "react";
import "./registerform.scss";
import { observer } from "mobx-react"
import { Formik } from 'formik';
import * as Yup from 'yup';
import VerifyMobile from "./VerifyMobile";
import AuthStore from "../../../store/AuthStore";
import { Navigate, useNavigate } from "react-router-dom";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignUpSchema = Yup.object().shape({
  FULLNAME: Yup.string().required('Required'),
  MOBILENO: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  EMAIL: Yup.string().email('Invalid email').required('Required'),
  PASSWORD: Yup.string().required('Required').min(6, "Your password must be longer than 6 characters."),
});

const Register = observer(() => {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState("");


  const handleVerify = (otp) => {
    setVerify(false);
  };
  const signup = (e) => {
    AuthStore.register(e, navigationCallBack)
  };
  const navigationCallBack = () => {
    navigate('/login')
  }

  const RegisterInputs = () => {
    return (
      <Formik
        initialValues={{ FULLNAME: '', MOBILENO: '', EMAIL: '', PASSWORD: '' }}
        onSubmit={values => signup(values)}
        validationSchema={SignUpSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <form onSubmit={handleSubmit} className="register-form">
            <div className="heading">Create Account</div>
            <div className="input-group">
              <label htmlFor="fullname">Full name</label>
              <input
                name="FULLNAME"
                required
                type="text"
                id="fullname"
                placeholder="Enter full name"
                onChange={handleChange('FULLNAME')}
                onBlur={handleBlur('FULLNAME')}
                value={values.FULLNAME}
              />
              {errors.FULLNAME && touched.FULLNAME ? (
                <span className="error">{errors.FULLNAME}</span>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="tel">Mobile Number</label>
              <input
                name="MOBILENO"
                required
                type="tel"
                id="tel"
                placeholder="Enter mobile number"
                onChange={handleChange('MOBILENO')}
                onBlur={handleBlur('MOBILENO')}
                value={values.MOBILENO}
              />
              {errors.MOBILENO && touched.MOBILENO ? (
                <span className="error">{errors.MOBILENO}</span>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                name="EMAIL"
                required
                type="email"
                id="email"
                placeholder="Enter email"
                onChange={handleChange('EMAIL')}
                onBlur={handleBlur('EMAIL')}
                value={values.EMAIL}
              />
              {errors.EMAIL && touched.EMAIL ? (
                <span className="error">{errors.EMAIL}</span>
              ) : null}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                name="PASSWORD"
                required
                title="*At least six characters"
                pattern=".{6,}"
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={handleChange('PASSWORD')}
                onBlur={handleBlur('PASSWORD')}
                value={values.PASSWORD}
              />
              {errors.PASSWORD && touched.PASSWORD ? (
                <span className="error">{errors.PASSWORD}</span>
              ) : null}
              <div>*At least six characters</div>
            </div>
            <div className="input-group">
              <button type="submit" className="register-btn">
                Continue
              </button>
            </div>
          </form>
        )}
      </Formik>
    );
  };
  return (
    <div className="auth-container">
      {!verify ? (
        <RegisterInputs />
      ) : (
        <VerifyMobile
          title={"Verify Mobile Number"}
          description={"We have send the OTP to your mobile number"}
          handleVerify={handleVerify}
          mobileNo={mobileNo || "0123456878"}
        />
      )}
    </div>
  );
});

export default Register;
