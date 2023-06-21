import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./EditYourAddress.css";
import swal from "sweetalert";
import HomeStore from "../../../store/HomeStore";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import UserStore from "../../../store/UserStore";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const FormSchema = Yup.object().shape({
  FULLNAME: Yup.string().required("Name Required"),
  FLAT: Yup.string().required("Flat Required"),
  CITY: Yup.string().required("City Required"),
  STATE: Yup.string().required("State Required"),
  PIN: Yup.string().required("PIN Required"),
  COUNTRY: Yup.string().required("Country Required"),
  LANDMARK: Yup.string().required("Landmark Required"),
  STREET: Yup.string().required("Street Required"),
  PHONE: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required")
});

const EditYourAddress = props => {
  const navigate = useNavigate();
  const { openPopup, setOpenPopup, address } = props;

  const addAddress = values => {
    if (values.ADDRESS_ID) {
      UserStore.updateAddress(values, navigationCallBack);
    } else {
      UserStore.addAddress(values, navigationCallBack);
    }
  };
  const navigationCallBack = () => {
    swal("Success!", "Your address successfully added ", "success");
    window.location.reload();
  };

  return (
    <>
      <section className='Edit-Section'>
        <h1>{address ? "Edit your address" : "Add your address"}</h1>
        <span
          className='close_btn'
          // style={{
          //   cursor: "pointer",
          //   position: "absolute",
          //   right: "45px",
          //   top: "30px"
          // }}
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          <CloseIcon />{" "}
        </span>
        <div className='form-container'>
          <Formik
            initialValues={{
              ADDRESS_ID: address?.ADDRESS_ID,
              COUNTRY: "Ddepk",
              FULLNAME: address?.FULLNAME,
              PHONE: address?.PHONE,
              FLAT: address?.FLAT,
              STREET: address?.STREET,
              LANDMARK: address?.LANDMARK,
              PIN: address?.PIN,
              CITY: address?.CITY,
              STATE: address?.STATE
            }}
            onSubmit={values => addAddress(values)}
            validationSchema={FormSchema}
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
                <div>
                  <label htmlFor='Country'>
                    Country/Region <span style={{ color: "red" }}>*</span>
                  </label>{" "}
                  <br />
                  <input
                    type='text'
                    name='COUNTRY'
                    value={values.COUNTRY}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Enter Country Name*'
                  />
                  <br />
                  {errors.COUNTRY ? (
                    <span className='error'>{errors.COUNTRY}</span>
                  ) : null}
                </div>
                <div>
                  <label htmlFor=''>
                    Full name <span style={{ color: "red" }}>*</span>
                  </label>{" "}
                  <br />
                  <input
                    type='text'
                    name='FULLNAME'
                    value={values.FULLNAME}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Enter Full Name*'
                  />
                  <div>
                    {errors.FULLNAME ? (
                      <span className='error'>{errors.FULLNAME}</span>
                    ) : null}
                  </div>
                  {/* <br /> */}
                </div>
                <div>
                  <label htmlFor=''>
                    Mobile number <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type='tel'
                    name='PHONE'
                    value={values.PHONE}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Enter Mobile No.'
                  />
                  <div>
                    {errors.PHONE ? (
                      <span className='error'>{errors.PHONE}</span>
                    ) : null}
                  </div>
                  {/* <br /> */}
                </div>
                <div>
                  <label htmlFor=''>
                    Pincode <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type='text'
                    name='PIN'
                    placeholder='Enter Pincode'
                    value={values.PIN}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.PIN ? (
                      <span className='error'>{errors.PIN}</span>
                    ) : null}
                  </div>
                  {/* <br /> */}
                </div>
                <div>
                  <label htmlFor=''>
                    Flat, House No, Building, Company, Apartment{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <input
                    type='text'
                    name='FLAT'
                    placeholder='Enter Address'
                    value={values.FLAT}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.FLAT ? (
                      <span className='error'>{errors.FLAT}</span>
                    ) : null}
                  </div>
                  {/* <br /> */}
                </div>
                <div>
                  <label htmlFor=''>
                    {" "}
                    Area, Street, Sector, Village{" "}
                    <span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <br />
                  <input
                    type='text'
                    name='STREET'
                    placeholder='Enter Street'
                    value={values.STREET}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div>
                    {errors.STREET ? (
                      <span className='error'>{errors.STREET}</span>
                    ) : null}
                  </div>
                  {/* <br /> */}
                </div>
                <div>
                  <label htmlFor=''>Landmark</label>
                  <br />
                  <input
                    type='text'
                    placeholder='Enter Landmark'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LANDMARK}
                    name='LANDMARK'
                  />
                  <div>
                    {errors.LANDMARK ? (
                      <span className='error'>{errors.LANDMARK}</span>
                    ) : null}
                  </div>
                  {/* <br /> */}
                </div>
                <div className='edit-section-div'>
                  <div className='town'>
                    <label htmlFor=''>
                      Town/city <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input
                      type='text'
                      style={{ width: "200px" }}
                      placeholder='Enter Town/City '
                      value={values.CITY}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='CITY'
                    />
                    <div>
                      {errors.CITY ? (
                        <span className='error'>{errors.CITY}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className='town'>
                    <label htmlFor='state'>
                      State <span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input
                      type='text'
                      id='state'
                      style={{ width: "200px" }}
                      placeholder='Enter State*'
                      value={values.STATE}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name='STATE'
                    />
                    <div>
                      {errors.STATE ? (
                        <span className='error'>{errors.STATE}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <br />
                <button type='submit' className='Edit-Btn'>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default EditYourAddress;
