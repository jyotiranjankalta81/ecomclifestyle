import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { toast } from "react-toastify";
import { BASE_IMAGE_URL } from "../../api/config";
import HomeStore from "../../store/HomeStore";
import UserStore from "../../store/UserStore";
import AddIcon from "../Icons/Add-icon";
import RemoveIcon from "../Icons/Remove-icon";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import paymentCard from "./card-payment.png";
import ProductStore from "../../store/ProductStore";
import { displayRazorpay } from "../../screens/RazorPay/RazorPay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #3f51b5",
  p: 2,
  borderRadius: "10px"
};
const CheckoutItem = observer(({ finalprice, cartItems, email }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [colorList, setColorList] = useState();
  const [sizeList, setSizeList] = useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var today = moment();
  var tomorrow = moment(today).add(2, "days").format("dddd");

  const addQty = item => {
    let data = {
      CART_PRODUCT_ID: item?.CART_PRODUCT_ID,
      CART_PRODUCT_COLOR: item?.CART_PRODUCT_COLOR,
      CART_PRODUCT_QUANTITY: item?.CART_PRODUCT_QUANTITY + 1,
      CART_PRODUCT_SIZE: item?.CART_PRODUCT_SIZE,
      CART_ID: item?.CART_ID
    };
    HomeStore.manageQty(data, navigationCallBack);
  };

  const removeQty = item => {
    if (item?.CART_PRODUCT_QUANTITY == 1) {
      swal({
        title: "Are you sure?",
        text: "Remove This Product",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          HomeStore.deleteCart(item?.CART_ID, navigationCallBackDelete);
        }
      });
      return;
    }

    let data = {
      CART_PRODUCT_ID: item?.CART_PRODUCT_ID,
      CART_PRODUCT_COLOR: item?.CART_PRODUCT_COLOR,
      CART_PRODUCT_QUANTITY: item?.CART_PRODUCT_QUANTITY - 1,
      CART_PRODUCT_SIZE: item?.CART_PRODUCT_SIZE,
      CART_ID: item?.CART_ID
    };

    HomeStore.manageQty(data, navigationCallBack);
  };
  const navigationCallBack = () => {
    HomeStore.getCarts();
    toast("Successfully added");
  };
  const navigationCallBackDelete = () => {
    HomeStore.getCarts();
    toast("Successfully Removed");
  };

  useEffect(() => {
    let address = localStorage.getItem("address");
    setSelectedAddress(JSON.parse(address));
    UserStore.getAddress();
    ProductStore.getColor();
    ProductStore.getSize();
  }, []);

  useEffect(() => {
    setAddress(UserStore?.data?.addressList);
  }, [UserStore.data.addressList]);

  const gotoAddAdress = () => {
    navigate("/address");
  };
  const handleChangeRadio = event => {
    setSelectedAddress(event);
    localStorage.setItem("address", JSON.stringify(event));
  };
  useEffect(() => {
    setColorList(ProductStore.data.colorList);
  }, [ProductStore.data.colorList]);

  useEffect(() => {
    setSizeList(ProductStore.data.sizeList);
  }, [ProductStore.data.sizeList]);

  const onPlaceOrder = () => {
    if (!paymentMethod && paymentMethod != 0) {
      toast.warn("Please select any payment method");
      return false;
    }

    let product = cartItems?.map(item => {
      console.log("items", item);
      return [
        {
          product_id: item?.CART_PRODUCT_ID,
          quantity: item?.CART_PRODUCT_QUANTITY,
          price: item.PRODUCT_PRICE,
          discount: item?.PRODUCT_DISCOUNT
        }
      ];
    });

    let total = cartItems?.map(item => {
      return (
        (item?.PRODUCT_PRICE -
          (item?.PRODUCT_PRICE * item?.PRODUCT_DISCOUNT) / 100) *
        item?.CART_PRODUCT_QUANTITY
      );
    });

    const sum = total.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    HomeStore.loading = true;
    if (paymentMethod === 0) {
      displayRazorpay({ ammount: parseInt(finalprice), userid: "1" }, data => {
        let param = {
          USER_ORDER: JSON.stringify(product[0]),
          PAYMENT_ID: data.razorpay_payment_id,
          AMOUNT: finalprice,
          TYPE_OF_PAYMENT: paymentMethod
        };
        HomeStore.placeOrder(param, navigationCallBackOrder);
      });
    } else {
      let param = {
        USER_ORDER: JSON.stringify(product[0]),
        PAYMENT_ID: "Cash",
        AMOUNT: finalprice,
        USER_ADDRESS: JSON.stringify(selectedAddress),
        TYPE_OF_PAYMENT: paymentMethod
      };
      console.log("products", param);
      HomeStore.placeOrder(param, navigationCallBackOrder);
    }
  };
  const navigationCallBackOrder = data => {
    setPaymentMethod("");
    HomeStore.getCarts();
    swal({
      title: "Order Placed!",
      text: `Thank you for shopping at QUALITY CRICKET! Your order no. ${data} has been received. We’ll text you when your order has shipped`,
      icon: "success"
    });
    navigate("/");
  };
  return (
    <>
      <div className='item-flexs'>
        <section className='checkout'>
          <div className='addressbox'>
            <div className='checkout-addres'>
              <span style={{ color: "#3F51B5" }}>1</span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "22px",
                  lineHeight: "27px",
                  color: "#A5A4A4"
                }}
              >
                Delivery Address
              </span>
            </div>
            <div className='address'>
              {selectedAddress && (
                <p className='adddetails'>
                  {selectedAddress?.FULLNAME} {selectedAddress?.FLAT}{" "}
                  {selectedAddress?.STREET} ,{selectedAddress?.LANDMARK},{" "}
                  {selectedAddress?.CITY}, {selectedAddress?.STATE}{" "}
                  {selectedAddress?.PIN}
                </p>
              )}
              {!selectedAddress && (
                <p className='adddetails'>Please Select Address</p>
              )}
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#3F51B5",
                  position: "relative",
                  bottom: "30px",
                  cursor: "pointer"
                }}
                onClick={handleOpen}
              >
                {!selectedAddress ? "Choose +" : "Change"}
              </span>
            </div>
          </div>
          <div className='checkout-summary'>
            <div className='summary-head'>
              <span style={{ color: "#3F51B5" }}>2</span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "22px",
                  lineHeight: "27px",
                  color: "#A5A4A4"
                }}
              >
                Order Summary
              </span>
            </div>
            {cartItems?.map(item => {
              return (
                <div className='order-list'>
                  <div className='product-img'>
                    <img
                      crossOrigin='anonymous'
                      src={BASE_IMAGE_URL + JSON?.parse(item.PRODUCT_IMAGE)[0]}
                      alt=''
                    />
                  </div>
                  <div className='product-title'>
                    <p>{item?.PRODUCT_NAME}</p>
                    <span className='seller'>
                      Size:{" "}
                      {
                        sizeList?.find(
                          x => x.PRODUCTSIZE_ID === item?.CART_PRODUCT_SIZE
                        )?.PRODUCTSIZE_NAME
                      }
                    </span>
                    <span className='seller'>
                      Color:{" "}
                      {
                        colorList?.find(
                          x => x.PRODUCTCOLOR_ID === item?.CART_PRODUCT_COLOR
                        )?.PRODUCTCOLOR_NAME
                      }
                    </span>
                    <span className='seller'>Seller: Quality Cricket</span>
                    <span className='seller'>
                      M.R.P.: <del>${item?.PRODUCT_PRICE}</del>
                      <span style={{ color: "#000000" }}>
                        $
                        {item?.PRODUCT_PRICE -
                          (item?.PRODUCT_PRICE * item.PRODUCT_DISCOUNT) / 100}
                      </span>{" "}
                      &nbsp;
                      <span style={{ color: "#3F51B5" }}>
                        {item.PRODUCT_DISCOUNT}% off
                      </span>
                    </span>

                    <div className='product-quantity'>
                      <span
                        className='actionnumber'
                        onClick={() => removeQty(item)}
                      >
                        <RemoveIcon />
                      </span>
                      <span className='product-number'>
                        {item?.CART_PRODUCT_QUANTITY}
                      </span>
                      <span
                        className='actionnumber'
                        onClick={() => addQty(item)}
                      >
                        <AddIcon />
                      </span>
                    </div>
                  </div>
                  <div className='delivery-date'>
                    <span>Delivery in 2 days, {tomorrow}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className='checkout-email'>
            <span style={{ color: "#3F51B5" }}>3</span>         
            <div className='gifcardbox'>
              <div className='checkout-addres'> 
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "22px",
                    lineHeight: "27px",
                    color: "#A5A4A4"
                  }}
                >
                  Add Coupon Here
                </span>
              </div>
              <div className='giftcard'>
                <input placeholder='Enter code' />
                <span>
                  <button>
                    <span>Apply</span>
                  </button>
                </span>
              </div>
            </div>
          </div> */}

          <div className='checkout-summary'>
            <div className='summary-head'>
              <span style={{ color: "#3F51B5" }}>3</span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "22px",
                  lineHeight: "27px",
                  color: "#A5A4A4"
                }}
              >
                Payment Options
              </span>
            </div>
            {/* <div className="payment-radio"> */}
            <label className='rad-label'>
              <input
                type='radio'
                onClick={() => setPaymentMethod(0)}
                className='rad-input'
                name='rad'
                valu={paymentMethod}
              />
              <div className='rad-design'></div>
              <div className='rad-text'>Pay Online</div>
            </label>
            <div className='paymentcard'>
              <img src={paymentCard} alt='' />
            </div>
            {/* <label className='rad-label'>
              <input
                type='radio'
                onClick={() => setPaymentMethod(0)}
                className='rad-input'
                name='rad'
              />
              <div className='rad-design'></div>
              <div className='rad-text'>Net Banking</div>
            </label> */}
            <label className='rad-label'>
              <input
                type='radio'
                onClick={() => setPaymentMethod(1)}
                className='rad-input'
                name='rad'
                valu={paymentMethod}
              />
              <div className='rad-design'></div>
              <div className='rad-text'>Cash On Delivery / Pay on Delivery</div>
            </label>
            {/* </div> */}
            {/* <button disabled={HomeStore.loading} onClick={() => onPlaceOrder()}>
              <span>{HomeStore.loading ? "Loading..." : "Continue"}</span>
            </button> */}
          </div>
          <div className='checkout-email'>
            <span style={{ color: "#3F51B5" }}>4</span>
            <span
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "19px",
                color: "#7E7E7E"
              }}
            >
              Order confirmation email will be sent to{" "}
              <span style={{ color: "#000000" }}>{email}</span>
            </span>
            <span>
              <button
                style={{ marginLeft: "130px" }}
                onClick={() => onPlaceOrder()}
              >
                <span>Place Order</span>
              </button>
            </span>
          </div>
        </section>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h2 id='parent-modal-title' style={{ textAlign: "center" }}>
            Your addresses
          </h2>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {address &&
              address?.length > 0 &&
              address.map((addr, index) => {
                return (
                  <div key={index + "address"}>
                    <ListItem
                      alignItems='flex-start'
                      className='pointer'
                      htmlFor='radiobtn'
                    >
                      <FormControlLabel
                        id='radiobtn'
                        onClick={() => handleChangeRadio(addr)}
                        control={<Radio />}
                        label=''
                      />
                      <ListItemText
                        primary={addr?.FULLNAME}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              {addr?.FLAT} {addr?.STREET}
                            </Typography>
                            <br />
                            {addr?.LANDMARK}, {addr?.CITY}, {addr?.STATE} -{" "}
                            {addr?.PIN}
                            <br />
                            Phone number : {addr?.PHONE}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider component='li' />
                  </div>
                );
              })}
            <p
              style={{ textAlign: "right" }}
              className='pointer'
              onClick={gotoAddAdress}
            >
              + Add New Address
            </p>
          </List>
          <Box textAlign='center'>
            <Button variant='contained' onClick={handleClose}>
              Continue
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
});

export default CheckoutItem;
