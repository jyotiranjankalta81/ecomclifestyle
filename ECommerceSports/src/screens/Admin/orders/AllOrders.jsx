import React, { useState, useEffect } from "react";
import "./orders.styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import swal from "sweetalert";
import { BASE_IMAGE_URL } from "../../../api/config";
import { observer } from "mobx-react-lite";
import data from "../../../JSON_DB/orders.json";
import EyeIcon from "./EyeIcon";
import DownloadIcon from "./DownloadIcon";
import OrderStore from "../../../store/OrderStore";
import moment from "moment/moment";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import OrderChart from "./OrderChart";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../store/ProductStore";

const style = {
  display: "flex",
  textAlign: "center",
  width: "98%",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  borderRadius: "17px",
  boxShadow:
    " 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
  gap: " 1.5rem",
  padding: "2rem"
};
const AllOrders = observer(() => {
  const [orders, setOrders] = useState([]);
  const [isOpen, setisOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [colorList, setColorList] = useState();
  const [sizeList, setSizeList] = useState();

  useEffect(() => {
    OrderStore.getOrders();
    ProductStore.getColor();
    ProductStore.getSize();
  }, []);

  useEffect(() => {
    setOrders(OrderStore.data.orderList);
  }, [OrderStore.data.orderList]);

  useEffect(() => {
    setColorList(ProductStore.data.colorList);
  }, [ProductStore.data.colorList]);

  useEffect(() => {
    setSizeList(ProductStore.data.sizeList);
  }, [ProductStore.data.sizeList]);

  const orderStatus = data => {
    swal({
      title: "Are you sure?",
      text:
        data?.ORDER_STATUS == 0
          ? "Accept the order"
          : "Successfully delivered the order",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let param = {
          ORDER_ID: data?.ORDER_ID,
          ORDER_STATUS: data?.ORDER_STATUS + 1
        };
        OrderStore.orderStatus(param, navigationCallBackUpdate);
      }
    });
  };

  const openModal = data => {
    setProducts(data);
    setisOpen(!isOpen);
  };
  const navigationCallBackUpdate = () => {
    setisOpen(false);
    toast("Successfully Status Change");
    OrderStore.getOrders();
  };

  const ordersHeading = [
    "Order No",
    "Order Date",
    "Customer Name",
    // "Product name",
    "Order Quality",
    "Paid Amount",
    "Payment Type",
    "Delivery Status",
    "Action",
    "Invoice/View"
  ];

  return (
    <>
      <div className='admin_container'>
        <div className='order_circular'>
          <div className='order_pie'>
            <OrderChart />

            {/* <p>Order Chart data:</p> */}
          </div>
        </div>
        <br />
        <div style={{ height: "100%" }}>
          <TableContainer
            component={Paper}
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px"
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'
            >
              <TableHead>
                <TableRow>
                  {ordersHeading.map((item, index) => {
                    return (
                      <TableCell key={index + "heading"} align='center'>
                        {item}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((items, index) => {
                  return (
                    <TableRow
                      key={index + "orders"}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component='th' scope='row' align='center'>
                        {items.ORDER_ID}
                      </TableCell>
                      <TableCell align='center'>
                        {moment(items.createdAt).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align='center'>{items.FULLNAME}</TableCell>
                      {/* <TableCell align="center">{items.productname}</TableCell> */}
                      <TableCell align='center'>
                        {items?.USER_ORDER?.length}
                      </TableCell>
                      <TableCell align='center'>{items.AMOUNT}</TableCell>
                      <TableCell align='center'>Cash on delivery</TableCell>
                      <TableCell
                        align='center'
                        style={{
                          color:
                            items.ORDER_STATUS === 0
                              ? "#FFD801"
                              : items.ORDER_STATUS === 1
                              ? "green"
                              : items.ORDER_STATUS === 2
                              ? "blue"
                              : items.ORDER_STATUS === 3
                              ? "red"
                              : "green"
                        }}
                      >
                        {items.ORDER_STATUS === 0
                          ? "Pending"
                          : items.ORDER_STATUS === 1
                          ? "Accepted"
                          : items.ORDER_STATUS === 3
                          ? "Rejected"
                          : "Completed"}
                      </TableCell>

                      {items.ORDER_STATUS === 2 ? (
                        <TableCell align='center'></TableCell>
                      ) : (
                        <TableCell
                          align='center'
                          onClick={() => openModal(items)}
                        >
                          <Button>
                            {items.ORDER_STATUS === 0 ? "Accept" : "Delivered"}
                          </Button>
                        </TableCell>
                      )}

                      <TableCell align='center'>
                        {" "}
                        <DownloadIcon />
                        &nbsp;&nbsp;
                        <div
                          className='pointer'
                          onClick={() => openModal(items)}
                        >
                          {" "}
                          <EyeIcon />{" "}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={isOpen}
            onClose={openModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='close_icon'>
                <CloseIcon onClick={openModal} />
              </div>
              <h3>{"Order Details"}</h3>
              <table class='table' style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th scope='col'>Product ID</th>
                    <th scope='col'>Product</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Size</th>
                    <th scope='col'>Qty</th>
                    <th scope='col'>Category</th>
                    <th scope='col'>Sub-category</th>
                    <th scope='col'>Product Price</th>
                    <th scope='col'>Product Dis.</th>
                    <th scope='col'>Grand Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products?.USER_ORDER?.length > 0 &&
                    products?.USER_ORDER.map((item, index) => {
                      return (
                        <tr key={index + "order"}>
                          <th scope='row'>
                            {JSON.parse(item?.product_id)?.PRODUCT_ID}
                          </th>
                          <td>{JSON.parse(item?.product_id)?.PRODUCT_NAME}</td>
                          <td>
                            {JSON.parse(
                              JSON.parse(item?.product_id)?.PRODUCTCOLOR_ID
                            )?.map(color => {
                              return (
                                colorList?.find(
                                  col => col.PRODUCTCOLOR_ID === color
                                )?.PRODUCTCOLOR_NAME + ","
                              );
                            })}
                          </td>
                          <td>
                            {JSON.parse(
                              JSON.parse(item?.product_id)?.PRODUCTSIZE_ID
                            )?.map(size => {
                              console.log(size, sizeList);
                              return (
                                sizeList?.find(
                                  col => col.PRODUCTSIZE_ID === size
                                )?.PRODUCTSIZE_NAME + ","
                              );
                            })}
                          </td>
                          <td>
                            {JSON.parse(item?.product_id)?.PRODUCT_QUANTITY}
                          </td>
                          <td>{JSON.parse(item?.product_id)?.CATEGORY_ID}</td>
                          <td>
                            {JSON.parse(item?.product_id)?.SUBCATEGORY_ID}
                          </td>
                          <td>{JSON.parse(item?.product_id)?.PRODUCT_PRICE}</td>
                          <td>
                            {JSON.parse(item?.product_id)?.PRODUCT_DISCOUNT}
                          </td>
                          <td>
                            {parseFloat(
                              JSON.parse(item?.product_id)?.PRODUCT_PRICE
                            ) -
                              parseFloat(
                                JSON.parse(item?.product_id)?.PRODUCT_DISCOUNT
                              )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <div className='modal_button_section'>
                <button
                  className='modal_submit_btn pointer'
                  onClick={() => orderStatus(products)}
                >
                  Accept
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
});

export default AllOrders;
