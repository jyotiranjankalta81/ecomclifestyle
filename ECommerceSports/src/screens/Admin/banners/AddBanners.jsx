import React from "react";
import { Formik } from "formik";
import styles from "../../../App.module.css";
import * as Yup from "yup";
import HomeStore from "../../../store/HomeStore";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../../api/config";

const BannerSchema = Yup.object().shape({
  BANNER_DESC: Yup.string().required("Banner Description is required")
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

const AddBanners = observer(() => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const addBanner = async values => {
    const formData = new FormData();
    formData.append("BANNER_DESC", values.BANNER_DESC);
    formData.append("BANNER_IMAGE", values.BANNER_IMAGE);

    if (state?.item?.BANNER_ID) {
      formData.append("BANNER_ID", state?.item?.BANNER_ID);
      HomeStore.updateBanner(formData, navigationCallBackUpdate);
    } else {
      HomeStore.addBanner(formData, navigationCallBack);
    }
  };

  const navigationCallBack = () => {
    window.location.reload();
  };

  const navigationCallBackUpdate = () => {
    navigate("/banners/bannersList");
  };

  return (
    <>
      <div className='admin_container'>
        <Formik
          enableReinitialize={true}
          initialValues={{
            BANNER_DESC: state?.item?.BANNER_DESC || "",
            BANNER_IMAGE: ""
          }}
          onSubmit={values => addBanner(values)}
          validationSchema={BannerSchema}
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
              <div className={styles.deatils_container}>
                <div className={styles.pro_detail}>
                  <div className={styles.details_sec}>
                    <div className={styles.detail_form}>
                      <label>Banner Description*</label>
                      <input
                        name='BANNER_DESC'
                        value={values.BANNER_DESC}
                        placeholder='Enter Banner Description'
                        onChange={handleChange("BANNER_DESC")}
                        onBlur={handleBlur("BANNER_DESC")}
                      />
                      {errors.BANNER_DESC && touched.BANNER_DESC ? (
                        <span className='error'>{errors.BANNER_DESC}</span>
                      ) : null}
                    </div>
                    <div className={styles.detail_form}>
                      <label>Banner Image*</label>
                      <input
                        name='BANNER_IMAGE'
                        // value={values.BANNER_IMAGE}
                        accept='image/png,image/jpeg,image/jpg'
                        onChange={event => {
                          setFieldValue("BANNER_IMAGE", event.target.files[0]);
                        }}
                        type='file'
                      />
                    </div>
                    <div className={styles.detail_form}>
                      <div>
                        <p>Selected Image</p>
                      </div>
                      <div className={styles.code_div}>
                        <div className={styles.bar_container}>
                          <div>
                            {!state?.item?.BANNER_IMAGE ||
                              (values.BANNER_IMAGE && (
                                <img
                                  width={"20%"}
                                  src={URL.createObjectURL(values.BANNER_IMAGE)}
                                ></img>
                              ))}
                            {state?.item?.BANNER_IMAGE &&
                              !values.BANNER_IMAGE && (
                                <img
                                  width={"20%"}
                                  crossOrigin='anonymous'
                                  src={`${BASE_IMAGE_URL}${state?.item?.BANNER_IMAGE}`}
                                ></img>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.barCode_sec}>
                  <div
                    className={styles.code_div}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end"
                    }}
                  >
                    <div>
                      <button type='submit'>Save</button>
                    </div>
                  </div>
                </div>
                {/* End Bar Code */}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
});

export default AddBanners;
