import React, { useEffect, useState } from "react";
import ProductCard from "../top-product-cart/ProductCard";
import "./style.scss";
import { observer } from "mobx-react-lite";
import HomeStore from "../../../store/HomeStore";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

const TopSellers = observer(() => {
  const deviceType = "laptop";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    HomeStore.getProducts();
  }, []);

  useEffect(() => {
    setProducts(HomeStore.data.products);
  }, [HomeStore.data.products]);

  return (
    <>
      <div className='top-sellers-container'>
        <div className='heading'>Top Sellers</div>
        <div className='product-cards-container'>
          {/* {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <ProductCard key={item.index} item={item} />
            ))} */}
        </div>
      </div>
      <div className='crousel_section'>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
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
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <ProductCard key={item.index} item={item} />
            ))}
        </Carousel>
      </div>
    </>
  );
});

export default TopSellers;
