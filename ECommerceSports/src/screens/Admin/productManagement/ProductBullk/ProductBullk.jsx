import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductBullk.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../../store/ProductStore";
import { observer } from "mobx-react-lite";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  bgcolor: "background.paper",
  borderRadius: "17px",
  boxShadow: 24,
  gap: "1.5rem",
  p: "2rem"
};

const ProductBullk = observer(() => {
  const [isOpen, setisOpen] = React.useState(false);
  const [csv, setCSV] = useState();

  const openModal = param => {
    setisOpen(!isOpen);
  };

  const uploadCSV = () => {
    let formData = new FormData();
    formData.append("productcsv", csv);
    ProductStore.bulkUpload(formData, navigationCallBack);
  };
  const navigationCallBack = () => {
    openModal();
  };

  const actionElement = params => (
    <div className='action-wrapper'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => openModal(params)}>
          <RemoveRedEyeIcon />
        </div>
      }
      {
        <div
          style={{ cursor: "pointer" }}
          onClick={() => deleteCategory(params)}
        >
          <DeleteIcon className='action-icon' />
        </div>
      }
    </div>
  );

  return (
    <>
      <div className='admin_container'>
        <div className='bulk_products'>
          <div className='bulk_product_container'>
            <div className='bulk_step1'>
              <h3>step 1:</h3>
              <p className='key_points_list' style={{ marginTop: "0px" }}>
                {/* <b>Product name:</b> */}
                1. Download the Skeleton file and fill it with proper data.
              </p>
              <p className='key_points_list'>
                2. You can download the example file to understand how the data
                must be filled.
              </p>
              <p className='key_points_list'>
                3. Once you have downloded and filled the skeleton file, uploded
                it in the form below and submit.
              </p>
              <p className='key_points_list'>
                4. After uploading the products you need to edit them and set
                products images and choices.
              </p>
            </div>
            <div className='download_csv_div'>
              <button className='download_csv'>Download CSV</button>
            </div>
            <div className='bulk_step1'>
              <h3>step 2:</h3>
              <p className=' key_points_list' style={{ marginTop: "0px" }}>
                1. Category and Brand should be in neumerical id.
              </p>
              <p className=' key_points_list'>
                2. You can download the get Category and Brand id.
              </p>
            </div>
            <div className='both_butns'>
              <button className='download_csv'>Download Category</button>
              <button className='download_csv'>Download Brand</button>
              <button className='download_csv'>Download Color</button>
              <button className='download_csv'>Download Size</button>
            </div>
          </div>
        </div>
        <div className='center-btns'>
          <button className='modal_btn' onClick={() => openModal()}>
            Product Bulk Upload
          </button>
        </div>
      </div>
      <div style={{ outline: "none" }}>
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
            <h3>{"Upload CSV"}</h3>
            <TextField
              fullWidth
              id='outlined-basic'
              label=''
              variant='outlined'
              size='small'
              placeholder='Enter csv file'
              type='file'
              accept='.xlsx, .xls, .csv'
              onChange={event => {
                setCSV(event.target.files[0]);
              }}
              required
            />
            <div className='modal_button_section'>
              <button
                className='modal_submit_btn pointer'
                onClick={() => {
                  uploadCSV();
                }}
              >
                Submit
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
});
export default ProductBullk;
