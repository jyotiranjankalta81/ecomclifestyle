import React from "react";
import "../ratingreview/ratingview.style.scss";
import StarIcon from "@mui/icons-material/Star";
import ProgressBar from "../ratingreview/ProgressBar.component";
import DoneIcon from "@mui/icons-material/Done";
import Like from "../Icons/Like";
import Dislike from "../Icons/Dislike";
import { Link } from "react-router-dom";

const RatingReviews = () => {
  const reviewData = [
    { star: 5, bgcolor: "#07AC0E", completed: 100, totalreview: 550 },
    { star: 4, bgcolor: "#07AC0E", completed: 60, totalreview: 35 },
    { star: 3, bgcolor: "#DB0404", completed: 70, totalreview: 60 },
    { star: 2, bgcolor: "#FF7B00", completed: 40, totalreview: 50 },
    { star: 1, bgcolor: "#FF7B00", completed: 30, totalreview: 30 }
  ];

  const userReview = [
    {
      star: 5,
      name: "Pranay Shukla",
      msg: "Pranay Says, The Bat is very nice and it is good for hitter who loves to hit six and it is also good for 14year old boys love it thank you"
    },
    {
      star: 4,
      name: "Amit",
      msg: "Amit Says, The Bat is very nice and it is good for hitter who loves to hit six and it is also good for 14year old boys love it thank you"
    },
    {
      star: 5,
      name: "Vikas",
      msg: "Vikas Says, The Bat is very nice and it is good for hitter who loves to hit six and it is also good for 14year old boys love it thank you"
    }
  ];

  return (
    <>
      <div className='ratingtop' id='rating'>
        <h3 className='ratinghead'>Rating & Reviews</h3>
        <button className='rateproduct'>
          <Link
            to='/rating-page'
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Rate Product
          </Link>
        </button>
      </div>
      <div className='commentsplusprogressbar'>
        <div className='comments'>
          <span
            style={{
              textAlign: "center",
              justifyContent: "center",
              width: "129px",
              height: "130px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <p style={{ fontSize: "50px", margin: "6px" }}>
              3.6
              <StarIcon sx={{ height: "23px", width: "22px" }} />
            </p>
            <span>1,245 Rating & 850 Reviews</span>
          </span>
        </div>
        <div className='progress-bar'>
          {reviewData.map((item, idx) => (
            <ProgressBar
              key={idx}
              star={item.star}
              bgcolor={item.bgcolor}
              completed={item.completed}
              number={item.totalreview}
            />
          ))}
        </div>
      </div>
      <div className='usercomments'>
        {userReview.map((comments, index) => {
          return (
            <div key={index} className='commentlist'>
              <span
                style={{
                  background: "#07AC0E",
                  color: "white",
                  borderRadius: "5px",
                  width: "88px",
                  height: "26px",
                  padding: "4px 20px"
                }}
              >
                {comments.star}{" "}
                <StarIcon
                  sx={{
                    height: "19px",
                    width: "18px",
                    color: "white",
                    paddingTop: "4px"
                  }}
                />
              </span>
              <span style={{ marginLeft: "15px" }}>{comments.name}</span>
              <p>
                {comments.msg} &nbsp; {comments.msg}
              </p>
              <div
                style={{
                  display: "flex",
                  color: "#808080",
                  textAlign: "center",
                  justifyContent: "space-between"
                }}
              >
                <span>
                  Quality Cricket Customer&nbsp;&nbsp;
                  <DoneIcon sx={{ position: "relative", top: "5px" }} />
                  Certified Buyer
                </span>
                <span>
                  <Like />
                  &nbsp;{123} &nbsp; <Dislike />
                  &nbsp; {500}{" "}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RatingReviews;
