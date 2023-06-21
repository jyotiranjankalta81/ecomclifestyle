import React from "react";
import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import "./productcart.scss";
import cricketBat from "../../assets/cricket-bat.png";
import cricketKit from "../../assets/cricket-kit.png";
import cricketHelmet from "../../assets/cricketHelmet.png";
import ProductCard from "../insideHome/Card/ProductCard";
import Data from "../../JSON_DB/topSellerItems";
import Footer from "../footer/Footer";
import HomeStore from "../../store/HomeStore";
// import { BASE_IMAGE_URL } from "../../../api/config";
import { BASE_IMAGE_URL } from "../../api/config";
import { observer } from "mobx-react-lite";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

const ProductCart = observer(() => {
  const [openPrice, setopenPrice] = React.useState(false);
  const [cartData, setCartData] = React.useState([]);

  React.useEffect(() => {
    HomeStore.getCarts();
  }, []);

  React.useEffect(() => {
    setCartData(HomeStore.data.carts);
  }, [HomeStore.data.carts]);

  const handleClickPrice = e => {
    setopenPrice(!openPrice);
  };

  return (
    <>
      <div className='cart-body'>
        <h3 style={{ textAlign: "center" }}>Your Cart</h3>
        <List
          sx={{
            pt: 0,
            height: 25,
            float: "right",
            position: "relative",
            bottom: "29px"
          }}
        >
          <button
            className='btn-pricefilter'
            onClick={handleClickPrice}
            style={{
              position: "relative",
              bottom: "38px",
              width: "151px",
              height: "35px",
              borderRadius: "30px",
              textAlign: "center",
              border: "none",
              background: "#3F51B5",
              color: "#FFFFFF"
            }}
          >
            Past 3 months
            {openPrice ? <ExpandLess /> : <ExpandMore />}
          </button>
        </List>

        {cartData &&
          cartData?.length > 0 &&
          cartData?.map(item => <AddCart key={item.CART_ID} item={item} />)}
        <div className='recomend'>
          <span>Recommended based on your purchase</span>
          <button>Continue shopping</button>
        </div>
        <div className='product-cards-container'>
          {Data.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
});

export default ProductCart;

function AddCart ({ item }) {
  if (item?.PRODUCT_IMAGE && item?.PRODUCT_IMAGE != "") {
    var thumbnail = JSON.parse(item?.PRODUCT_IMAGE)[0];
  }

  const handleDelete = param => {
    // return false;
    if (window.confirm("Do You really want to delete blog") === true) {
      axiosInstance.delete("main/delete_cart?CART_ID=" + param).then(res => {
        if (res.data.success) {
          toast.success(res.data.message);
          // window.location.reload();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
    }
  };
  // console.log(item);

  return (
    <div className='cart-container'>
      <div className='cart-id'>
        <span
          style={{
            color: "#333333",
            fontWeight: "500",
            fontSize: "12px",
            lineHeight: "15px"
          }}
        >
          <span style={{ color: "#808080" }}>Order</span> #1256-3526-9865
        </span>
        <span
          style={{
            paddingLeft: "70px",
            color: "#333333",
            fontWeight: "500",
            fontSize: "12px",
            lineHeight: "15px"
          }}
        >
          <span style={{ color: "#808080" }}>Ship to :</span> Pranay Shukla
        </span>
      </div>
      <div className='selected-cart' key={item.PRODUCT_ID}>
        {/* <img src={item.Image} alt="" /> */}
        {item?.PRODUCT_IMAGE && (
          <img
            crossOrigin='anonymous'
            src={BASE_IMAGE_URL + thumbnail}
            alt='img'
          />
        )}
        <div className='product-details'>
          <span className='prodcuttitle'>{item.PRODUCT_NAME}</span>
          <span className='prodcuttitle'>{item.PRODUCT_DISCOUNT}</span>
          <span>
            $ {item.PRODUCT_PRICE}
            <span className='productmrp'>
              &nbsp;M.R.P : <del>${item.PRODUCT_PRICE}</del>
            </span>
          </span>
          <span>Inclusive of all taxes</span>
        </div>
        <div className='cart-buybtn'>
          <button>
            <span>Buy Now</span>
          </button>
          <button onClick={() => handleDelete(item.CART_ID)}>
            <span>Remove {item.CART_ID}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
