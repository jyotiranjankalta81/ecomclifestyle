import express, { Express, Response, Request } from "express";
import { auth } from "../../middlewares/auth";
import { AdminController } from "../../controller/admin.controller";
import { validate } from "../../middlewares/validate";
import {
  BannerValidation,
  ProductDiscountValidation,
  ProductValidation,
} from "../../validation/MainValidation";
import AdminValidation from "../../validation/AdminValidation";
import image_upload from "../../utils/multers/multar_upload";

const adminrouter = express.Router();

//category--------------------------------------------------
adminrouter.get("/product-category", AdminController.get_category);
adminrouter.post(
  "/product-category",
  auth(),
  image_upload.single("CATEGORY_IMAGE"),
  AdminValidation.post_category,
  AdminController.post_category
);
adminrouter.put(
  "/product-category",
  auth(),
  image_upload.single("CATEGORY_IMAGE"),
  AdminValidation.update_category,
  AdminController.put_category
);
adminrouter.put(
  "/delete-product-category",
  auth(),
  AdminController.delete_category
);

//sub category----------------------------------------------------
adminrouter.get("/product-subcategory", AdminController.get_subcategory);
adminrouter.post(
  "/product-subcategory",
  auth(),
  AdminController.post_subcategory
);
adminrouter.put(
  "/product-subcategory",
  auth(),
  AdminController.put_subcategory
);
adminrouter.put(
  "/delete-product-subcategory",
  auth(),
  AdminController.delete_subcategory
);
// product size----------------------------------------------------------------------

adminrouter.get("/product-size", AdminController.get_productsize);
adminrouter.post("/product-size", auth(), AdminController.post_productsize);
adminrouter.put("/product-size", auth(), AdminController.put_productsize);
adminrouter.put(
  "/delete-product-size",
  auth(),
  AdminController.delete_productsize
);

// product color----------------------------------------------------------------------

adminrouter.get("/product-color", AdminController.get_productcolor);
adminrouter.post(
  "/product-color",
  auth(),
  image_upload.single("PRODUCTCOLOR_IMAGE"),
  AdminController.post_productcolor
);
adminrouter.put(
  "/product-color",
  auth(),
  image_upload.single("PRODUCTCOLOR_IMAGE"),
  AdminController.put_productColor
);
adminrouter.delete(
  "/product-color",
  auth(),
  AdminController.delete_productcolor
);

//product ----------------------------------------------------------------------------------
adminrouter.get("/product", AdminController.get_product);
adminrouter.post(
  "/product",
  // auth(),
  image_upload.array("PRODUCT_IMAGE"),
  ProductValidation,
  AdminController.post_product
);
adminrouter.put(
  "/product",
  auth(),
  image_upload.array("PRODUCT_IMAGE"),
  ProductValidation,
  AdminController.put_product
);
adminrouter.delete("/product", auth(), AdminController.delete_product);

//bannner----------------------------------------------------------------------
adminrouter.get("/banner", AdminController.get_bannner);
adminrouter.post(
  "/banner",
  auth(),
  image_upload.single("BANNER_IMAGE"),
  BannerValidation,
  AdminController.post_banner
);
adminrouter.put(
  "/banner",
  auth(),
  image_upload.single("BANNER_IMAGE"),
  BannerValidation,
  AdminController.put_banner
);
adminrouter.put("/delete-banner", auth(), AdminController.delete_banner);

//discount---------------------------------------------
adminrouter.put(
  "/add-discount",
  auth(),
  validate(ProductDiscountValidation.body),
  AdminController.Add_Discount
);
adminrouter.put("/remove-discount", auth(), AdminController.Remove_Discount);
//order -------------------------------------------------
adminrouter.get("/allorder", auth(), AdminController.getAllOrder);
//order status----------------------------------
adminrouter.put(
  "/chnage-order-status",
  auth(),
  AdminController.changeOrderStatus
);
//Dashboard -------------------------------------------------
adminrouter.get("/dashboard", auth(), AdminController.getAllCount);
adminrouter.get("/dashboard-order", AdminController.getDashboardrder);
// Bulk upload
adminrouter.post(
  "/bulk-product-upload",
  AdminValidation.Bulkupload_ProductValidation,
  AdminController.BulkProductUpload
);
//COUPONS
adminrouter.post(
  "/coupon",
  auth(),
  image_upload.single("COUPON_IMAGE"),
  AdminController.create_coupon
);
adminrouter.get("/coupon", auth(), AdminController.getCoupon);
adminrouter.put(
  "/coupon",
  auth(),
  image_upload.single("COUPON_IMAGE"),
  AdminController.updateCoupon
);
adminrouter.delete("/coupon", auth(), AdminController.delCoupon);
adminrouter.post("/apply-coupon", auth(), AdminController.applyCoupon);
adminrouter.get("/coupon-expire", auth(), AdminController.expireCoupons);

//brands
adminrouter.post(
  "/product-brands",
  // auth(),
  image_upload.single("BRAND_IMAGE"),
  AdminController.CreateBrands
);
adminrouter.get("/product-brands", AdminController.getBrands);
adminrouter.put(
  "/product-brands",
  auth(),
  image_upload.single("BRAND_IMAGE"),
  AdminController.updateBrands
);
adminrouter.delete("/product-brands", auth(), AdminController.delBrands);

/* country */
adminrouter.post("/get-country", AdminController.GetCountry);
adminrouter.post(
  "/country",
  AdminValidation.post_country,
  AdminController.PostCountry
);
adminrouter.put(
  "/country",
  AdminValidation.post_country,
  AdminController.PutCountry
);
adminrouter.delete("/country", AdminController.DeleteCounrty);

/* state */

adminrouter.post("/get-state", AdminController.GetState);
adminrouter.post(
  "/state",
  AdminValidation.post_state,
  AdminController.PostState
);
adminrouter.put("/state", AdminValidation.post_state, AdminController.PutState);
adminrouter.delete("/state", AdminController.DeleteState);

// ---------------------pdfkit--------------------------

adminrouter.post("/product-csv", AdminController.export_csv);
adminrouter.post("/pfd-category", AdminController.export_Category);
adminrouter.post("/pfd-subcategory", AdminController.export_SubCategory);
adminrouter.post("/pfd-brand", AdminController.export_Brand);
adminrouter.post("/pfd-color", AdminController.export_Color);
adminrouter.post("/pfd-size", AdminController.export_Size);

//----------------cloud service----------------

adminrouter.post(
  "/cloud/upload",
  image_upload.single("file"),
  AdminController.cloudimage
);

export default adminrouter;
