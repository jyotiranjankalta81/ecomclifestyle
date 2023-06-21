import React from "react";
import "./Invoice.css";
import { useLocation, useNavigate } from "react-router-dom";

const Invoice = () => {
  const { state } = useLocation();
  const print = () => {
    window.print();
  };

  console.log(state.USER_ORDER);
  return (
    <>
      <div className='print_container'>
        <div className='print_sub_container'>
          <h3>Details for Order #{state?.item?.ORDER_ID}</h3>
          <p className='print_para' onClick={print}>
            <u>Print this page for your records.</u>
          </p>

          <div className='order_short_details'>
            <p className='order_placed'>
              <b>Order Placed:&nbsp;</b>
              24 February 2023
            </p>
            <p className='order_placed'>
              <b>Amazon.in order numbe:</b>
              405-2463778-3647519
            </p>
            <p className='order_placed'>
              <b>Order Total:</b>
              249.00
            </p>
          </div>
          <h3>Not Yet Dispatched</h3>
          <div className='item_order'>
            <div className='items_oredred_details'>
              <h3>Items Ordered</h3>
              <p>
                1 of: Hoplon Polypropylene Disposable Medicare 3 Ply Single Use
                Mask with Built In Nose Pin, ISO And CE Certified (Blue, Without
                Valve, Pack of 50) for Unisex Sold by: AegonStore (seller
                profile)
              </p>
            </div>
            <div className='items_oredred'>
              <h3>Price</h3>
              <p>249.00</p>
            </div>
          </div>

          <div className='delivery_details'>
            <h3>Delivery Address:</h3>
            <p className='address_para'>
              Jyoti Ranjan Kalta B-20 kendriya vihar, sec 82 Noida, UTTAR
              PRADESH 201304 India
            </p>
            <h3>Delivery Option:</h3>
            <p className='free_delivery'>FREE Delivery on eligible orders</p>
            <h3>Payment information</h3>
          </div>

          <h3>Payment information</h3>
          <div className='payment_info'>
            <div className='payment_info_left'>
              <h3>Payment Method:</h3>
              <p>Pay on Delivery</p>
            </div>
            <div className='payment_info_right'>
              <p>Item(s) Subtotal: 249.00</p>
              <p>Shipping: 40.00</p>
              <p>Total: 289.00</p>
              <p>Promotion Applied: - 40.0</p>
              <p>-----------------------------------------</p>
              {/* <div className="breake_line"></div> */}
              <p>Grand Total: 249.00 Payment Method: Pay on Delivery</p>
            </div>
          </div>
          <p>To view the status of your order, return to Order Summary.</p>
          <p>Please note: this is not a GST invoice.</p>
        </div>
        <button className='download_invoice' onClick={print}>
          Download Invoice
        </button>
      </div>
    </>
  );
};

export default Invoice;
