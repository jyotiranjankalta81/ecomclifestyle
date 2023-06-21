import React, { useState, useEffect } from "react";
import Popup from "../../Popup";
import "./YourAddress.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { observer } from "mobx-react-lite";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import UserStore from "../../../store/UserStore";
import swal from "sweetalert";
import EditYourAddress from "../edityourAddress/EditYourAddress";
import { Dialog } from "@material-ui/core";

const YourAddress = observer(() => {
  const [openPopup, setOpenPopup] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    UserStore.getAddress()
  }, []);

  useEffect(() => {
    setAddress(UserStore.data.addressList)
  }, [UserStore.data.addressList]);

  const onDelete = (data) => {
    swal({
      title: "Are you sure?",
      text: "Once delete you can not get again!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          UserStore.addressDelete( data.ADDRESS_ID, navigationCallBackDelete)
        }
      });
  }
  const navigationCallBackDelete = () => {
    UserStore.getAddress()
  }

  const onEdit = (address) => {
    setAddressData(address);
    setOpenPopup(true);
  }
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
          {address?.map((addr,index) => {
            return (
              <div key={index +'address'} className="card-address">
                <div className='add-div2'>
                  {/* <h4>Default: Address</h4> */}
                  <button className='div2-btn' type='button' onClick={() => onEdit(addr)} >
                    Edit
                  </button>
                  <hr />
                  <button className='div2-btn' type='button' onClick={() => onDelete(addr)}>
                    {" "}
                    Remove
                  </button>
                </div>
                <p>
                  {addr?.FULLNAME} {addr?.FLAT} {addr?.STREET}, {addr?.CITY},{addr?.STATE} {addr?.PIN}
                  {addr?.COUNTRY}
                  <br />
                  Landmark: {addr?.LANDMARK}
                  <br />
                  Phone number: {addr?.PHONE}
                </p>
              </div>)
          })

          }
        </div>

      </section>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} addressData={addressData} />

    </>
  );
})

export default YourAddress;
