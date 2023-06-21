import React from "react";
import Rating from "@mui/material/Rating";
import "./ProductInfo.css";
import moment from "moment/moment";

const ProductInfo = (props) => {
  console.log(props,"tech details");
  return (
    <>
      <div className='product_info_container'>
        <h2>Product Information</h2>
        <div className='product_info_header'>
          <h3 className='info_headers'>Technical Details</h3>
          <h3 className='info_headers_right'>Additional Information</h3>
        </div>
        <div className='product_info_main_container'>
          <div className='product_sub_container'>
          {props?.details?.TECHINFO != "" && (
            <span
              dangerouslySetInnerHTML={{
                __html: props?.details?.TECHINFO
              }}
            />
          )}
          </div>
          <div className='product_sub_container'>
          {props?.details?.ADDITINFO != "" && (
            <span
              dangerouslySetInnerHTML={{
                __html: props?.details?.ADDITINFO
              }}
            />
          )}
          </div>
          <div className='product_sub_container'>
            <p className='product_details_value'> #{props?.details?.COMPANYCODE}</p>
            <p className='product_details_value'>
              <Rating
                name='half-rating-read'
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
              &nbsp; 1339 ratings
              {/* <span className='rating_span'>3.4 out of 5 stars</span> */}
            </p>
            <p className='product_details_value'>#3 in popular willow</p>
            <p className='product_details_value'>{moment(props?.details?.updatedAt).format("dddd, MMMM Do YYYY")}</p>
            <p className='product_details_value'>Ske, Shri Kalka 77</p>
            <p className='product_details_value'>Shri Kalka 77</p>
            <p className='product_details_value'>{props?.details?.WEIGHT}</p>
            <p className='product_details_value'>70 X 8 X 5 Centimeters</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
