import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Upload } from "antd";
import styles from "../../../App.module.css";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ProductStore from "../../../store/ProductStore";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../../api/config";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { BarcodeGenerator } from "./BarCodeGenerator/BarcodeGenerator";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cktext from "./Cktext";

const ProductSchema = Yup.object().shape({
  CATEGORY_ID: Yup.string().required("Category is required"),
  SUBCATEGORY_ID: Yup.string().required("Sub Catgory is required"),
  PRODUCTSIZE_ID: Yup.array().required("Provide at least one size"),
  PRODUCTCOLOR_ID: Yup.array().required("Provide at least one color"),
  PRODUCT_NAME: Yup.string().required("Product Name is required"),
  PRODUCT_QUANTITY: Yup.string().required("Quantity is required"),
  PRODUCT_PRICE: Yup.string().required("Price is required"),
  COMPANYCODE: Yup.string().required("Company Code is required"),
  WEIGHT: Yup.string().required("Weight is required"),
  PACKAGETYPE: Yup.string().required("Package is required"),
  BRANCHNAME: Yup.string().required("Branch Name is required"),
  BRAND_ID: Yup.string().required("Brand Name is required"),
  // PRODUCT_BARCODE: Yup.string().required("Bar Code Image is required")
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const AddProducts = observer(() => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [sizeList, setSizeList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [colorList, setColorList] = useState();
  const [categoryList, setCategoryList] = useState();
  const [brandList, setBrandList] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    ProductStore.getCategory();
    ProductStore.getSubCategory();
    ProductStore.getBrand();
    ProductStore.getSize();
    ProductStore.getColor();
  }, []);
  useEffect(() => {
    setBrandList(ProductStore.data.brandList);
  }, [ProductStore.data.brandList]);

  useEffect(() => {
    setCategoryList(ProductStore.data.categoryList);
  }, [ProductStore.data.categoryList]);

  useEffect(() => {
    setSizeList(ProductStore.data.sizeList);
  }, [ProductStore.data.sizeList]);

  useEffect(() => {
    setSubCategoryList(ProductStore.data.subCategoryList);
  }, [ProductStore.data.subCategoryList]);

  useEffect(() => {
    setColorList(ProductStore.data.colorList);
  }, [ProductStore.data.colorList]);

  const addProduct = async values => {
    const formData = new FormData();
    formData.append("CATEGORY_ID", values.CATEGORY_ID);
    formData.append("SUBCATEGORY_ID", values.SUBCATEGORY_ID);
    formData.append("PRODUCTSIZE_ID", JSON.stringify(values.PRODUCTSIZE_ID));
    formData.append("PRODUCTCOLOR_ID", JSON.stringify(values.PRODUCTCOLOR_ID));
    formData.append("PRODUCT_NAME", values.PRODUCT_NAME);
    formData.append("PRODUCT_QUANTITY", values.PRODUCT_QUANTITY);
    formData.append("PRODUCT_DESCRIPTION", values.PRODUCT_DESCRIPTION);
    formData.append("TECHINFO", values.TECHINFO);
    formData.append("ADDITINFO", values.ADDITINFO);
    formData.append("PRODUCT_PRICE", values.PRODUCT_PRICE);
    formData.append("PRODUCT_TAG", values.PRODUCT_TAG);
    formData.append("BRAND_ID", values.BRAND_ID);
    formData.append("PACKAGETYPE", values.PACKAGETYPE);
    formData.append("WEIGHT", values.WEIGHT);
    formData.append("COMPANYCODE", values.COMPANYCODE);
    formData.append("BRANCHNAME", values.BRANCHNAME);

    values.PRODUCT_BARCODE &&
      formData.append("PRODUCT_BARCODE", values.PRODUCT_BARCODE);

    if (values.PRODUCT_IMAGE.length > 0 && values.PRODUCT_IMAGE) {
      for (var i = 0; i < values.PRODUCT_IMAGE.length; i++) {
        formData.append("PRODUCT_IMAGE", values.PRODUCT_IMAGE[i].originFileObj);
      }
    } else {
      formData.append("PRODUCT_IMAGE", null);
    }

    if (state?.item?.PRODUCT_IMAGE != "" && state?.item?.PRODUCT_IMAGE) {
      if (JSON.parse(state?.item?.PRODUCT_IMAGE).length > 0) {
        formData.append("PRODUCT_IMAGE_OLD", state?.item?.PRODUCT_IMAGE);
      }
    }

    if (state?.item?.PRODUCT_ID) {
      formData.append("PRODUCT_ID", state?.item?.PRODUCT_ID);
      ProductStore.updateProduct(formData, navigationCallBackUpdate);
    } else {
      ProductStore.addProduct(formData, navigationCallBack);
    }
  };
  const navigationCallBack = () => {
    window.location.reload();
  };
  const navigationCallBackUpdate = () => {
    navigate("/admin/products");
  };

  if (state?.item?.PRODUCT_IMAGE && state?.item?.PRODUCT_IMAGE != "") {
    var file = [];
    var fileLists = JSON.parse(state?.item?.PRODUCT_IMAGE);
    fileLists?.forEach((element, index) => {
      file.push({
        uid: index,
        name: "image" + index + 2,
        status: "done",
        url: BASE_IMAGE_URL + element,
        thumbUrl: BASE_IMAGE_URL + element
      });
    });
  }

  return (
    <>
      <div className='admin_container'>
        <Formik
          enableReinitialize={true}
          initialValues={{
            CATEGORY_ID: state?.item?.CATEGORY_ID || "",
            SUBCATEGORY_ID: state?.item?.SUBCATEGORY_ID || "",
            PRODUCTSIZE_ID: state?.item?.PRODUCTSIZE_ID
              ? JSON?.parse(state?.item?.PRODUCTSIZE_ID)
              : [],
            PRODUCTCOLOR_ID: state?.item?.PRODUCTCOLOR_ID
              ? JSON.parse(state?.item?.PRODUCTCOLOR_ID)
              : [],
            PRODUCT_NAME: state?.item?.PRODUCT_NAME || "",
            PRODUCT_QUANTITY: parseInt(state?.item?.PRODUCT_QUANTITY) || 1,
            PRODUCT_DESCRIPTION: state?.item?.PRODUCT_DESCRIPTION || "",
            ADDITINFO: state?.item?.ADDITINFO || "",
            TECHINFO: state?.item?.TECHINFO || "",
            PRODUCT_PRICE: state?.item?.PRODUCT_PRICE || "",
            PRODUCT_TAG: state?.item?.PRODUCT_TAG || "",
            PRODUCT_IMAGE: "",
            PRODUCT_BARCODE: state?.item?.PRODUCT_BARCODE || "",
            COMPANYCODE: state?.item?.COMPANYCODE || "154242",
            WEIGHT: state?.item?.WEIGHT || "",
            PACKAGETYPE: state?.item?.PACKAGETYPE || "Parcel",
            BRANCHNAME: state?.item?.BRANCHNAME || "UAE BRANCH",
            BRAND_ID: state?.item?.BRAND_ID || ""
          }}
          onSubmit={values => addProduct(values)}
          validationSchema={ProductSchema}
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
              <div
                className={styles.deatils_container}
                // style={{ marginLeft: "15.65rem" }}
              >
                <div className={styles.pro_detail}>
                  <div styles={{ border: "2px solid black" }}>
                    <div className={styles.product_img_sec}>
                      <div className={styles.img_select}>
                        <p>Add Imges</p>
                        <div className={styles.radio_buttons}>
                          {/* <div>
                          <input id='img' type={"radio"} name='pro_img' />
                          <label htmlFor='img'>Images</label>
                        </div>
                        <div>
                          <input id='gif' type={"radio"} name='pro_img' />
                          <label htmlFor='gif'>GIF</label>
                        </div> */}
                        </div>
                        <span></span>
                      </div>
                      <div className={styles.upload_files_container}>
                        <Upload.Dragger
                          listType='picture'
                          action={""}
                          defaultFileList={file && [...file]}
                          beforeUpload={file => {
                            return false;
                          }}
                          onChange={file => {
                            setFieldValue("PRODUCT_IMAGE", file.fileList);
                          }}
                          showUploadList={{ showRemoveIcon: true }}
                          className={styles.upload_files_container}
                          style={{
                            backgroundColor: "#d9dcf0",
                            padding: " 90px 50px",
                            border: "3px dashed #3F51B5"
                          }}
                        >
                          <div className={styles.upload_icons}>
                            <div>
                              <svg
                                width='45'
                                height='37'
                                viewBox='0 0 45 37'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M43.7778 32.1111C43.7778 33.1425 43.3681 34.1317 42.6387 34.861C41.9094 35.5903 40.9203 36 39.8889 36H4.88889C3.85749 36 2.86834 35.5903 2.13903 34.861C1.40972 34.1317 1 33.1425 1 32.1111V10.7222C1 9.69082 1.40972 8.70167 2.13903 7.97236C2.86834 7.24305 3.85749 6.83333 4.88889 6.83333H12.6667L16.5556 1H28.2222L32.1111 6.83333H39.8889C40.9203 6.83333 41.9094 7.24305 42.6387 7.97236C43.3681 8.70167 43.7778 9.69082 43.7778 10.7222V32.1111Z'
                                  stroke='#3F51B5'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                                <path
                                  d='M22.3889 28.2216C26.6844 28.2216 30.1666 24.7393 30.1666 20.4438C30.1666 16.1482 26.6844 12.666 22.3889 12.666C18.0933 12.666 14.6111 16.1482 14.6111 20.4438C14.6111 24.7393 18.0933 28.2216 22.3889 28.2216Z'
                                  stroke='#3F51B5'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </div>
                            <div>
                              <svg
                                width='24'
                                height='15'
                                viewBox='0 0 24 15'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M7.536 14.216C6.288 14.216 5.16 13.936 4.152 13.376C3.144 12.8 2.352 12 1.776 10.976C1.2 9.936 0.912 8.736 0.912 7.376C0.912 6.032 1.208 4.84 1.8 3.8C2.392 2.76 3.2 1.96 4.224 1.4C5.248 0.84 6.392 0.56 7.656 0.56C8.92 0.56 10.064 0.84 11.088 1.4C12.112 1.96 12.92 2.76 13.512 3.8C14.104 4.84 14.4 6.032 14.4 7.376C14.4 8.72 14.096 9.912 13.488 10.952C12.88 11.992 12.048 12.8 10.992 13.376C9.952 13.936 8.8 14.216 7.536 14.216ZM7.536 11.84C8.24 11.84 8.896 11.672 9.504 11.336C10.128 11 10.632 10.496 11.016 9.824C11.4 9.152 11.592 8.336 11.592 7.376C11.592 6.416 11.408 5.608 11.04 4.952C10.672 4.28 10.184 3.776 9.576 3.44C8.968 3.104 8.312 2.936 7.608 2.936C6.904 2.936 6.248 3.104 5.64 3.44C5.048 3.776 4.576 4.28 4.224 4.952C3.872 5.608 3.696 6.416 3.696 7.376C3.696 8.8 4.056 9.904 4.776 10.688C5.512 11.456 6.432 11.84 7.536 11.84ZM19.8407 2.696C20.2407 2.024 20.7687 1.504 21.4247 1.136C22.0967 0.752 22.8887 0.56 23.8007 0.56V3.392H23.1047C22.0327 3.392 21.2167 3.664 20.6567 4.208C20.1127 4.752 19.8407 5.696 19.8407 7.04V14H17.1047V0.776H19.8407V2.696Z'
                                  fill='#3F51B5'
                                />
                              </svg>
                            </div>
                            <div>
                              <svg
                                width='57'
                                height='37'
                                viewBox='0 0 57 37'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M56 6L38.5 18.5L56 31V6Z'
                                  stroke='#3F51B5'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />

                                <path
                                  d='M33.5 1H6C3.23858 1 1 3.23858 1 6V31C1 33.7614 3.23858 36 6 36H33.5C36.2614 36 38.5 33.7614 38.5 31V6C38.5 3.23858 36.2614 1 33.5 1Z'
                                  stroke='#3F51B5'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </div>
                          </div>
                          <br />
                          <div>
                            <p>
                              Drop your files here or{" "}
                              <span className={styles.upload_span}>Browse</span>
                            </p>
                          </div>
                        </Upload.Dragger>
                      </div>
                    </div>
                  </div>
                  {/* {errors.PRODUCT_IMAGE && touched.PRODUCT_IMAGE ? (
                  <small className="error">{errors.PRODUCT_IMAGE}</small>
                ) : null} */}
                  {/* Product Detail Start */}

                  {/* Product Detail End */}
                  <div className={styles.details_sec}>
                    <Accordion disableScrollLock={true}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        disableScrollLock={true}
                        id='panel1a-header'
                      >
                        <Typography>Product Details</Typography>
                      </AccordionSummary>
                      <AccordionDetails disableScrollLock={true}>
                        <div className={styles.detail_form}>
                          <label>Product Name*</label>
                          <input
                            name='PRODUCT_NAME'
                            value={values.PRODUCT_NAME}
                            placeholder='Enter product name'
                            onChange={handleChange("PRODUCT_NAME")}
                            onBlur={handleBlur("PRODUCT_NAME")}
                          />
                          {errors.PRODUCT_NAME && touched.PRODUCT_NAME ? (
                            <span className='error'>{errors.PRODUCT_NAME}</span>
                          ) : null}

                          <label>Price*</label>
                          <input
                            name='price'
                            type='number'
                            value={values.PRODUCT_PRICE}
                            onChange={handleChange("PRODUCT_PRICE")}
                            onBlur={handleBlur("PRODUCT_PRICE")}
                            placeholder='Enter product price'
                          />
                          {errors.PRODUCT_PRICE && touched.PRODUCT_PRICE ? (
                            <span className='error'>
                              {errors.PRODUCT_PRICE}
                            </span>
                          ) : null}
                          <label id='batSize'>Brand Name*</label>
                          <Select
                            labelId='batSize'
                            id='demo-multiple-checkbox'
                            value={values.BRAND_ID}
                            onChange={handleChange("BRAND_ID")}
                            onBlur={handleBlur("BRAND_ID")}
                            MenuProps={MenuProps}
                            sx={{
                              height: "40px"
                            }}
                          >
                            {brandList &&
                              brandList.map(bran => (
                                <MenuItem
                                  key={bran.BRAND_ID}
                                  value={bran.BRAND_ID}
                                >
                                  <ListItemText primary={bran.BRAND_NAME} />
                                </MenuItem>
                              ))}
                          </Select>
                          {errors.BRAND_ID && touched.BRAND_ID ? (
                            <span className='error'>{errors.BRAND_ID}</span>
                          ) : null}
                          <label id='batSize'>Category*</label>
                          <Select
                            labelId='batSize'
                            id='demo-multiple-checkbox'
                            value={values.CATEGORY_ID}
                            onChange={handleChange("CATEGORY_ID")}
                            onBlur={handleBlur("CATEGORY_ID")}
                            MenuProps={MenuProps}
                            sx={{
                              height: "40px"
                            }}
                          >
                            {categoryList &&
                              categoryList.map(cat => (
                                <MenuItem
                                  key={cat.CATEGORY_ID}
                                  value={cat.CATEGORY_ID}
                                >
                                  <ListItemText primary={cat.CATEGORY_NAME} />
                                </MenuItem>
                              ))}
                          </Select>
                          {errors.CATEGORY_ID && touched.CATEGORY_ID ? (
                            <span className='error'>{errors.CATEGORY_ID}</span>
                          ) : null}

                          <label id='batSize'>Sub-Category*</label>
                          <Select
                            labelId='batSize'
                            id='demo-multiple-checkbox'
                            value={values.SUBCATEGORY_ID}
                            onChange={handleChange("SUBCATEGORY_ID")}
                            onBlur={handleBlur("SUBCATEGORY_ID")}
                            MenuProps={MenuProps}
                            sx={{
                              height: "40px"
                            }}
                          >
                            {subCategoryList &&
                              subCategoryList.map(cat => (
                                <MenuItem
                                  key={cat.SUBCATEGORY_ID}
                                  value={cat.SUBCATEGORY_ID}
                                >
                                  <ListItemText
                                    primary={cat.SUBCATEGORY_NAME}
                                  />
                                </MenuItem>
                              ))}
                          </Select>
                          {errors.SUBCATEGORY_ID && touched.SUBCATEGORY_ID ? (
                            <span className='error'>
                              {errors.SUBCATEGORY_ID}
                            </span>
                          ) : null}

                          <label id='batSize'>Size</label>
                          <Select
                            labelId='batSize'
                            id='demo-multiple-checkbox'
                            label='Size'
                            value={values.PRODUCTSIZE_ID}
                            onChange={handleChange("PRODUCTSIZE_ID")}
                            onBlur={handleBlur("PRODUCTSIZE_ID")}
                            MenuProps={MenuProps}
                            multiple
                            sx={{
                              height: "40px"
                            }}
                            input={
                              <OutlinedInput
                                id='select-multiple-chip'
                                label='Color'
                              />
                            }
                            renderValue={selected => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5
                                }}
                              >
                                {selected.map(value => (
                                  <Chip
                                    key={value}
                                    label={
                                      sizeList &&
                                      sizeList.find(
                                        item => item.PRODUCTSIZE_ID === value
                                      )?.PRODUCTSIZE_NAME
                                    }
                                  />
                                ))}
                              </Box>
                            )}
                          >
                            {sizeList &&
                              sizeList.map(siz => (
                                <MenuItem
                                  key={siz.PRODUCTSIZE_ID}
                                  value={siz.PRODUCTSIZE_ID}
                                >
                                  <ListItemText
                                    primary={siz.PRODUCTSIZE_NAME}
                                  />
                                </MenuItem>
                              ))}
                          </Select>
                          {errors.PRODUCTSIZE_ID && touched.PRODUCTSIZE_ID ? (
                            <span className='error'>
                              {errors.PRODUCTSIZE_ID}
                            </span>
                          ) : null}
                          <label id='batColor'>Color*</label>
                          <Select
                            labelId='batColor'
                            id='demo-multiple-checkbox'
                            value={values.PRODUCTCOLOR_ID}
                            label='Color'
                            onChange={handleChange("PRODUCTCOLOR_ID")}
                            onBlur={handleBlur("PRODUCTCOLOR_ID")}
                            MenuProps={MenuProps}
                            multiple
                            sx={{
                              height: "40px"
                            }}
                            input={
                              <OutlinedInput
                                id='select-multiple-chip'
                                label='Color'
                              />
                            }
                            renderValue={selected => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5
                                }}
                              >
                                {selected.map(value => (
                                  <Chip
                                    key={value}
                                    label={
                                      colorList &&
                                      colorList.find(
                                        item => item.PRODUCTCOLOR_ID === value
                                      )?.PRODUCTCOLOR_NAME
                                    }
                                  />
                                ))}
                              </Box>
                            )}
                          >
                            {colorList &&
                              colorList.map(col => (
                                <MenuItem
                                  key={col.PRODUCTCOLOR_ID}
                                  value={col.PRODUCTCOLOR_ID}
                                >
                                  <ListItemText
                                    primary={col.PRODUCTCOLOR_NAME}
                                  />
                                </MenuItem>
                              ))}
                          </Select>
                          {errors.PRODUCTCOLOR_ID && touched.PRODUCTCOLOR_ID ? (
                            <span className='error'>
                              {errors.PRODUCTCOLOR_ID}
                            </span>
                          ) : null}
                          <label>Quantity*</label>
                          <span>
                            <div
                              onClick={() => {
                                if (values.PRODUCT_QUANTITY > 1) {
                                  values.PRODUCT_QUANTITY =
                                    values.PRODUCT_QUANTITY - 1;
                                  setFieldValue(
                                    "PRODUCT_QUANTITY",
                                    values.PRODUCT_QUANTITY
                                  );
                                }
                              }}
                              className={styles._btn}
                            >
                              <svg
                                width='14'
                                height='2'
                                viewBox='0 0 14 2'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  d='M1 1H13'
                                  stroke='black'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </div>

                            <input
                              name='quantity'
                              min={"1"}
                              value={values.PRODUCT_QUANTITY}
                              onChange={handleChange("PRODUCT_QUANTITY")}
                              onBlur={handleBlur("PRODUCT_QUANTITY")}
                              id='quantity'
                              type='number'
                            />
                            <div
                              onClick={() => {
                                values.PRODUCT_QUANTITY =
                                  values.PRODUCT_QUANTITY + 1;
                                setFieldValue(
                                  "PRODUCT_QUANTITY",
                                  values.PRODUCT_QUANTITY
                                );
                              }}
                              className={styles._btn}
                            >
                              +
                            </div>
                          </span>
                          {errors.PRODUCT_QUANTITY &&
                          touched.PRODUCT_QUANTITY ? (
                            <span className='error'>
                              {errors.PRODUCT_QUANTITY}
                            </span>
                          ) : null}
                          <label>Description*</label>
                          <div
                            style={{
                              height: "100%",
                              border: "1px solid #B3B3B3",
                              borderRadius: "5px"
                            }}
                          >
                            <CKEditor
                              editor={ClassicEditor}
                              data={values.PRODUCT_DESCRIPTION}
                              value={values.PRODUCT_DESCRIPTION}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("PRODUCT_DESCRIPTION", data);
                              }}
                              onBlur={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("PRODUCT_DESCRIPTION", data);
                              }}
                            />
                          </div>

                          <label>Tag</label>
                          <div className={styles.detail_tag}>
                            <input
                              name='tag'
                              value={values.PRODUCT_TAG}
                              onChange={handleChange("PRODUCT_TAG")}
                              onBlur={handleBlur("PRODUCT_TAG")}
                              placeholder='Enter tags'
                            />
                            {errors.PRODUCT_TAG && touched.PRODUCT_TAG ? (
                              <span className='error'>
                                {errors.PRODUCT_TAG}
                              </span>
                            ) : null}
                            <div className={styles.tag_show}>
                              {/* {Array.isArray(tags)
                          ? tags.map((element) => {
                            return <p>{element}</p>;
                          })
                          : null} */}
                            </div>
                          </div>
                          <label>Company Code</label>
                          <div className={styles.detail_tag}>
                            <input
                              name='COMPANYCODE'
                              value={values.COMPANYCODE}
                              onChange={handleChange("COMPANYCODE")}
                              onBlur={handleBlur("COMPANYCODE")}
                              placeholder='Enter Company Code'
                            />
                            {errors.COMPANYCODE && touched.COMPANYCODE ? (
                              <span className='error'>
                                {errors.COMPANYCODE}
                              </span>
                            ) : null}
                          </div>

                          <label>Branch Name</label>
                          <div className={styles.detail_tag}>
                            <input
                              name='BRANCHNAME'
                              value={values.BRANCHNAME}
                              onChange={handleChange("BRANCHNAME")}
                              onBlur={handleBlur("BRANCHNAME")}
                              placeholder='Enter Branch Name'
                            />
                            {errors.BRANCHNAME && touched.BRANCHNAME ? (
                              <span className='error'>{errors.BRANCHNAME}</span>
                            ) : null}
                          </div>

                          <label>Package Type</label>
                          <div className={styles.detail_tag}>
                            <Select
                              labelId='batSize'
                              id='demo-multiple-checkbox'
                              value={values.PACKAGETYPE}
                              onChange={handleChange("PACKAGETYPE")}
                              onBlur={handleBlur("PACKAGETYPE")}
                              MenuProps={MenuProps}
                              sx={{
                                height: "40px"
                              }}
                            >
                              <MenuItem value={"Parcel"}>
                                <ListItemText primary={"Parcel"} />
                              </MenuItem>
                              <MenuItem value={"Document"}>
                                {/* <ListItemText primary={"Document"} /> */}
                              </MenuItem>
                            </Select>
                            {errors.PACKAGETYPE && touched.PACKAGETYPE ? (
                              <span className='error'>
                                {errors.PACKAGETYPE}
                              </span>
                            ) : null}
                          </div>
                          <label>Package Weight</label>
                          <div className={styles.detail_tag}>
                            <input
                              name='WEIGHT'
                              value={values.WEIGHT}
                              onChange={handleChange("WEIGHT")}
                              onBlur={handleBlur("WEIGHT")}
                              placeholder='Enter Weight'
                            />
                            {errors.WEIGHT && touched.WEIGHT ? (
                              <span className='error'>{errors.WEIGHT}</span>
                            ) : null}
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel2a-content'
                        id='panel2a-header'
                      >
                        <Typography>Product Info</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      <CKEditor
                              editor={ClassicEditor}
                              data={values.ADDITINFO}
                              value={values.ADDITINFO}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("ADDITINFO", data);
                              }}
                              onBlur={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("ADDITINFO", data);
                              }}
                            />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel2a-content'
                        id='panel2a-header'
                      >
                        <Typography>Technical Info</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                      <CKEditor
                              editor={ClassicEditor}
                              data={values.TECHINFO}
                              value={values.TECHINFO}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("TECHINFO", data);
                              }}
                              onBlur={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("TECHINFO", data);
                              }}
                            />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
                {/* <div className={styles.barCode_sec}>
                <BarcodeGenerator />
                <div>
                  <p>Selected Bar Code</p>
                </div>
                <div className={styles.code_div}>
                  <div className={styles.bar_container}>
                    <div>
                      {!state?.item?.PRODUCT_BARCODE &&
                        values.PRODUCT_BARCODE && (
                          <img
                            width={"20%"}
                            src={URL.createObjectURL(values.PRODUCT_BARCODE)}
                          ></img>
                        )}
                      {state?.item?.PRODUCT_BARCODE && (
                        <img
                          width={"20%"}
                          crossOrigin='anonymous'
                          src={`${BASE_IMAGE_URL}${state?.item?.PRODUCT_BARCODE}`}
                        ></img>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
              <button   className='modal_submit_btn pointer' type='submit'>Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
});

export default AddProducts;
