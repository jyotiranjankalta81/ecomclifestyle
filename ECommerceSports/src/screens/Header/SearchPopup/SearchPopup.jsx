import React from "react";
import "./SearchPopup.css";
import { Dialog } from "@mui/material";
const SearchPopup = ({ open }) => {
  const handleClose = () => open(false);
  return (
    <div>
      {/* <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      > */}
      <div className='product_details_name' onMouseLeave={handleClose}>
        <p className='header_name'>POPULAR SUGGESTIONS</p>
        <p className='product_names'>Western Ball</p>
        <p className='product_names'>Catag Bat</p>
        <p className='product_names'>Pedrik Bat</p>
        <p className='product_names'>Cosco Ball</p>
        <p className='product_names'>Rugby Bat</p>
        <p className='header_name'>CATEGORY SUGGESTIONS</p>
        <p className='product_names'>Ball</p>
        <p className='product_names'>Bat</p>
        <p className='product_names'>Bat</p>
        <p className='product_names'>Ball</p>
        <p className='header_name'>PRODUCTS</p>
        <div className='products_searches'>
          <img
            src='/Images/FastDelivery/img.jpg'
            alt=''
            className='products_search_img'
          />
          <div className='search_descripation'>
            <p className='search_product_name'>Western Ball</p>
            <p className='search_product_price'>$60</p>
          </div>
        </div>
        <div className='products_searches'>
          <img
            src='/Images/FastDelivery/img.jpg'
            alt=''
            className='products_search_img'
          />
          <div className='search_descripation'>
            <p className='search_product_name'>Western Ball</p>
            <p className='search_product_price'>$60</p>
          </div>
        </div>
        <div className='products_searches'>
          <img
            src='/Images/FastDelivery/img.jpg'
            alt=''
            className='products_search_img'
          />
          <div className='search_descripation'>
            <p className='search_product_name'>Western Ball</p>
            <p className='search_product_price'>$60</p>
          </div>
        </div>
      </div>

      {/* <h3>kalta</h3> */}
      {/* </Dialog> */}
    </div>
  );
};

export default SearchPopup;
