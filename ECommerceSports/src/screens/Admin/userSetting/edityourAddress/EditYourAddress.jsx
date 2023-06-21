import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import "./EditYourAddress.css";

const EditYourAddress = ( props) => {
  const {openPopup, setOpenPopup } = props;
  return (
    <>
      <section className="Edit-Section">
        <h1>Edit your address</h1>
        <span style={{ cursor:'pointer', position:'absolute', right:'45px', top:'30px' }} onClick={()=>{setOpenPopup(false)}}><CloseIcon/> </span>
        <div className="form-container">
        <form action="">
          <label htmlFor="">Country/Region</label> <br />
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Enter Country name "
          />
          <br />
          <label htmlFor="">Full name</label> <br />
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Enter Full name"
          />
          <br />
          <label htmlFor="">Mobile number</label>
          <input
            type="tel"
            id="fname"
            name="firstname"
            placeholder="Enter Mobile No."
          />
          <br />
          <label htmlFor="">Pincode </label>
          <br />
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Enter Pincode"
          />
          <br />
          <label htmlFor="">Flat, House no, Building, Company, Apartment</label>
          <br />
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Enter Address "
          />
          <br />
          <label htmlFor=""> Area, Street, Sector, Village </label>
          <br />
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Enter Address"
          />
          <br />
          <label htmlFor="">Landmark</label>
          <br />
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Enter Landmark"
          />
          <br />
          <div className="edit-section-div">
            <div className="town">
            <label htmlFor="">Town/city</label>
            <br />
            <input
              type="text"
              id="fname"
              style={{width: '200px'}}
              name="firstname"
              placeholder="Enter Town/City "
            />
            </div>
            <div className="town">
            <label htmlFor="">State</label>
            <br />
            <input
              type="text"
              id="fname"
              style={{width: '200px'}}
              name="firstname"
              placeholder="Enter State "
            />
            </div>
          </div>
          <br />
          <button className="Edit-Btn">Use this Address</button>
        </form>
        </div>
      </section>
    </>
  );
}

export default EditYourAddress;
