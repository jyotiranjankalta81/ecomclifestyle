import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../ProductCategory/ProductCategory.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import swal from "sweetalert";
import { observer } from "mobx-react-lite";
import ProductStore from "../../../../store/ProductStore";
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
const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

const ProductSubCategory = observer(() => {
  const [isOpen, setisOpen] = React.useState(false);
  const [subCategory, setSubCategory] = useState();
  const [categoryID, setCategoryID] = useState();
  const [subCategoryID, setSubCategoryID] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    ProductStore.getCategory();
    ProductStore.getSubCategory();
  }, []);

  useEffect(() => {
    setSubCategoryList(ProductStore.data.subCategoryList);
  }, [ProductStore.data.subCategoryList]);

  useEffect(() => {
    setCategoryList(ProductStore.data.categoryList);
  }, [ProductStore.data.categoryList]);

  const openModal = param => {
    setSubCategory(param?.row?.SUBCATEGORY_NAME);
    setSubCategoryID(param?.row?.SUBCATEGORY_ID);
    setCategoryID(param?.row?.CATEGORY_ID);
    setisOpen(!isOpen);
  };
  const handleChange = e => {
    setSubCategory(e.target.value);
  };
  const handleChangeCategory = e => {
    setCategoryID(e.target.value);
  };
  const addSubCategory = () => {
    let data = {
      CATEGORY_ID: categoryID,
      SUBCATEGORY_NAME: subCategory
    };
    ProductStore.addSubCategory(data, navigationCallBack);
  };
  const navigationCallBack = () => {
    setSubCategory();
    setCategoryID();
    openModal();
    ProductStore.getSubCategory();
  };

  const updateSubCategory = () => {
    let data = {
      CATEGORY_ID: categoryID,
      SUBCATEGORY_NAME: subCategory,
      SUBCATEGORY_ID: subCategoryID
    };
    ProductStore.updateSubCategory(data, navigationCallBackUpdate);
  };
  const navigationCallBackUpdate = () => {
    setSubCategory();
    setCategoryID();
    openModal();
    ProductStore.getSubCategory();
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
          CATEGORY_ID: param?.row?.CATEGORY_ID,
          SUBCATEGORY_NAME: param?.row?.SUBCATEGORY_NAME,
          SUBCATEGORY_ID: param?.row?.SUBCATEGORY_ID,
          ISDELETED: true
        };
        ProductStore.deleteSubCategory(data, navigationCallBackDelete);
      }
    });
  };

  const navigationCallBackDelete = () => {
    setSubCategory();
    setCategoryID();
    ProductStore.getSubCategory();
  };
  const columns = [
    { field: "SUBCATEGORY_ID", headerName: "ID", width: 90 },
    {
      field: "SUBCATEGORY_NAME",
      headerName: "SUBCATEGORY NAME",
      width: 150
    },
    {
      field: "CATEGORY_NAME",
      headerName: "CATEGORY NAME",
      width: 150
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      renderCell: params => actionElement(params)
    }
  ];

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
              data={subCategoryList}
            >
              Export CSV
            </CsvDownloadButton>
            <button className='modal_btn' onClick={() => openModal()}>
              Add Sub Category
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
              rows={subCategoryList || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              editMode={false}
              getRowId={row => row.SUBCATEGORY_ID + 1}
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
              <h3>{subCategoryID ? "Edit Category" : "Add Sub-Category"}</h3>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={categoryID}
                  label='Category'
                  size='small'
                  onChange={handleChangeCategory}
                >
                  {categoryList &&
                    categoryList.map(ct => {
                      return (
                        <MenuItem value={ct.CATEGORY_ID}>
                          {ct.CATEGORY_NAME}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Sub-Category'
                variant='outlined'
                size='small'
                placeholder='Enter Sub-Category'
                type='text'
                value={subCategory}
                required
                onChange={handleChange}
              />
              <div className='modal_button_section'>
                <button
                  className='modal_submit_btn'
                  onClick={() => {
                    subCategoryID ? updateSubCategory() : addSubCategory();
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
export default ProductSubCategory;
