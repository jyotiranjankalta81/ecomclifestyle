import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../store/ProductStore";
import { observer } from "mobx-react-lite";
import swal from "sweetalert";
import CouponStore from "../../../store/CouponStore";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../App.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BASE_IMAGE_URL } from "../../../api/config";
import moment from "moment";

const CouponSchema = Yup.object().shape({
  COUPON_CODE: Yup.string().required("Coupon Code is required"),
  COUPON_MAXDISCOUNT: Yup.string().required("Max Discount required"),
  COUPON_EXPIRE: Yup.boolean().required("Expire required"),
  COUPON_MINPRICE: Yup.string().required("Min price required"),
  COUPON_DISCOUNTPERCENT: Yup.string().required("Discount Percent is required"),
  COUPON_MINORDER: Yup.string().required("Min order is required"),
  COUPON_VALIDITY: Yup.string().required("Coupon Validity is required")
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  bgcolor: "background.paper",
  borderRadius: "17px",
  boxShadow: 24,
  p: "2rem"
};

const Coupon = observer(() => {
  const [isOpen, setisOpen] = useState(false);
  const [coupon, setCoupon] = useState();
  const [couponID, setCouponID] = useState();
  const [couponList, setCouponList] = useState();
  const columns = [
    { field: "COUPON_ID", headerName: "ID", width: 90 },
    {
      field: "COUPON_IMAGE",
      headerName: "IMAGE",
      width: 100,
      renderCell: params => (
        <img
          height={50}
          width={50}
          crossOrigin='anonymous'
          src={BASE_IMAGE_URL + `${params.value}`}
        />
      )
    },
    { field: "COUPON_CODE", headerName: "COUPON CODE", width: 100 },
    {
      field: "COUPON_DISCOUNTPERCENT",
      headerName: "DISCOUNT PERCENT",
      width: 150
    },
    { field: "COUPON_EXPIRE", headerName: "EXPIRE", width: 100 },
    { field: "COUPON_MAXDISCOUNT", headerName: "MAX DISCOUNT", width: 150 },
    { field: "COUPON_MINORDER", headerName: "MIN ORDER", width: 100 },
    { field: "COUPON_MINPRICE", headerName: "MIN PRICE", width: 100 },
    {
      field: "COUPON_VALIDITY",
      headerName: "VALIDITY",
      width: 200,
      renderCell: params => moment(params.value).format("DD/MM/YYYY")
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      renderCell: params => actionElement(params)
    }
  ];

  useEffect(() => {
    CouponStore.getCoupon();
  }, []);

  useEffect(() => {
    setCouponList(CouponStore.data.couponList);
  }, [CouponStore.data.couponList]);

  const openModal = param => {
    setCoupon(param?.row);
    setisOpen(!isOpen);
  };
  const handleChange = e => {
    setColor(e.target.value);
  };

  const addCoupon = values => {
    const formData = new FormData();
    formData.append("COUPON_CODE", values.COUPON_CODE);
    formData.append("COUPON_MAXDISCOUNT", values.COUPON_MAXDISCOUNT);
    formData.append("COUPON_EXPIRE", values.COUPON_EXPIRE);
    formData.append("COUPON_IMAGE", values.COUPON_IMAGE);
    formData.append("COUPON_MINPRICE", values.COUPON_MINPRICE);
    formData.append("COUPON_DISCOUNTPERCENT", values.COUPON_DISCOUNTPERCENT);
    formData.append("COUPON_MINORDER", values.COUPON_MINORDER);
    formData.append("COUPON_VALIDITY", values.COUPON_VALIDITY);
    if (!coupon?.COUPON_ID) {
      CouponStore.addCoupon(formData, navigationCallBack);
    } else {
      formData.append("COUPON_ID", coupon?.COUPON_ID);
      CouponStore.updateCoupon(formData, navigationCallBack);
    }
  };

  const deleteCoupon = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this coupon!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        CouponStore.deleteCoupon(
          param?.row?.COUPON_ID,
          navigationCallBackDelete
        );
      }
    });
  };

  const navigationCallBackDelete = () => {
    setCoupon();
    CouponStore.getCoupon();
  };
  const navigationCallBack = () => {
    setCoupon();
    openModal();
    CouponStore.getCoupon();
  };

  const actionElement = params => (
    <div className='action-wrapper'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => openModal(params)}>
          <RemoveRedEyeIcon />
        </div>
      }
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteCoupon(params)}>
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
            <button className='modal_btn' onClick={() => openModal()}>
              Add Coupon
            </button>
          </div>

          <Box
            sx={{
              height: 400,
              width: "100%",
              boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px"
            }}
          >
            <DataGrid
              rows={couponList || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.COUPON_ID + 1}
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
              <h3>{coupon?.COUPON_ID ? "Edit Coupon" : "Add Coupon"}</h3>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  COUPON_CODE: coupon?.COUPON_CODE || "",
                  COUPON_MAXDISCOUNT: coupon?.COUPON_MAXDISCOUNT || "",
                  COUPON_EXPIRE: coupon?.COUPON_EXPIRE || "",
                  COUPON_IMAGE: coupon?.COUPON_IMAGE || "",
                  COUPON_MINPRICE: coupon?.COUPON_MINPRICE || "",
                  COUPON_DISCOUNTPERCENT: coupon?.COUPON_DISCOUNTPERCENT || "",
                  COUPON_MINORDER: coupon?.COUPON_MINORDER || "",
                  COUPON_VALIDITY: coupon?.COUPON_VALIDITY || ""
                }}
                onSubmit={values => addCoupon(values)}
                validationSchema={CouponSchema}
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
                  <form
                    onSubmit={handleSubmit}
                    className='login-form'
                    style={{ width: "100%" }}
                  >
                    <div className={styles.details_sec}>
                      <div className={styles.detail_form}>
                        <label>COUPON CODE *</label>
                        <input
                          name='COUPON_CODE'
                          value={values.COUPON_CODE}
                          placeholder='Enter coupon code'
                          onChange={handleChange("COUPON_CODE")}
                          onBlur={handleBlur("COUPON_CODE")}
                        />
                        {errors.COUPON_CODE && touched.COUPON_CODE ? (
                          <span className='error'>{errors.COUPON_CODE}</span>
                        ) : null}

                        <label>COUPON MAX DISCOUNT *</label>
                        <input
                          name='COUPON_MAXDISCOUNT'
                          value={values.COUPON_MAXDISCOUNT}
                          placeholder='Enter max discount'
                          onChange={handleChange("COUPON_MAXDISCOUNT")}
                          onBlur={handleBlur("COUPON_MAXDISCOUNT")}
                        />
                        {errors.COUPON_MAXDISCOUNT &&
                        touched.COUPON_MAXDISCOUNT ? (
                          <span className='error'>
                            {errors.COUPON_MAXDISCOUNT}
                          </span>
                        ) : null}

                        <label>COUPON EXPIRE?*</label>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={
                            values.COUPON_EXPIRE
                              ? Boolean(values.COUPON_EXPIRE)
                              : values.COUPON_EXPIRE
                          }
                          label=''
                          size='small'
                          onChange={handleChange("COUPON_EXPIRE")}
                          onBlur={handleBlur("COUPON_EXPIRE")}
                        >
                          <MenuItem value={false}>NO</MenuItem>
                          <MenuItem value={true}>YES</MenuItem>
                        </Select>

                        {errors.COUPON_EXPIRE && touched.COUPON_EXPIRE ? (
                          <span className='error'>{errors.COUPON_EXPIRE}</span>
                        ) : null}

                        <label>COUPON MIN PRICE*</label>
                        <input
                          name='COUPON_MINPRICE'
                          value={values.COUPON_MINPRICE}
                          placeholder='Enter Min Price'
                          onChange={handleChange("COUPON_MINPRICE")}
                          onBlur={handleBlur("COUPON_MINPRICE")}
                        />
                        {errors.COUPON_MINPRICE && touched.COUPON_MINPRICE ? (
                          <span className='error'>
                            {errors.COUPON_MINPRICE}
                          </span>
                        ) : null}

                        <label>COUPON DISCOUNT PERCENT*</label>
                        <input
                          name='COUPON_DISCOUNTPERCENT'
                          value={values.COUPON_DISCOUNTPERCENT}
                          placeholder='Enter Discount Percent'
                          onChange={handleChange("COUPON_DISCOUNTPERCENT")}
                          onBlur={handleBlur("COUPON_DISCOUNTPERCENT")}
                        />
                        {errors.COUPON_DISCOUNTPERCENT &&
                        touched.COUPON_DISCOUNTPERCENT ? (
                          <span className='error'>
                            {errors.COUPON_DISCOUNTPERCENT}
                          </span>
                        ) : null}

                        <label>COUPON MIN ORDER*</label>
                        <input
                          name='COUPON_MINORDER'
                          value={values.COUPON_MINORDER}
                          placeholder='Enter Min order'
                          onChange={handleChange("COUPON_MINORDER")}
                          onBlur={handleBlur("COUPON_MINORDER")}
                        />
                        {errors.COUPON_MINORDER && touched.COUPON_MINORDER ? (
                          <span className='error'>
                            {errors.COUPON_MINORDER}
                          </span>
                        ) : null}

                        <label>COUPON VALIDITY*</label>
                        <input
                          name='COUPON_VALIDITY'
                          type='date'
                          value={moment(values?.COUPON_VALIDITY).format(
                            "YYYY-MM-DD"
                          )}
                          placeholder='Enter Validity'
                          onChange={handleChange("COUPON_VALIDITY")}
                          onBlur={handleBlur("COUPON_VALIDITY")}
                        />

                        {errors.COUPON_VALIDITY && touched.COUPON_VALIDITY ? (
                          <span className='error'>
                            {errors.COUPON_VALIDITY}
                          </span>
                        ) : null}

                        <label htmlFor='bar'>Cover Image</label>
                        <input
                          name='COUPON_IMAGE'
                          id='COUPON_IMAGE'
                          type='file'
                          accept='image/png,image/jpeg,image/jpg'
                          onChange={event => {
                            setFieldValue(
                              "COUPON_IMAGE",
                              event.target.files[0]
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className='modal_button_section'>
                      <button
                        className='modal_submit_btn pointer'
                        type='submit'
                      >
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
export default Coupon;
