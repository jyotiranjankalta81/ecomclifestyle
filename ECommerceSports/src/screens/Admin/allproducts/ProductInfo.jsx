import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import DiscountPopup from "./DiscountPopup";
import ProductStore from "../../../store/ProductStore";
import moment from "moment/moment";
import swal from "sweetalert";
import { BASE_IMAGE_URL } from "../../../api/config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewBarcode from "../addProducts/BarCodeGenerator/ViewBarcode";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Barcode from "react-barcode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const ToggleButton = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2
  }
}));

const DataRow = ({ items }) => {
  console.log("items", items);
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [modal, setModals] = useState(false);

  const deleteProduct = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          PRODUCT_ID: param?.PRODUCT_ID,
          ISDELETED: true
        };
        ProductStore.deleteProduct(data, navigationCallBackDelete);
      }
    });
  };
  const deactiveProductDiscount = param => {
    swal({
      title: "Are you sure?",
      text: "Are you sure? to deactivate discount!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          PRODUCT_ID: param?.PRODUCT_ID
        };
        ProductStore.deactiveProductDiscount(data, navigationCallBackDelete);
      }
    });
  };
  const navigationCallBackDelete = () => {
    ProductStore.getProduct();
  };
  const editProduct = items => {
    navigate("/admin/addproducts", { state: { item: items } });
  };

  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      key={items.id}
    >
      <TableCell component='th' scope='row' align='center'>
        {items.PRODUCT_ID}
      </TableCell>
      <TableCell align='center'>
        {moment(items.createdAt).format("YYYY-MM-DD")}
      </TableCell>
      <TableCell align='center'>
        {items?.PRODUCT_IMAGE !== "" && items?.PRODUCT_IMAGE ? (
          <img
            crossOrigin='anonymous'
            src={BASE_IMAGE_URL + JSON.parse(items?.PRODUCT_IMAGE)[0]}
            style={{ width: "40px", height: "40px" }}
          />
        ) : null}
      </TableCell>
      <TableCell align='center'>{items.PRODUCT_NAME}</TableCell>
      <TableCell align='center'>{items.CATALOG_NAME}</TableCell>
      <TableCell align='center'>{items.PRODUCT_PRICE}</TableCell>
      <TableCell align='center'>
        <ToggleButton
          onClick={
            items.PRODUCT_DISCOUNT == 0
              ? () => setOpenPopup(true)
              : () => deactiveProductDiscount(items)
          }
          checked={items.PRODUCT_DISCOUNTSTATUS !== 0}
        />{" "}
        {items.PRODUCT_DISCOUNT == 0 ? "" : `${items.PRODUCT_DISCOUNT}% off`}
      </TableCell>
      <TableCell align='center'>
        <div onClick={() => setModals(true)}>
          {" "}
          <VisibilityIcon />
          {/* {modal && <ViewBarcode OpenModals={setModals} />} */}
        </div>
      </TableCell>
      <TableCell align='center'>
        <div onClick={() => editProduct(items)}>
          {" "}
          <EditIcon />
        </div>
      </TableCell>
      <TableCell align='center'>
        <div onClick={() => deleteProduct(items)}>
          <DeleteIcon />
        </div>
      </TableCell>
      <DiscountPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        param={items}
      />

      <div div style={{ outline: "none" }}>
        <Modal
          // keepMounted
          open={modal}
          onClose={() => setModals(false)}
          aria-labelledby='keep-mounted-modal-title'
          aria-describedby='keep-mounted-modal-description'
        >
          <Box sx={style}>
            <Barcode value='ECB656454132457545' />
          </Box>
        </Modal>
      </div>
    </TableRow>
  );
};

const ProductInfo = observer(() => {
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ProductStore.getProduct();
  }, []);

  useEffect(() => {
    setProducts(ProductStore.data.productList);
  }, [ProductStore.data.productList]);

  const productHeading = [
    "Product Id",
    "Product Add Date",
    "Product Image",
    "Product Name",
    "Product Category",
    "Product Price",
    "Product Discount",
    "Barcode View",
    "Edit",
    "Delete"
  ];
  return (
    <div className='admin_container'>
      <div style={{ height: "100%" }}>
        <TableContainer
          component={Paper}
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px"
          }}
        >
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                {productHeading.map((item, index) => {
                  return (
                    <TableCell align='center' key={index}>
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((items, index) => {
                  return <DataRow key={index} items={items} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {open && <ViewBarcode OpenModal={setOpen} />}
      </div>
    </div>
  );
});

export default ProductInfo;
