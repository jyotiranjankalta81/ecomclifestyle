import React,{useEffect,useState} from "react";
import Carousel from "react-multi-carousel";
import ProductCard from "../../screens/insideHome/Card/ProductCard";
import data from "../../JSON_DB/similarProducts";
import "react-multi-carousel/lib/styles.css";
import { observer } from "mobx-react-lite";
import ProductStore from "../../store/ProductStore";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 600 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 600, min: 500 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 500, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const SimilarProducts = observer((props) => {

  const [relatedProductList, setRelatedProductList] = useState([]);

  useEffect(() => {
    ProductStore.getRelatedProduct({"CATEORY_ID":props?.categoty});
  }, []);

  useEffect(() => {
    setRelatedProductList(ProductStore.data.relatedProductList);
  }, [ProductStore.data.relatedProductList]);

  return (
    <>
      <h4>Products related to this item</h4>
      <Carousel
        responsive={responsive}
        style={{ border: "1.5px solid red", zIndex: "3" }}
      >
        {relatedProductList && relatedProductList?.length > 0 && relatedProductList?.map((item, index) => {
          return (
            <div
              className='product-cards-container'
              key={index}
              style={{ width: "100%" }}
            >
              <ProductCard key={item.id} item={item} />
            </div>
          );
        })}
      </Carousel>
    </>
  );
});

export default SimilarProducts;
