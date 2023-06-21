import React, { useState, useEffect } from "react";
import Footer from "../../screens/Footer/Footer";
import "./Ratingpage.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import OrderStore from "../../store/OrderStore";

function Ratingpage () {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [rate, setRate] = useState();
  const [feedback, setFeedback] = useState();

  console.log("rating item");
  const goBack = () => {
    navigate(-1);
  };

  const giveRating = () => {
    let param = {
      ORDER_ID: state?.item?.ORDER_ID,
      PRODUCT_ID: state?.product?.PRODUCT_ID,
      RATING: rate,
      REVIEWS: feedback
    };
    OrderStore.giveRating(param, navigationCallBack);
  };

  const navigationCallBack = () => {
    OrderStore.getOrders();
    navigate(-1);
  };

  return (
    <>
      <section className='rating-review'>
        <button className='btn2' type='button' onClick={goBack}>
          <ArrowBackIosIcon /> Back
        </button>
        <h1>Ratings & Reviews </h1>
      </section>
      <div className='rating-review1'>
        <h2>What make a good review</h2>
      </div>

      <section className='rating-review3'>
        <div className='rating-div'>
          <h3> Have you used this product?</h3>
          <p>Your review should be abount your experience with the product.</p>

          <h3> Why review a products? </h3>
          <p>Your valuable feedback will help fellow shoppers decide!</p>
        </div>

        <hr />

        <div className='rating-div1'>
          <h3>Rate this product</h3>
          <div className='rate'>
            <input
              type='radio'
              id='star5'
              name='rate'
              value='5'
              onChange={e => setRate(e.target.value)}
            />
            <label for='star5' title='Five'>
              5 stars
            </label>
            <input
              type='radio'
              id='star4'
              name='rate'
              value='4'
              onChange={e => setRate(e.target.value)}
            />
            <label for='star4' title='Four'>
              4 stars
            </label>
            <input
              type='radio'
              id='star3'
              name='rate'
              value='3'
              onChange={e => setRate(e.target.value)}
            />
            <label for='star3' title='Three'>
              3 stars
            </label>
            <input
              type='radio'
              id='star2'
              name='rate'
              value='2'
              onChange={e => setRate(e.target.value)}
            />
            <label for='star2' title='Two'>
              2 stars
            </label>
            <input
              type='radio'
              id='star1'
              name='rate'
              value='1'
              onChange={e => setRate(e.target.value)}
            />
            <label for='star1' title='One'>
              1 star
            </label>
          </div>
          <h3>Review this product </h3>
          <textarea
            onChange={e => setFeedback(e.target.value)}
            placeholder='Enter product review'
            cols='15'
            rows='10'
          ></textarea>

          <button className='btn1' type='button' onClick={giveRating}>
            Submit
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Ratingpage;
