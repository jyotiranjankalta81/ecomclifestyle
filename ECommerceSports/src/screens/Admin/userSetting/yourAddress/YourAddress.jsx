import React, { useState } from "react";
import Popup from "../../Popup";
import "./YourAddress.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function YourAddress () {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className='your-address-sec'>
        <button className='btn-1' type='button'>
          <ArrowBackIosIcon /> Back
        </button>
      </section>
      <section className='your-address-sec1'>
        <div className='add-div'>
          <button
            className='button12'
            type='button'
            onClick={() => {
              setOpenPopup(true);
            }}
          >
            + Add new address
          </button>
        </div>
        <div className='add-div1'>
          <h1>Your Addresses</h1>
          <div className='add-div2'>
            <h4>Default: Address</h4>
            <button className='div2-btn' type='button'>
              Edit
            </button>
            <hr />
            <button className='div2-btn' type='button'>
              {" "}
              Remove
            </button>
          </div>
          <p>
            Pranay Shukla 123/B xyz Colony, kanpur KANPUR, UTTAR PARDESH 203210
            India Phone number:
          </p>
        </div>
      </section>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}

export default YourAddress;
