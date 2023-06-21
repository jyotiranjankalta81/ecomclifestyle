import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductCategory.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../../store/ProductStore";
import { observer } from "mobx-react-lite";
import swal from "sweetalert";
import CsvDownloadButton from "react-json-to-csv";
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

const ProductCategory = observer(() => {
  const [isOpen, setisOpen] = React.useState(false);
  const [category, setCategory] = useState();
  const [categoryID, setCategoryID] = useState();
  const [categoryList, setCategoryList] = useState();
  const columns = [
    { field: "CATEGORY_ID", headerName: "ID", width: 90 },
    {
      field: "CATEGORY_NAME",
      headerName: "CATEGORY NAME",
      width: 150,
      editable: true
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      renderCell: params => actionElement(params)
    }
  ];

  useEffect(() => {
    ProductStore.getCategory();
  }, []);

  useEffect(() => {
    setCategoryList(ProductStore.data.categoryList);
  }, [ProductStore.data.categoryList]);

  const openModal = param => {
    setCategory(param?.row?.CATEGORY_NAME);
    setCategoryID(param?.row?.CATEGORY_ID);
    setisOpen(!isOpen);
  };
  const handleChange = e => {
    setCategory(e.target.value);
  };
  const addCategory = () => {
    let data = {
      CATEGORY_NAME: category
    };
    ProductStore.addCategory(data, navigationCallBack);
  };
  const navigationCallBack = () => {
    setCategory();
    openModal();
    ProductStore.getCategory();
  };

  const updateCategory = () => {
    let data = {
      CATEGORY_NAME: category,
      CATEGORY_ID: categoryID
    };
    ProductStore.updateCategory(data, navigationCallBackUpdate);
  };
  const navigationCallBackUpdate = () => {
    setCategory();
    setCategoryID();
    openModal();
    ProductStore.getCategory();
  };

  const deleteCategory = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          CATEGORY_NAME: param?.row?.CATEGORY_NAME,
          CATEGORY_ID: param?.row?.CATEGORY_ID,
          ISDELETED: true
        };
        ProductStore.deleteCategory(data, navigationCallBackDelete);
      }
    });
  };

  const navigationCallBackDelete = () => {
    setCategory();
    setCategoryID();
    ProductStore.getCategory();
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
        <div className='table_container'>
          <div className='button_section'>
            <CsvDownloadButton
              className='modal_btn pointer'
              delimiter=','
              data={categoryList}
            >
              Export CSV
            </CsvDownloadButton>
            <button className='modal_btn' onClick={() => openModal()}>
              Add Category
            </button>
          </div>

          <Box
            sx={{
              height: 400,
              width: "100%",
              boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "7px"
            }}
          >
            <DataGrid
              rows={categoryList || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.CATEGORY_ID + 1}
              editMode={false}
            />
          </Box>
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
              <h3>{categoryID ? "Edit Category" : "Add Category"}</h3>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Category'
                variant='outlined'
                size='small'
                placeholder='Enter the Category'
                type='text'
                value={category}
                required
                onChange={handleChange}
              />
              <div className='modal_button_section'>
                <button
                  className='modal_submit_btn'
                  onClick={() => {
                    categoryID ? updateCategory() : addCategory();
                  }}
                >
                  Submit
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
});
export default ProductCategory;
