import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../../api/config";
import "./productcard.scss";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#3f51b5",
    color: "#FFFFFF",
    // maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}));

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  if (item?.PRODUCT_IMAGE && item?.PRODUCT_IMAGE != "") {
    var thumbnail = JSON.parse(item?.PRODUCT_IMAGE)[0];
  }

  const viewProduct = items => {
    navigate("/products/items", { state: { item: items } });
  };

  return (
    <div
      onClick={() => viewProduct(item)}
      style={{ textDecoration: "none", color: "black" }}
      className='top_product_container'
    >
      <div className='product-card-container'>
        {item?.PRODUCT_IMAGE && (
          <img
            crossOrigin='anonymous'
            src={BASE_IMAGE_URL + thumbnail}
            alt='img'
          />
        )}
        {/* <HtmlTooltip
          sx={{ background: "blue", color: "white" }}
          title={
            <>
              <span
                dangerouslySetInnerHTML={{
                  __html: item?.PRODUCT_DESCRIPTION
                }}
              />
            </>
          }
          placement='bottom'
          placement='bottom'
        > */}
          <div className='product-card-sub_container'>
            <div className='product-name'>{item.PRODUCT_NAME}</div>
            {/* {/* {!!item?.tag && ( */}
            <div className='tag-container'>
              <div className='tag'>{item.CATALOG_NAME}</div>
              <div className='name'>{item.SUBNAME}</div>
            </div>
            <p className='rating_reviews'>
              4.5 &nbsp;
              <Rating
                name='half-rating'
                defaultValue={2.5}
                precision={0.5}
                readOnly
                sx={{ transform: "scale(0.9)", marginLeft: "-8px" }}
              />
              {/* &nbsp;
              <span className='ratings_name'>1725 ratings</span> */}
            </p>
            <div className='price-container'>
              <div className='selling-price'>${item.PRODUCT_PRICE}</div>
              <div className='mrp'>
                {`${!!item?.PRODUCT_PRICE ? "MRP :" : ""} 
        `}
                <span>${item.PRODUCT_PRICE}</span>
              </div>
            </div>
            <div className=
            // {detail ? 
            "details_container"
            //  : "nothing"}
             >
              {/* <p className='details'>{item?.PRODUCT_DESCRIPTION}</p> */}
              <span
                dangerouslySetInnerHTML={{
                  __html: item?.PRODUCT_DESCRIPTION.slice(0, 35)
                }}
              />
            </div>
          </div>
        {/* </HtmlTooltip> */}
      </div>
    </div>
  );
};

export default ProductCard;
