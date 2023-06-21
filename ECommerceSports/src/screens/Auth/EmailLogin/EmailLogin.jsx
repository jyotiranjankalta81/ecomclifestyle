import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./emaillogin.scss";
import AuthStore from "../../../store/AuthStore";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Footer from "../../Footer/Footer";

const SignInSchema = Yup.object().shape({
  EMAIL: Yup.string().email("Invalid email").required("Email is required"),
  PASSWORD: Yup.string()
    .required("Password is rquired")
    .min(6, "Your password must be longer than 6 characters.")
});

const EmailLogin = observer(() => {
  const navigate = useNavigate();

  const login = e => {
    AuthStore.login(e, null, null, null, navigationCallBack);
  };
  const navigationCallBack = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className='login-container'>
        <Formik
          initialValues={{ EMAIL: "", PASSWORD: "" }}
          onSubmit={values => login(values)}
          validationSchema={SignInSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <form onSubmit={handleSubmit} className='login-form'>
              <div className='heading'>Login</div>
              <div className='button-container'>
                <button className='pl-button pl-button--active'>Email</button>
                <Link
                  to='phonelogin'
                  className='navi-button'
                  id='secondary-button'
                >
                  Phone Number
                </Link>
              </div>
              <div className='input-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='EMAIL'
                  id='email'
                  placeholder='Enter Email*'
                  onChange={handleChange("EMAIL")}
                  onBlur={handleBlur("EMAIL")}
                  value={values.EMAIL}
                />
                {errors.EMAIL && touched.EMAIL ? (
                  <span className='error'>{errors.EMAIL}</span>
                ) : null}
              </div>
              <div className='input-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  name='PASSWORD'
                  placeholder='Enter Password *'
                  onChange={handleChange("PASSWORD")}
                  onBlur={handleBlur("PASSWORD")}
                  value={values.PASSWORD}
                />
                {errors.PASSWORD && touched.PASSWORD ? (
                  <span className='error'>{errors.PASSWORD}</span>
                ) : null}
              </div>

              <p className='newusertags'>
                {/* <Checkbox defaultChecked sx={{ marginTop: "0%" }} />  */}
                <input type='checkbox' className='check_box' />
                “By signing in, you agree to Quality Cricket Conditions of Use
                and Privacy Notice.”
              </p>
              <button type='submit' className='btn-group'>
                <span className='login-btn'>Login</span>
              </button>
              <span style={{ width: "90%" }}>
                <Link
                  to='forgot'
                  className='forget-link'
                  style={{ float: "right" }}
                >
                  {"Forgot Password ?"}
                </Link>
              </span>
              {/* <br /> */}
              <span className='newusertag'>New to Quality Cricket</span>
              <Link to='register' className='creatbtn'>
                Create Account
              </Link>
            </form>
          )}
        </Formik>
      </div>
      {/* <Footer /> */}
    </>
  );
});

export default EmailLogin;
