import React from "react";
import "./ContactForm.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
// import { OneLineInput } from "./PlainInput/PlainInput";
import { OneLineInput } from "./PlainInput/PlainInput";
import Footer from "../../screens/Footer/Footer";

import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import HomeStore from "../../store/HomeStore";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ContectUSSchema = Yup.object().shape({
  EMAIL: Yup.string().email("Invalid email").required("Email is required"),
  NAME: Yup.string().required("Name Required"),
  MESSAGE: Yup.string().required("MESSAGE Required"),
  PHONE: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required")
});

const ContactUs = observer(() => {
  const navigate = useNavigate();

  const onContectUS = values => {
    HomeStore.contectUs(values, navigationCallBack);
  };
  const navigationCallBack = () => {
    swal(
      "Submitted!",
      "We appreciate you contacting us/ QUALITY CRICKET. One of our colleagues will get back in touch with you soon!Have a great day!",
      "success"
    );
    navigate("/");
  };

  return (
    <>
      <div className='contact_form_container'>
        <div className='contact_form_main_container'>
          {/* <div className='left_contact_form'>
            <div className='top_contact_section'>
              <h4>Contact Information</h4>
              <p>
                Fill up the form and our Team will get back to you within 24
                hours.
              </p>
            </div>
            <div className='middle_contact_section'>
              <p>
                <CallIcon /> +0123 4567 8910
              </p>
              <p>
                <MailIcon /> hello@qualitycricket.com
              </p>
              <p>
                <LocationOnIcon /> 102 Street 2714 Don
              </p>
            </div>
            <div className='bottom_contact_section'>
              <div className='left_bottom_contact'>
                <div className='icon_image'>
                  <img src='/Images/Contact/instagram.png' alt='' />
                </div>
                <div className='icon_image'>
                  <img src='/Images/Contact/facebook.png' alt='' />
                </div>
                <div className='icon_image'>
                  <img src='/Images/Contact/linkedin.png' alt='' />
                </div>
                <div className='icon_image'>
                  <img src='/Images/Contact/twitter.png' alt='' />
                </div>
              </div>
              <div className='right_bottom_contact'>
                <div className='right_inside_sectionn'>
                  <img src='/Images/Contact/MailGif.gif' alt='' />
                </div>
              </div>
            </div>
          </div> */}

          <div className='top_contact_container'>
            <h3 className='contact_us_header'>CONTACT US</h3>
            <p className='sub_para'>
              All Thank you for contacting ECommerce Quality Cricket.
            </p>
            <p className='sub_para'>
              We value your custom and look forward to working with you.
            </p>
            <p className='sub_para'>
              Please make your enquiry by either completing the online form
              below or telephone us on:
            </p>
            <h3>
              <b>+971 50 206 5090</b>
            </h3>
            <p className='sub_para'>
              For our delivery and return policies, please go to our &nbsp;
              <a href='/terms-conditions' style={{ color: "black" }}>
                Terms & Conditions
              </a>
              &nbsp; page.
            </p>
            {/* <br /> */}
            <p className='sub_para'>Kind Regards,</p>
            <p className='sub_para'>QualityCricket Team</p>
          </div>
          <Formik
            initialValues={{ EMAIL: "", NAME: "", MESSAGE: "" }}
            onSubmit={values => onContectUS(values)}
            validationSchema={ContectUSSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <form
                className='right_contact_form'
                // onSubmit={handleSubmit(onSubmit)}
              >
                <div className='top_right_form'>
                  <div className='grid_input-row'>
                    <OneLineInput
                      label='Full Name'
                      placeholder='Enter Name'
                      name='NAME'
                      value={values.NAME}
                      onChange={handleChange}
                    />
                    {errors.NAME && touched.NAME ? (
                      <span className='error'>{errors.NAME}</span>
                    ) : null}
                    <OneLineInput
                      label='Phone'
                      placeholder='Enter Phone'
                      name='PHONE'
                      value={values.PHONE}
                      onChange={handleChange}
                    />
                    {errors.PHONE && touched.PHONE ? (
                      <span className='error'>{errors.PHONE}</span>
                    ) : null}
                    <OneLineInput
                      label='E-mail'
                      placeholder='Enter E-mail'
                      name='EMAIL'
                      value={values.EMAIL}
                      onChange={handleChange}
                    />
                    {errors.EMAIL && touched.EMAIL ? (
                      <span className='error'>{errors.EMAIL}</span>
                    ) : null}
                  </div>
                  <div className='middle_right_form'>
                    <OneLineInput
                      label='Message'
                      placeholder='Write your message '
                      value={values.MESSAGE}
                      name='MESSAGE'
                      onChange={handleChange}
                    />
                    {errors.MESSAGE && touched.MESSAGE ? (
                      <span className='error'>{errors.MESSAGE}</span>
                    ) : null}
                  </div>
                </div>
                <div className='last_form_section'>
                  <button
                    className='sumit_contact_form'
                    // onClick={handleSubmit(onSubmit)}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
});

export default ContactUs;
