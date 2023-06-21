import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled, alpha } from "@mui/material/styles";
import "./Featured-style.scss";
import data from "../../JSON_DB/featuredProductItems";
import ProductCard from "../insideHome/Card/ProductCard";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Filterproduct from "../Filterproduct/Filterproduct";
import { observer } from "mobx-react-lite";
import HomeStore from "../../store/HomeStore";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ProductStore from "../../store/ProductStore";
import { useNavigate, useLocation } from "react-router-dom";

import _ from 'lodash';
const pricehtol = [
  "Availibility",
  "Best Selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, new to old",
  "Date, old to new",
  "% Sale off"
];

const FeaturedProduct = observer(() => {
  const [products, setProducts] = useState([]);
  const [dummyProducts, setDummyProducts] = useState([]);
  const [openPrice, setopenPrice] = React.useState(false);
  const { state } = useLocation();
  const handleClickPrice = e => {
    setopenPrice(!openPrice);
  };

  useEffect(() => {
      ProductStore.applyFilter();
  }, []);

  useEffect(() => {
    setProducts(ProductStore.data.filterProductList);
    setDummyProducts(ProductStore.data.filterProductList)
  }, [ProductStore.data.filterProductList]);

  const sortProducts = (event) => {
    if (event.target.value == 'Alphabetically, A-Z') {
      let sortedProduct = _.orderBy(products, ['PRODUCT_NAME'], ['asc']);
      setProducts(sortedProduct)
    }
    if (event.target.value == 'Alphabetically, Z-A') {
      let sortedProduct = _.orderBy(products, ['PRODUCT_NAME'], ['desc']);
      setProducts(sortedProduct)
    }

    if (event.target.value == 'Price, low to high') {
      let sortedProduct = _.orderBy(products, ['PRODUCT_PRICE'], ['asc']);
      setProducts(sortedProduct)
    }
    if (event.target.value == 'Price, high to low') {
      let sortedProduct = _.orderBy(products, ['PRODUCT_PRICE'], ['desc']);
      setProducts(sortedProduct)
    }

    if (event.target.value == 'Date, new to old') {
      let sortedProduct = _.orderBy(products, ['createdAt'], ['desc']);
      setProducts(sortedProduct)
    }
    if (event.target.value == 'Date, old to new') {
      let sortedProduct = _.orderBy(products, ['createdAt'], ['asc']);
      setProducts(sortedProduct)
    }
    if (event.target.value == '% Sale off') {
      let sortedProduct = _.orderBy(products, ['PRODUCT_DISCOUNT'], ['desc']);
      setProducts(sortedProduct)
    }
  }

  const onSearch = (query) => {
    let filteredList;
    if (query.target.value) {
      filteredList = products.filter(
        item => item.PRODUCT_NAME.toLowerCase().indexOf(query.target.value.toLowerCase()) > -1,
      );
      setProducts(filteredList);
    } else {
      setProducts(dummyProducts);
    }
  }

  return (
    <>
      <div className='main-container'>
        <div className='main-featured-products-container'>
          <div className='heading'>Featured Products</div>
          <div className='search-field'>
            {/* <input
              type='search'
              className='input-search'
              placeholder='Search Products'
            /> */}
            <div className='search_products'>
              {/* <Search>
                <SearchIconWrapper
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end"
                  }}
                >
                  <SearchIcon
                    sx={{
                      background: "#3f51b5",
                      color: "white",
                      width: window.length < 580 ? "18%" : "8%",
                      height: "100%",
                      marginRight: window.length < 580 ? "-10%" : "3%",
                      borderRadius: "7px",
                      padding: "0.4rem"
                    }}
                  />
                </SearchIconWrapper>
                <StyledInputBase
                  sx={{
                    "&.MuiInputBase-input": {
                      width: "100%"
                    }
                  }}
                  placeholder='Search for products'
                  inputProps={{ "aria-label": "search" }}
                />
              </Search> */}
              <div className='search_bar'>
                <input type='search' className='search_input' onChange={onSearch} />
                <div className='search_icon'>
                  <SearchIcon size='medium' sx={{}} />
                </div>
              </div>
            </div>

            <div className='price_filter'>
              <select className='price_select' onChange={sortProducts}>
                {pricehtol?.map(htol => {
                  return (
                    <option value={htol}>{htol}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='filter'>
            <Filterproduct selected={state?.id} />
          </div>
          <div className='main-product-cards-container'>
            {products?.length === 0 ? "No Product Found" : ""}
            {products.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className='next-page'>
          <Link to='/' className='view-all-btn'>
            1
          </Link>
          <Link to='/' className='view-all-btn'>
            2
          </Link>
          <Link to='/' className='view-all-btn'>
            3
          </Link>
          <Link to='/' className='view-all-btn'>
            4
          </Link>
          <span className='etcdot'>. . .</span>
          <Link to='/' className='view-all-btn'>
            10
          </Link>
          <Link to='/' className='view-all-btn' style={{ color: "#939393" }}>
            Next
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
});

export default FeaturedProduct;
