import React from "react";
import List from "@mui/material/List";
import "./YourOrder.scss";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import cricketBat from "../../../assets/cricket-bat.png";
import cricketKit from "../../../assets/cricket-kit.png";
import cricketHelmet from "../../../assets/cricketHelmet.png";
import ProductCard from "../../../screens/insideHome/card/ProductCard";
import Data from "../../../JSON_DB/topSellerItems";
import Footer from "../../../screens/footer/Footer";

function YourOrder() {
  const [openPrice, setopenPrice] = React.useState(false);

  const handleClickPrice = (e) => {
    setopenPrice(!openPrice);
  };

  const orderData = [
    {
      id: 1,
      Image: cricketBat,
      title: "MRF Legend VK 18 SR Cricket Adult Kit Bag ",
      status: "Arriving 26 Nov- 27 Nov",
      ontheway: "false",
      late: "false",
      delivered: "false",
    },
    {
      id: 2,
      Image: cricketKit,
      title: "MRF Legend VK 18 SR Cricket Adult Kit Bag ",
      status: "On the way, but it's running late",
      ontheway: "true",
      late: "true",
      delivered: "false",
    },
    {
      id: 3,
      Image: cricketHelmet,
      title: "MRF Legend VK 18 SR Cricket Adult Kit Bag ",
      status: "Arriving today",
      ontheway: "true",
      late: "false",
      delivered: "true",
    },
  ];

  return (
    <>
      <div className="orders-body">
        <h3 style={{ textAlign: "center" }}>Your Order</h3>
        <List
          sx={{
            pt: 0,
            height: 25,
            float: "right",
            position: "relative",
            bottom: "29px",
          }}
        >
          <button
            className="btn-pricefilter"
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
              color: "#FFFFFF",
            }}
          >
            Past 3 months
            {openPrice ? <ExpandLess /> : <ExpandMore />}
          </button>
          {/* <Collapse
              in={openPrice}
              timeout="auto"
              unmountOnExit
              sx={{ pl: 1.3, width: '140px', border: '0.3px solid red'}}
            >
              <List sx={{border: '0.3px solid green', m:0}}  >
                  {
                    pricehtol.map((htol)=>{
                      return(
                      <ListItemButton  sx={{pl:0, fontSize: '12px'}} key={htol} >
                      <ListItemText sx={{ pl: 0.5, border: '0.8px solid red', fontSize: '2px' }} primary={htol} />
                </ListItemButton>
                      )
                    })
                  }
              </List>
            </Collapse> */}
        </List>

        {orderData.map((item) => {
          return (
            <div className="orders-container" key={item.id}>
              <div className="order-id">
                <span
                  style={{
                    color: "#333333",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "15px",
                  }}
                >
                  <span style={{ color: "#808080" }}>Order Placed: </span>{" "}
                  5 November 2022
                </span>
                <span
                  style={{
                    paddingLeft: "70px",
                    color: "#333333",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "15px",
                  }}
                >
                  <span style={{ color: "#808080" }}>Total: </span> 
                  $90.00
                </span>
                <span
                  style={{
                    paddingLeft: "70px",
                    color: "#333333",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "15px",
                  }}
                >
                  <span style={{ color: "#808080" }}>Ship to: </span> 
                  Pranay Shukla
                </span>
                <span
                  style={{
                    paddingLeft: "70px",
                    color: "#333333",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "15px",
                  }}
                >
                  <span style={{ color: "#808080" }}>Invoice: </span> 
                  Download
                </span>
                <span
                  style={{
                    paddingLeft: "70px",
                    color: "#333333",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "15px",
                  }}
                >
                  <span style={{ color: "#808080" }}>Order Id: </span> 
                  #1256-3526-9865
                </span>
              </div>
              <div className="ordersItem-container">
                <div className="arriving-status">
                  <span style={{ color: "#333333" }}>{item.status}</span>
                  {
                    item.delivered==='true' ? (
                         <button>
                    <span>Buy it again</span>
                  </button>
                    ) : (
                         <button>
                    <span>Track package</span>
                  </button>
                    )
                  }
                </div>

                <div className="purchased-order">
                  <img src={item.Image} alt="" />
                  <div className="product-details">
                    <span className="prodcuttitle">{item.title}</span>
                  </div>
                  <div className="order-actions">
                    {item.delivered === "false" ? (
                      <button style={{ background: '#FFFFFF', color: '#333333', border: '1px solid #A5A4A4'}}>
                        <span style={{ fontWeight: '600' }}>Cancel items </span>
                      </button>
                    ) : (
                      <button style={{ background: '#FFFFFF', color: '#333333', border: '1px solid #A5A4A4'}}>
                        <span style={{ fontWeight: '600' }}>Write a product review </span>
                      </button>
                    )}
                    {
                         item.late ==='true' ? (
                              <button style={{ background: '#FFFFFF', color: '#333333', border: '1px solid #A5A4A4'}}>
                        <span style={{ fontWeight: '600' }}>Write a product review </span>
                      </button>
                         ) : ""
                    }
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="recomend">
          <span>Recommended based on your purchase</span>
          <button>Continue shopping</button>
        </div>
        <div className="product-cards-container">
          {Data.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default YourOrder;
