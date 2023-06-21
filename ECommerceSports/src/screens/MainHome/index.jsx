import React from "react";
import AboutUs from "../insideHome/aboutUs/index";
import FeaturedProducts from "../insideHome/featuredProducts/index";
import TopSellers from "../insideHome/topSellers/index";
import "./style.scss";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/material/styles";

import Img1 from "../../assets/img1.jpeg";
import Img2 from "../../assets/img2.jpeg";
import Img3 from "../../assets/img3.jpeg";
import Img4 from "../../assets/img4.jpeg";
import Img5 from "../../assets/img5.jpeg";
import Footer from "../Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HomeStore from "../../store/HomeStore";
import { useEffect } from "react";
import { BASE_IMAGE_URL } from "../../api/config";
import ProductStore from "../../store/ProductStore";
import { useNavigate,useLocation } from "react-router-dom";


const Home = observer(() => {
  const [bannerList, setBannerList] = React.useState([]);
  const [brandList, setBrandList] = React.useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    HomeStore.getBanners();
    ProductStore.getBrand();
  }, []);

  useEffect(() => {
    setBannerList(HomeStore.data.bannersList);
  }, [HomeStore.data.bannersList]);

  useEffect(() => {
    setBrandList(ProductStore?.data?.brandList.slice(0, 10));
  }, [ProductStore.data.brandList]);

  const gotoProductList = (brand) => {
    navigate("/products", { state: { id: brand?.BRAND_ID } });
  }

  return (
    <div className='home-container'>
      <div className='home-inner-container'>
        <Carousel
          infiniteLoop={true}
          autoPlay={true}
          showIndicators={true}
          stopOnHover={true}
          autoFocus={true}
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          dots={true}
        >
          {bannerList.map((item, i) => (
            <div
              key={i + "banner"}
              // style={{ paddingLeft: "0.5px" }}
              className='crousel_div'
            >
              <img
                crossOrigin='anonymous'
                src={BASE_IMAGE_URL + item?.BANNER_IMAGE}
                alt=''
                style={{ borderRadius: "0px", height: "500px", width: "100%" }}
              />
            </div>
          ))}
        </Carousel>
        <div className='brand_link'>
          {brandList &&
            brandList?.length > 0 &&
            brandList.map((brand, index) => {
              return (
                <div key={index + "brand"} className='links' onClick={() => gotoProductList(brand)}>
                  <img
                    crossOrigin='anonymous'
                    src={BASE_IMAGE_URL + brand?.BRAND_IMAGE}
                    alt=''
                    className='brandImg'
                  />
                </div>
              );
            })}
        </div>
        <TopSellers />
        <FeaturedProducts />
        <br />
        <br />
        {/* <AboutUs /> */}
      </div>
      <Footer />
    </div>
  );
});

export default Home;
