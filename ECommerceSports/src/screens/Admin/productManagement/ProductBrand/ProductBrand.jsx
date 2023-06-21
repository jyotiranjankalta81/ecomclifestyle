import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductBrand.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../../store/ProductStore";
import { observer } from "mobx-react-lite";
import swal from "sweetalert";
import { Formik } from "formik";
import * as Yup from "yup";
import { BASE_IMAGE_URL } from "../../../../api/config";
import CsvDownloadButton from "react-json-to-csv";

const BrandSchema = Yup.object().shape({
  BRAND_NAME: Yup.string().required("Brand Name is required"),
  BRAND_IMAGE: Yup.string().required("Brand Icon is required")
});
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
var brandID = null;

const ProductBrand = observer(() => {
  const [isOpen, setisOpen] = React.useState(false);
  const [brandList, setBrandList] = useState();
  const [brandData, setBrandData] = useState([]);

  console.log("brandlist", brandList);
  const columns = [
    { field: "BRAND_ID", headerName: "ID", width: 90 },
    {
      field: "BRAND_IMAGE",
      headerName: "BRAND ICON",
      width: 70,
      editable: false,
      renderCell: params => (
        <img
          height={50}
          width={50}
          crossOrigin='anonymous'
          src={BASE_IMAGE_URL + `${params.value}`}
        />
      )
    },
    {
      field: "BRAND_NAME",
      headerName: "BRAND NAME",
      width: 150,
      editable: false
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      renderCell: params => actionElement(params)
    }
  ];

  useEffect(() => {
    ProductStore.getBrand();
  }, []);

  useEffect(() => {
    setBrandList(ProductStore.data.brandList);
  }, [ProductStore.data.brandList]);

  const openModal = param => {
    setBrandData(param?.row);
    setisOpen(!isOpen);
  };
  const addBrand = values => {
    if (!brandData?.BRAND_ID) {
      let formData = new FormData();
      formData.append("BRAND_NAME", values.BRAND_NAME);
      formData.append("BRAND_IMAGE", values.BRAND_IMAGE);
      formData.append("BRAND_CODE", values.BRAND_CODE);
      ProductStore.addBrand(formData, navigationCallBack);
    } else {
      let formData = new FormData();
      formData.append("BRAND_NAME", values.BRAND_NAME);
      formData.append("BRAND_ID", values.BRAND_ID);
      formData.append("BRAND_IMAGE", values.BRAND_IMAGE);
      formData.append("BRAND_CODE", values.BRAND_CODE);
      ProductStore.updateBrand(formData, navigationCallBackUpdate);
    }
  };
  const navigationCallBack = () => {
    openModal();
    ProductStore.getBrand();
  };

  const navigationCallBackUpdate = () => {
    openModal();
    ProductStore.getBrand();
  };

  const deleteBrand = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this brand!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          BRAND_NAME: param?.row?.BRAND_NAME,
          BRAND_ID: param?.row?.BRAND_ID,
          BRAND_IMAGE: param?.row?.BRAND_IMAGE,
          ISDELETED: true
        };
        ProductStore.deleteBrand(data, navigationCallBackDelete);
      }
    });
  };

  const navigationCallBackDelete = () => {
    ProductStore.getBrand();
  };

  const actionElement = params => (
    <div className='action-wrapper'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => openModal(params)}>
          <RemoveRedEyeIcon />
        </div>
      }
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteBrand(params)}>
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
              data={brandList}
            >
              Export CSV
            </CsvDownloadButton>
            <button className='modal_btn' onClick={() => openModal()}>
              Add Brand
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
              rows={brandList || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.BRAND_ID + 1}
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
              <h3>{brandData?.BRAND_ID ? "Edit Brand" : "Add Brand"}</h3>
              <Formik
                initialValues={{
                  BRAND_ID: brandData?.BRAND_ID || "",
                  BRAND_NAME: brandData?.BRAND_NAME || "",
                  BRAND_IMAGE: brandData?.BRAND_IMAGE || "",
                  BRAND_CODE: brandData?.BRAND_CODE || "fuck"
                }}
                onSubmit={values =>
                  // console.log(values)

                  addBrand(values)
                }
                validationSchema={BrandSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched
                }) => (
                  <form onSubmit={handleSubmit} className='login-form'>
                    <TextField
                      fullWidth
                      name='BRAND'
                      id='outlined-basic'
                      label='Brand Name'
                      variant='outlined'
                      size='small'
                      placeholder='Enter the brand name'
                      type='text'
                      onChange={handleChange("BRAND_NAME")}
                      onBlur={handleBlur("BRAND_NAME")}
                      value={values.BRAND_NAME}
                    />
                    {errors.BRAND_NAME && touched.BRAND_NAME ? (
                      <span className='error'>{errors.BRAND_NAME}</span>
                    ) : null}
                    <label style={{ alignSelf: "self-start" }}>
                      Brand Icon
                    </label>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      label=''
                      variant='outlined'
                      size='small'
                      placeholder='Enter the brand icon'
                      type='file'
                      name='BRAND_IMAGE'
                      accept='image/png,image/jpeg,image/jpg'
                      onChange={event => {
                        setFieldValue("BRAND_IMAGE", event.target.files[0]);
                      }}
                    />
                    {errors.BRAND_IMAGE && touched.BRAND_IMAGE ? (
                      <span className='error'>{errors.BRAND_IMAGE}</span>
                    ) : null}

                    {brandData?.BRAND_ID && (
                      <>
                        {" "}
                        <label
                          style={{ alignSelf: "self-start", marginTop: 20 }}
                        >
                          Uploaded Icon
                        </label>
                        <br />
                        <img
                          height={50}
                          width={50}
                          crossOrigin='anonymous'
                          src={BASE_IMAGE_URL + `${brandData?.BRAND_IMAGE}`}
                        />
                      </>
                    )}

                    <div
                      className='modal_button_section'
                      style={{ marginTop: 10 }}
                    >
                      <button className='modal_submit_btn' type='submit'>
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
});
export default ProductBrand;
