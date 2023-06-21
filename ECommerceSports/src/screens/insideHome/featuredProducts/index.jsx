import * as React from "react";
import "./style.scss";
import data from "../../../JSON_DB/featuredProductItems";
import ProductCard from "../Card/ProductCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import HomeStore from "../../../store/HomeStore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const FeaturedProducts = observer(() => {
  const [products, setProducts] = React.useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterProducts, setFilterProducts] = React.useState([]);
  const [filteredCategory, setFilteredCategory] = React.useState([]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (products?.length !== 0) {
      const filterCategoriesSet = new Set(
        products.map(item => item.CATALOG_NAME)
      );
      const filterCategories = Array.from(filterCategoriesSet);
      setFilteredCategory(filterCategories);
    }
  }, [products]);

  React.useEffect(() => {
    HomeStore.getProducts();
  }, []);

  React.useEffect(() => {
    setProducts(HomeStore.data.products);
  }, [HomeStore.data.products]);

  React.useEffect(() => {
    if (products?.length !== 0) {
      const filteredData = products.filter(item => {
        if (filterCategory === "") return item;
        return item.CATALOG_NAME === filterCategory;
      });
      setFilterProducts(filteredData);
    }
  }, [filterCategory, products]);

  return (
    <div className='featured-products-container'>
      <div className='heading'>Featured Products</div>
      {/* <div className='featured-product__filter'>
        <div
          className={`filter-options ${
            filterCategory === "" ? "active-filter" : ""
          }`}
          onClick={() => setFilterCategory("")}
        >
          All products
        </div>
        {filteredCategory &&
          filteredCategory?.length !== 0 &&
          filteredCategory.map(category => (
            <div
              className={`filter-options ${
                category === filterCategory ? "active-filter" : ""
              }`}
              key={category}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </div>
          ))}
      </div> */}

      {/* <div className='admin-dashboard'> */}
      <div
        className='admin-tabs'
        style={{
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          margin: "4% 0%"
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          indicatorColor='white'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
          textColor='inherit'
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            width: "auto",
            "&.MuiTabs-indicator": {
              color: "white",
              background: "white"
            }
          }}
        >
          <Tab
            label='All Products'
            onClick={() => setFilterCategory("")}
            sx={{
              color: "#FFFFFF",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "37px",
              backgroundColor: "#3f51b5",
              border: "5px solid #FFFFFF"
            }}
            // {...a11yProps(0)}
          />
          {filteredCategory &&
            filteredCategory?.length !== 0 &&
            filteredCategory.map(category => (
              // <div
              //   className={`filter-options ${category === filterCategory ? "active-filter" : ""
              //     }`}
              //     >
              //   {category}
              // </div>
              <Tab
                label={category}
                onClick={() => setFilterCategory(category)}
                key={category}
                sx={{
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "37px",
                  backgroundColor: "#3f51b5",
                  border: "5px solid #FFFFFF"
                }}
                // {...a11yProps(0)}
              />
            ))}
        </Tabs>
      </div>
      {/* </div> */}
      <div className='product-cards-container'>
        {filterProducts &&
          filterProducts?.length !== 0 &&
          filterProducts.map(item => (
            <ProductCard key={item.PRODUCT_ID} item={item} />
          ))}
      </div>
      <div className='view-all-btn-container'>
        <Link to='/products' className='view-all-btn'>
          View All
        </Link>
      </div>
    </div>
  );
});

export default FeaturedProducts;
