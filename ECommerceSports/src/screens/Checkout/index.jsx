import React, { useState, useEffect } from "react";
import CheckoutConfirm from "../../components/checkout/CheckoutConfirm";
import CheckoutItem from "../../components/checkout/CheckoutItem.component";
import { observer } from "mobx-react-lite";
import HomeStore from "../../store/HomeStore";
import "./style.scss";
import empty from "../../assets/empty.webp";
import { toast } from "react-toastify";
import CouponStore from "../../store/CouponStore";

const Checkout = observer(() => {
  const [checkoutContinue, setCheckoutContinue] = useState(true);
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [finalprice, setFinalPrice] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [saving, setSaving] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    HomeStore.getCarts();
  }, []);

  useEffect(() => {
    setCart(HomeStore?.data?.carts);
  }, [HomeStore.data.carts]);

  useEffect(() => {
    let total = cart?.map(item => {
      return (
        (item?.PRODUCT_PRICE -
          (item?.PRODUCT_PRICE * item?.PRODUCT_DISCOUNT) / 100) *
        item?.CART_PRODUCT_QUANTITY
      );
    });
    setFinalPrice(total.reduce((a, b) => a + b, 0));
    setTotalPrice(total.reduce((a, b) => a + b, 0));

    let totalSaving = cart?.map(item => {
      return (
        ((item?.PRODUCT_PRICE * item?.PRODUCT_DISCOUNT) / 100) *
        item?.CART_PRODUCT_QUANTITY
      );
    });
    setSaving(totalSaving.reduce((a, b) => a + b, 0));
  }, [cart]);

  const gotoPayment = () => {
    if (!localStorage.getItem("address")) {
      toast.warn("Please select address!");
    } else {
      setCheckoutContinue(false);
    }
  };
  const handleChange = e => {
    setCouponCode({ COUPON_CODE: e.target.value });
  };
  const applyCouponCode = () => {
    if (!couponCode) {
      toast.warn("Enter Coupon!");
      return;
    }
    CouponStore.applyCoupon(couponCode, navigationCallBackCoupon);
  };
  const navigationCallBackCoupon = data => {
    const initialValue = 0;
    let orderCount = cart?.map(item => {
      return item?.CART_PRODUCT_QUANTITY;
    });
    let orderCountTotal = orderCount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    if (data?.COUPON_MINORDER >= orderCountTotal) {
      toast.error(
        `Order must be equal to or more then ${data?.COUPON_MINORDER}`
      );
      return;
    }
    if (data?.COUPON_MINORDER >= finalprice) {
      toast.error(
        `Final price must be equal to or more then ${data?.COUPON_MINORDER}`
      );
      return;
    }
    let grandTotal = (finalprice * data?.COUPON_DISCOUNTPERCENT) / 100;
    if (grandTotal <= data?.COUPON_MAXDISCOUNT) {
      setCouponDiscount(grandTotal);
      setFinalPrice(finalprice - grandTotal);
    } else {
      setFinalPrice(finalprice - data?.COUPON_MAXDISCOUNT);
      setCouponDiscount(data?.COUPON_MAXDISCOUNT);
    }
  };
  const removeCouponCode = () => {
    if (couponDiscount) {
      setFinalPrice(finalprice + couponDiscount);
    } else {
      setFinalPrice(finalprice);
    }
    setCouponCode("");
    setCouponDiscount("");
  };

  return (
    <div className='checkout-container'>
      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      {cart && cart?.length === 0 ? (
        <div style={{ alignSelf: "center" }}>
          <img src={empty} alt='' className='empty' />{" "}
        </div>
      ) : (
        <div className='item-flex'>
          {checkoutContinue ? (
            <CheckoutItem
              cartItems={cart}
              email={email}
              finalprice={finalprice?.toFixed(2)}
            />
          ) : (
            <CheckoutConfirm cartItems={cart} />
          )}

          {checkoutContinue ? (
            <section className='cart' style={{ flexDirection: "column" }}>
              <div className='pricedetailbox'>
                <div
                  className='checkout-addres'
                  style={{ borderBottom: "0.9px solid #BFBFBF" }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "22px",
                        lineHeight: "27px",
                        color: "#A5A4A4"
                      }}
                    >
                      Price Details
                    </span>
                  </div>
                </div>
                <div className='pricebox'>
                  <div className='itemprice'>
                    <span>Price ({cart?.length} item)</span>
                    <span>${totalprice?.toFixed(2)}</span>
                  </div>
                  <div className='itemprice'>
                    <span>Delivery Charges</span>
                    <span
                      style={{
                        color: "#0A820F",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "19px"
                      }}
                    >
                      Free
                    </span>
                  </div>
                </div>
                <div className='gifcardbox'>
                  <div className='giftcard'>
                    <div className='search-wrapper'>
                      <input
                        type='text'
                        disabled={couponDiscount}
                        value={couponCode && couponCode?.COUPON_CODE}
                        onChange={handleChange}
                        name='focus'
                        className='search-box'
                        placeholder='Enter Code'
                      />
                      <button
                        style={couponCode ? {} : { display: "none" }}
                        onClick={() => removeCouponCode()}
                        className='close-icon'
                        type='button'
                      ></button>
                      {!couponDiscount && (
                        <button
                          style={{ marginLeft: 5 }}
                          onClick={applyCouponCode}
                        >
                          <span>Apply</span>
                        </button>
                      )}
                    </div>
                    <span></span>
                  </div>
                </div>
                {couponDiscount > 0 && (
                  <div
                    className='itemprice'
                    style={{ borderBottom: "0.9px solid #BFBFBF" }}
                  >
                    <span>Coupon Discount</span>
                    <span> - ${couponDiscount?.toFixed(2)}</span>
                  </div>
                )}
                <div
                  className='itemprice'
                  style={{ borderBottom: "0.9px solid #BFBFBF" }}
                >
                  <span>Total Payable</span>
                  <span>${finalprice?.toFixed(2)}</span>
                </div>
                <div
                  className='itemprice'
                  style={{
                    color: "#0A820F",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "17px"
                  }}
                >
                  Your Total Saving on this order ${saving?.toFixed(2)}
                </div>
              </div>
              {/* <span className='checkout-email'>
                <button onClick={() => gotoPayment()}>
                  <span>Place Order</span>
                </button>
              </span> */}
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
});

export default Checkout;
