import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import HomeStore from "../../../store/HomeStore";
import List from "@mui/material/List";
import "./YourOrder.scss";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import cricketBat from "../../../assets/cricket-bat.png";
import cricketKit from "../../../assets/cricket-kit.png";
import cricketHelmet from "../../../assets/cricketHelmet.png";
import ProductCard from "../../../screens/insideHome/Card/ProductCard";
import Data from "../../../JSON_DB/topSellerItems";
import Footer from "../../../screens/Footer/Footer";
import ProductStore from "../../../store/ProductStore";
import OrderStore from "../../../store/OrderStore";
import moment from "moment/moment";
import { BASE_IMAGE_URL } from "../../../api/config";
import { useNavigate } from "react-router-dom";
import { Collapse, ListItemButton, ListItemText } from "@mui/material";
const filterDropdown = [
  { label: "All Orders", value: 0 },
  { label: "Current Month", value: 1 },
  { label: "Last Month", value: 2 },
  { label: "Last 3 Month", value: 3 },
  { label: "Last 6 Month", value: 6 }
];
const YourOrder = observer(() => {
  const navigate = useNavigate();
  const [openPrice, setopenPrice] = React.useState(false);
  const [orders, setOrders] = useState([]);
  const [dummyOrders, setDummyOrders] = useState([]);
  const [relatedProductList, setRelatedProductList] = useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const [brandList, setBrandList] = useState();

  useEffect(() => {
    OrderStore.getOrders();
    ProductStore.getBrand();
  }, []);

  useEffect(() => {
    setOrders(OrderStore.data.orderList);
    setDummyOrders(OrderStore.data.orderList);
  }, [OrderStore.data.orderList]);
  useEffect(() => {
    setBrandList(ProductStore.data.brandList);
  }, [ProductStore.data.brandList]);
  const handleClickPrice = e => {
    setopenPrice(!openPrice);
  };
  const buyNow = product => {
    navigate("/products/items", {
      state: { item: JSON.parse(product?.product_id) }
    });
  };

  useEffect(() => {
    if (orders && orders.length > 0) {
      ProductStore.getRelatedProduct({
        CATEORY_ID: JSON.parse(orders[0]?.USER_ORDER[0]?.product_id)
          ?.CATEGORY_ID
      });
    }
  }, [orders]);

  useEffect(() => {
    setRelatedProductList(ProductStore.data.relatedProductList);
  }, [ProductStore.data.relatedProductList]);

  const _filterOrder = monthdiff => {
    if (monthdiff === 0) {
      setOrders(dummyOrders);
      return;
    }
    setSelectedMonth(monthdiff);
    const filteredData = dummyOrders.filter(item => {
      // Convert date string to Date object
      const itemDate = new Date(item.createdAt);
      // Calculate the difference in milliseconds between the current date and item date
      const diffInMs = new Date() - itemDate;
      // Calculate the difference in months
      const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30); // assuming 30 days in a month
      // If the difference in months is less than or equal to 3, include the item in the filtered array
      return diffInMonths <= monthdiff;
    });
    setOrders(filteredData);
  };

  const giveRating = (item, product) => {
    navigate("/rating-page", { state: { item: item, product: product } });
  };

  const invoice = (item, product) => {
    navigate("/invoice", { state: { item: item, product: product } });
  };

  return (
    <>
      <div className='orders-body'>
        <h3 style={{ textAlign: "center" }}>Your Order</h3>
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
            {!selectedMonth === 0 ? "All Orders" : ""}
            {filterDropdown.find(x => x.value === selectedMonth)?.label}
            {openPrice ? <ExpandLess /> : <ExpandMore />}
          </button>
          <Collapse
            in={openPrice}
            timeout='auto'
            unmountOnExit
            sx={{ pl: 1.3, width: "140px", border: "0.3px solid red" }}
          >
            <List sx={{ border: "0.3px solid green", m: 0 }}>
              {filterDropdown.map(options => {
                return (
                  <ListItemButton
                    onClick={() => _filterOrder(options.value)}
                    sx={{ pl: 0, fontSize: "12px" }}
                    key={options.value}
                  >
                    <ListItemText
                      sx={{
                        pl: 0.5,
                        border: "0.8px solid red",
                        fontSize: "2px"
                      }}
                      primary={options.label}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </List>
        {orders?.length === 0 && <h2>No Order Found</h2>}
        {orders &&
          orders?.map(item => {
            return (
              <div className='orders-container' key={item.id}>
                <div className='order-id'>
                  <span
                    className='first_order-id_details'
                    style={{ paddingLeft: 0 }}
                  >
                    <span style={{ color: "#808080" }}>Order Placed: </span>
                    {moment(item?.createdAt).format("DD/MM/yyyy hh:mm A")}
                  </span>
                  {item?.ORDER_DELIVERY_DATE && (
                    <span
                      className='order-id_details'
                      style={{ paddingLeft: 8 }}
                    >
                      <span style={{ color: "#808080" }}>
                        Expected Delivery Date:{" "}
                      </span>
                      {moment(item?.ORDER_DELIVERY_DATE).format(
                        "DD/MM/yyyy hh:mm A"
                      )}
                    </span>
                  )}
                  <span className='order-id_details'>
                    <span style={{ color: "#808080" }}>Total: </span>$
                    {item?.AMOUNT}
                  </span>
                  <span className='order-id_details'>
                    <span style={{ color: "#808080" }}>Ship to: </span>
                    {item?.FULLNAME}
                  </span>
                  {/* <span className='order-id_details'>
                  <span style={{ color: "#808080" }}>Invoice: </span>
                  Download
                </span> */}
                  <span className='order-id_details'>
                    <span style={{ color: "#808080" }}>Order Id: </span>#
                    {item?.ORDER_ID}
                  </span>
                </div>
                <div className='ordersItem-container'>
                  <div className='arriving-status'>
                    <span style={{ color: "#333333" }}>{item.status}</span>
                    {item.ORDER_STATUS === 10 ? (
                      <button onClick={() => buyNow(item?.USER_ORDER)}>
                        <span>Buy it again</span>
                      </button>
                    ) : item.ORDER_STATUS === 3 ? (
                      <button>
                        <span>Track package</span>
                      </button>
                    ) : null}
                  </div>

                  <div className='purchased-order'>
                    {item?.USER_ORDER &&
                      item?.USER_ORDER?.map((product, index) => {
                        return (
                          <div className='pointer'>
                            {product?.product_id && (
                              <img
                                crossOrigin='anonymous'
                                onClick={() => buyNow(product)}
                                height={50}
                                src={
                                  BASE_IMAGE_URL +
                                  JSON.parse(
                                    JSON.parse(product?.product_id)
                                      .PRODUCT_IMAGE
                                  )[0]
                                }
                                alt=''
                              />
                            )}
                            <div className='product-details'>
                              <span className='name'>
                                {JSON.parse(
                                  product?.product_id
                                )?.PRODUCT_NAME.slice(0, 15) + "..."}
                              </span>
                              <div className='tag'>
                                {
                                  brandList.find(x => {
                                    return (
                                      x.BRAND_ID ==
                                      JSON.parse(product?.product_id)?.BRAND_ID
                                    );
                                  })?.BRAND_NAME
                                }
                                {/* {
                                  brandList.find(
                                    x =>
                                      x.BRAND_ID ==
                                      JSON.parse(product?.product_id)?.BRAND_ID
                                  )?.BRAND_NAME
                                } */}
                              </div>
                              <span className='prodcuttitle'>
                                Price : ${product.price}
                              </span>
                              {product.discount !== 0 && (
                                <span className='prodcuttitle'>
                                  Save : ${product.discount}
                                </span>
                              )}
                              <span className='prodcuttitle'>
                                Qty : {product.quantity}
                              </span>
                            </div>
                            <br />
                            {item?.ORDER_STATUS === 1 && (
                              <button
                                style={{
                                  background: "#FFFFFF",
                                  color: "#333333",
                                  border: "1px solid #A5A4A4"
                                }}
                                onClick={() =>
                                  giveRating(
                                    item,
                                    JSON.parse(product?.product_id)
                                  )
                                }
                              >
                                <span style={{ fontWeight: "600" }}>
                                  Write a product review{" "}
                                </span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    <div className='order-actions'>
                      {item.ORDER_STATUS === 0 ? (
                        <button
                          style={{
                            background: "#FFFFFF",
                            color: "#333333",
                            border: "1px solid #A5A4A4"
                          }}
                        >
                          <span style={{ fontWeight: "600" }}>
                            Cancel items{" "}
                          </span>
                        </button>
                      ) : null}

                      <span style={{ fontWeight: "600" }}>
                        <button onClick={() => invoice(item)}> Invoice</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className='recomend'>
          <span>Recommended based on your purchase</span>
          <a href={"/products"}>
            {" "}
            <button>Continue shopping</button>
          </a>
        </div>
        <div className='product-cards-container'>
          {relatedProductList &&
            relatedProductList.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
});

export default YourOrder;
