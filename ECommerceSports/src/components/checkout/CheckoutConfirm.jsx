import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import HomeStore from "../../store/HomeStore";
import paymentCard from "./card-payment.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { displayRazorpay } from "../../screens/RazorPay/RazorPay";
import { toast } from "react-toastify";
import CouponStore from "../../store/CouponStore";

const CheckoutConfirm = observer(({ cartItems }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [couponCode, setCouponCode] = useState("");
  
  const onPlaceOrder = () => {
    if (paymentMethod == "") {
      toast.warn("Please select any payment method");
      return false;
    }

    let product = cartItems?.map(item => {
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

    HomeStore.loading = true;

    if (paymentMethod === 0) {
      displayRazorpay({ ammount: parseInt(total), userid: "1" }, data => {
        let param = {
          USER_ORDER: JSON.stringify(product[0]),
          PAYMENT_ID: data.razorpay_payment_id,
          AMOUNT: total.reduce((a, b) => a + b, 0),
          TYPE_OF_PAYMENT: "0"
        };
        HomeStore.placeOrder(param, navigationCallBack);
      });
    } else {
      let param = {
        USER_ORDER: JSON.stringify(product[0]),
        PAYMENT_ID: "Cash",
        AMOUNT: total.reduce((a, b) => a + b, 0),
        TYPE_OF_PAYMENT: "1"
      };
      HomeStore.placeOrder(param, navigationCallBack);
    }
  };

  const navigationCallBack = data => {
    setPaymentMethod("");
    HomeStore.getCarts();
    swal({
      title: "Order Placed!",
      text: `Thank you for shopping at QUALITY CRICKET! Your order no. ${data} has been received. We’ll text you when your order has shipped`,
      icon: "success"
    });
    navigate("/");
  };


  const handleChange = e => {
    setCouponCode({ COUPON_CODE: e.target.value });
  };
  const applyCouponCode = () => {
    CouponStore.applyCoupon(couponCode);
  };

  return (
    <div className='item-flex'>
      <section className='checkout'>
        <div className='gifcardbox'>
          <div className='checkout-addres'>
            <span style={{ color: "#3F51B5" }}>4</span>
            <span
              style={{
                fontWeight: "500",
                fontSize: "22px",
                lineHeight: "27px",
                color: "#A5A4A4"
              }}
            >
              Add Gift Card
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
        <div className='gifcardbox'>
          <div className='checkout-addres'>
            <span style={{ color: "#3F51B5" }}>5</span>
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
            <input placeholder='Enter code' onChange={handleChange} />
            <span>
              <button onClick={applyCouponCode}>
                <span>Apply</span>
              </button>
            </span>
          </div>
        </div>

        <div className='checkout-summary'>
          <div className='summary-head'>
            <span style={{ color: "#3F51B5" }}>6</span>
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
            />
            <div className='rad-design'></div>
            <div className='rad-text'>Pay with Debit/Credit/ATM cards</div>
          </label>
          <div className='paymentcard'>
            <img src={paymentCard} alt='' />
          </div>
          <label className='rad-label'>
            <input
              type='radio'
              onClick={() => setPaymentMethod(0)}
              className='rad-input'
              name='rad'
            />
            <div className='rad-design'></div>
            <div className='rad-text'>Net Banking</div>
          </label>
          <label className='rad-label'>
            <input
              type='radio'
              onClick={() => setPaymentMethod(1)}
              className='rad-input'
              name='rad'
            />
            <div className='rad-design'></div>
            <div className='rad-text'>Cash On Delivery / Pay on Delivery</div>
          </label>
          {/* </div> */}
        </div>
        <button disabled={HomeStore.loading} onClick={() => onPlaceOrder()}>
          <span>{HomeStore.loading ? "Loading..." : "Continue"}</span>
        </button>
      </section>
    </div>
  );
});

export default CheckoutConfirm;
