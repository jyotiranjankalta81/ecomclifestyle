import React, { useState, useEffect } from "react";
import "./style.scss";
import SimilarProducts from "../../components/similarproducts/SimilarProducts.component";
import RatingView from "../../components/ratingreview/RatingView.component";
import Footer from "../footer/Footer";
import { useLocation,useNavigate } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../api/config";
import HomeStore from "../../store/HomeStore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Rating from "@mui/material/Rating";
import ProductInfo from "./ProductInfo/ProductInfo";
import ReactImageMagnify from "react-image-magnify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { observer } from "mobx-react-lite";
import ProductStore from "../../store/ProductStore";
import { toast } from "react-toastify";

// const IMAGES = [prod1, prod2, prod3];
// const THUMBS = [thumb1, thumb2, thumb3];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const SingleProductContainer = observer(() => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [sizeList, setSizeList] = useState(null);
  const [colorList, setColorList] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ratingRev, setRatingRev] = useState();


  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    ProductStore.getSize();
    ProductStore.getColor();
  }, []);

  useEffect(() => {
    setSizeList(ProductStore?.data?.sizeList);
  }, [ProductStore?.data?.sizeList]);

  useEffect(() => {
    setRatingRev(ProductStore?.data?.ratingreviews);
  }, [ProductStore?.data?.ratingreviews]);

  useEffect(() => {
    setColorList(ProductStore?.data?.colorList);
  }, [ProductStore?.data?.colorList]);

  if (state?.item?.PRODUCT_IMAGE && state?.item?.PRODUCT_IMAGE != "") {
    var init =
      BASE_IMAGE_URL +
      JSON?.parse(state?.item?.PRODUCT_IMAGE)[0].replace(/['"]+/g, "");
  }
  // Single Product Start
  const [currentImage, setCurrentImage] = useState(init);
  const [currentPassedImage, setCurrentPassedImage] = useState(init);
  const [open, setOpen] = useState(false);

  const deviceType = "laptop";

  if (state?.item?.PRODUCT_IMAGE && state?.item?.PRODUCT_IMAGE != "") {
    var final = [];
    var thumbnail = JSON.parse(state?.item?.PRODUCT_IMAGE);
    thumbnail?.forEach(element => {
      final.push(BASE_IMAGE_URL + element.replace(/['"]+/g, ""));
    });
  }

  const handleClick = index => {
    setCurrentImage(final[index]);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addToCard = () => {
    if (!isLoggedIn) {
      toast.warn("Please Login First!");
      return;
    }
    if (!selectedSize) {
      toast.warn("Please Select Size!");
      return;
    }
    if (!selectedColor) {
      toast.warn("Please Select Color!");
      return;
    }
    const data = {
      CART_PRODUCT_ID: state?.item?.PRODUCT_ID,
      CART_PRODUCT_COLOR: selectedColor,
      CART_PRODUCT_QUANTITY: quantity,
      CART_PRODUCT_SIZE: selectedSize
    };
    HomeStore.addToCart(data, navigationCallBack);
  };
  const navigationCallBack = () => {
    HomeStore.getCarts();
  };
  const removeActivatedClass = parent => {
    parent.childNodes.forEach(node => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };
  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  const addQty = () => {
    if (quantity != state?.item?.PRODUCT_QUANTITY) {
      setQuantity(quantity + 1);
    } else {
      toast.warn("You have reached max quantity of the product");
    }
  };
  const removeQty = () => {
    if (quantity != 1) {
      setQuantity(quantity - 1);
    }
  };
  const selectSize = id => {
    if (selectedSize === id) {
      setSelectedSize(null);
      return;
    } else {
      setSelectedSize(id);
    }
  };
  const selectColor = id => {
    if (selectedColor === id) {
      setSelectedColor(null);
      return;
    } else {
      setSelectedColor(id);
    }
  };
  const goto = items => {
    if (!isLoggedIn) {
      toast.warn("Please Login First!");
      return;
    }
    navigate("/product/checkout");
  };

  return (
    <div className='singlepro-container'>
      <div className='core'>
        <section className='gallery'>
          <div className='thumbnails'>
            {final &&
              final.map((th, index) => {
                return (
                  <div
                    className='img-holder'
                    key={index}
                    onClick={e => {
                      handleClick(index);
                      removeActivatedClass(e.currentTarget.parentNode);
                      e.currentTarget.childNodes[0].classList.toggle(
                        "activated"
                      );
                    }}
                  >
                    <div
                      className={`outlay ${index === 0 && "activated"}`}
                    ></div>
                    <img
                      crossOrigin='anonymous'
                      src={th}
                      alt={`product-${index + 1}`}
                    />
                  </div>
                );
              })}
          </div>
          <div className='thumbnail'>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              containerClass='carousel-container'
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={deviceType}
              dotListClass='custom-dot-list-style'
              itemClass='carousel-item-padding-40-px'
            >
              {final &&
                final.map((th, index) => {
                  return (
                    <div
                      className='img-holder'
                      key={index}
                      onClick={e => {
                        handleClick(index);
                        removeActivatedClass(e.currentTarget.parentNode);
                        e.currentTarget.childNodes[0].classList.toggle(
                          "activated"
                        );
                      }}
                    >
                      <div
                        className={`outlay ${index === 0 && "activated"}`}
                      ></div>
                      <img
                        crossOrigin='anonymous'
                        src={th}
                        alt={`product-${index + 1}`}
                      />
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <div className='image'>
            <img
              crossorigin='anonymous'
              src={currentImage}
              alt={currentImage}
              onClick={handleToggle}
            />

            {/* <div className='big_image'>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: currentImage
                  },
                  largeImage: {
                    src: currentImage,
                    width: 1200,
                    height: 1800
                    // crossOrigin:'anonymous'
                  },
                  enlargedImageContainerDimensions: {
                    width: "150%",
                    height: "150%"
                  }
                }}
              />
            </div> */}

            <div className='actionbuttons'>
              <button style={{ background: "#2F80ED" }} onClick={addToCard}>
                {/* <Link
                  to='/home/cart'
                  style={{ color: "#FFFFFF", textDecoration: "none" }}
                > */}
                Add to cart
                {/* </Link> */}
              </button>
              <button style={{ background: "#3F51B5" }}>
                <div
                  onClick={() => goto(state?.item)}
                  style={{ color: "#FFFFFF", textDecoration: "none" }}
                >
                  Buy Now
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Description Start */}
        <section className='description'>
          <h4>{state?.item?.PRODUCT_NAME}</h4>
          <hr />
          <a
            href='#rating'
            style={{
              listStyle: "none",
              textDecoration: "none",
              color: "#000000"
            }}
          >
            <p className='rating_reviews'>
              <Rating
                name='half-rating'
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
              &nbsp; 785 reviews and & 1725 ratings
            </p>
          </a>
          <br />
          <span style={{ color: "#3F51B5" }}>
            {state?.item?.PRODUCT_DISCOUNT}% off
          </span>
          <span>
            &nbsp;SR{" "}
            {(
              parseInt(state?.item?.PRODUCT_PRICE) -
              (parseInt(state?.item?.PRODUCT_PRICE) *
                parseInt(state?.item?.PRODUCT_DISCOUNT)) /
              100
            ).toFixed(2)}
          </span>
          <p className='add_quantity'>
            <RemoveIcon
              className={quantity == 1 ? "icons_cart-disabled" : "icons_cart"}
              onClick={removeQty}
            />
            <span>{quantity}</span>
            <AddIcon
              className={
                state?.item?.PRODUCT_QUANTITY == quantity
                  ? "icons_cart-disabled"
                  : "icons_cart"
              }
              onClick={
                state?.item?.PRODUCT_QUANTITY == quantity ? null : addQty
              }
            />
          </p>
          <p className='mrpval'>M.R.P : SR {state?.item?.PRODUCT_PRICE}</p>
          <span>Inclusive of all taxes</span> <br />
          <hr />
          <h3>About this item</h3>
          {state?.item?.PRODUCT_DESCRIPTION != "" && (
            <span
              dangerouslySetInnerHTML={{
                __html: state?.item?.PRODUCT_DESCRIPTION
              }}
            />
          )}
          <p style={{ margin: "0%" }}>Size:</p>
          <div className='sizes_class'>
            {sizeList &&
              sizeList?.map((size, index) => {
                return (
                  <button
                    key={index + "size"}
                    className={
                      selectedSize === size?.PRODUCTSIZE_ID
                        ? "size_choose_btn_active"
                        : "size_choose_btn"
                    }
                    onClick={() => selectSize(size?.PRODUCTSIZE_ID)}
                  >
                    {size?.PRODUCTSIZE_NAME}
                  </button>
                );
              })}
          </div>
          <br />
          <p style={{ margin: "0%" }}>
            Color: <b>Natural</b>
          </p>
          <div className='sizes_class'>
            {colorList &&
              colorList?.map((col, index) => {
                return (
                  <button
                    key={index + "col"}
                    className={
                      selectedColor == col?.PRODUCTCOLOR_ID
                        ? "size_choose_btn_active"
                        : "size_choose_btn"
                    }
                    onClick={() => selectColor(col?.PRODUCTCOLOR_ID)}
                  >
                    {col?.PRODUCTCOLOR_NAME}
                  </button>
                );
              })}
          </div>
        </section>
        {/* Description End */}
      </div>
      <ProductInfo details={state?.item} />
      <div className='products-slide'>
        <SimilarProducts categoty={state?.item?.CATEGORY_ID} />
      </div>
      <RatingView />
      <div style={{ marginTop: "40px" }}>
        <Footer />
      </div>
    </div>
  );
});

export default SingleProductContainer;
