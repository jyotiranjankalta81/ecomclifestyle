import { sequelizeDB } from "../db/db-connection";
import { Op, QueryTypes } from "sequelize";
import { sendMail } from "../utils/sendMail";
import { config } from "../config/config";
import { uploadimage } from "../utils/imageupload";
import moment from "moment";
import { CategoryInstance } from "../model/category.model";
import { SubCategoryInstance } from "../model/subcategory.model";
import { ProductSizeInstance } from "../model/ProductSize.model";
import { ProductColorInstance } from "../model/ProductColor.model";
import { ProductInstance } from "../model/product.model";
import { BannnerInstance } from "../model/banner.model";
import { OrderInstance } from "../model/order.model";
import { CouponInstance } from "../model/coupon.model";
import { BrandInstance } from "../model/Brand.model";
import custom_helpers from "../utils/custom_helpers";

class AdminServiceClass {
  GetCategory = async () => {
    const result = await CategoryInstance.findAll({
      where: {
        ISDELETED: false,
      },
      order: [["CATEGORY_ID", "DESC"]],
    });
    return result;
  };

  checkcategorybyname = async (data: any) => {
    const result = await CategoryInstance.findOne({
      where: {
        CATEGORY_CODE: data.CATEGORY_CODE,
      },
      order: [["CATEGORY_ID", "DESC"]],
    });
    return result;
  };

  PostCategory = async (data: any, file: any) => {
    const result = await CategoryInstance.create({
      CATEGORY_NAME: data.CATEGORY_NAME,
      CATEGORY_CODE: data.CATEGORY_CODE,
      CATEGORY_IMAGE: custom_helpers.file_changepath(file?.path),
    });
    return result;
  };

  PutCategory = async (data: any, file: any) => {
    const _categoryImage = file?.path
      ? custom_helpers.file_changepath(file.path)
      : data.CATEGORY_IMAGE;
    console.log(
      "🚀 ~ file: admin.service.ts:56 ~ AdminServiceClass ~ PutCategory= ~ _categoryImage:",
      _categoryImage
    );

    const result = await CategoryInstance.update(
      {
        CATEGORY_NAME: data.CATEGORY_NAME,
        CATEGORY_CODE: data.CATEGORY_CODE,
        CATEGORY_IMAGE: _categoryImage,
      },
      {
        where: {
          CATEGORY_ID: data.CATEGORY_ID,
        },
      }
    );
    return result;
  };

  DeleteCategory = async (data: any) => {
    const result = await CategoryInstance.update(
      {
        ISDELETED: true,
      },
      {
        where: {
          CATEGORY_ID: data.CATEGORY_ID,
        },
      }
    );
    return result;
  };

  GetSubCategory = async () => {
    const result = await sequelizeDB.query(
      `SELECT * FROM tbl_SubCategory LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID  = tbl_SubCategory.CATEGORY_ID WHERE tbl_SubCategory.ISDELETED = '${false}'`,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };

  PostSubCategory = async (data: any) => {
    const result = await SubCategoryInstance.create({
      CATEGORY_ID: data.CATEGORY_ID,
      SUBCATEGORY_NAME: data.SUBCATEGORY_NAME,
    });
    return result;
  };

  UpdateSubCategory = async (data: any) => {
    const result = await SubCategoryInstance.update(
      {
        // CATEGORY_ID: data.CATEGORY_ID,
        SUBCATEGORY_NAME: data.SUBCATEGORY_NAME,
      },
      {
        where: {
          SUBCATEGORY_ID: data.SUBCATEGORY_ID,
        },
      }
    );
    return result;
  };

  CheckSubCategory = async (data: any) => {
    const result = await SubCategoryInstance.findOne({
      where: {
        CATEGORY_ID: data.CATEGORY_ID,
        SUBCATEGORY_NAME: data.SUBCATEGORY_NAME,
      },
    });
    return result;
  };

  deleteSubCategory = async (data: any) => {
    const result = await SubCategoryInstance.update(
      {
        ISDELETED: true,
      },
      {
        where: {
          SUBCATEGORY_ID: data.SUBCATEGORY_ID,
        },
      }
    );
    return result;
  };

  GetProductSize = async () => {
    const result = await ProductSizeInstance.findAll({
      where: {
        ISDELETED: false,
      },
    });
    return result;
  };

  PostProductSize = async (data: any) => {
    const result = await ProductSizeInstance.create({
      PRODUCTSIZE_NAME: data.PRODUCTSIZE_NAME,
    });
    return result;
  };

  PostProduct = async (data: any, files: any) => {
    let productImage: any[] = [];
    let productBarcode = "";
    if (files.length > 0) {
      files.forEach((img: { path: string }) => {
        productImage.push(img.path.replace(/\\/g, "/").split("public/").pop());
        // productImage.push(file_changepath(img.path));
      });
    } else {
      productImage.push("defaults/images/NoImage.png");
    }

    const result = await ProductInstance.create({
      CATEGORY_ID: data.CATEGORY_ID,
      SUBCATEGORY_ID: data.SUBCATEGORY_ID,
      BRAND_ID: data.BRAND_ID,
      PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
      PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
      PRODUCT_NAME: data.PRODUCT_NAME,
      PRODUCT_QUANTITY: data.PRODUCT_QUANTITY,
      PRODUCT_DESCRIPTION: data.PRODUCT_DESCRIPTION,
      PRODUCT_PRICE: data.PRODUCT_PRICE,
      PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
      PRODUCT_DISCOUNTSTATUS: data.PRODUCT_DISCOUNTSTATUS === 0 ? false : true,
      PRODUCT_TAG: data.PRODUCT_TAG,
      PRODUCT_IMAGE: JSON.stringify(productImage),
      PRODUCT_BARCODE: productBarcode,
      COMPANYCODE: data.COMPANYCODE,
      WEIGHT: data.WEIGHT,
      PACKAGETYPE: data.WEIGHT > 30 ? "Parcel" : "document",
      BRANCHNAME: data.BRANCHNAME,
      TECHINFO: data.TECHINFO,
      ADDITINFO: data.ADDITINFO,
    });

    console.log("result", result);

    return result;
  };

  PostBanner = async (data: any, files: any, userid: number) => {
    let BannerImage: any = custom_helpers.file_changepath(files?.path);
    const result = await BannnerInstance.create({
      BANNER_DESC: data.BANNER_DESC,
      BANNER_IMAGE: BannerImage,
      CREATED_BY: userid,
    });

    return result;
  };

  UpdateBanner = async (data: any, files: any, userid: number) => {
    let BannerImage: any = custom_helpers.file_changepath(files?.path);
    const result = await BannnerInstance.update(
      {
        BANNER_DESC: data.BANNER_DESC,
        BANNER_IMAGE: BannerImage,
        CREATED_BY: userid,
      },
      {
        where: {
          BANNER_ID: data.BANNER_ID,
        },
      }
    );
    return result;
  };

  DeleteBanner = async (data: any, files: any, userid: number) => {
    const result = await BannnerInstance.update(
      {
        ISDELETED: true,
      },
      {
        where: {
          BANNER_ID: data.BANNER_ID,
        },
      }
    );
    return result;
  };

  UpdateProductSize = async (data: any) => {
    const result = await ProductSizeInstance.update(
      {
        PRODUCTSIZE_NAME: data.PRODUCTSIZE_NAME,
      },
      {
        where: {
          PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
        },
      }
    );
    return result;
  };

  DeleteProductSize = async (data: any) => {
    const result = await ProductSizeInstance.update(
      {
        ISDELETED: true,
      },
      {
        where: {
          PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
        },
      }
    );
    return result;
  };

  delete_product = async (data: any) => {
    const result = await ProductInstance.update(
      {
        ISDELETED: true,
      },
      {
        where: {
          PRODUCT_ID: data.PRODUCT_ID,
        },
      }
    );
    return result;
  };

  GetProductColor = async () => {
    const result = await ProductColorInstance.findAll({
      where: {
        ISDELETED: false,
      },
      order: [["createdAt", "DESC"]],
    });
    return result;
  };

  GetAllProduct = async () => {
    const query =
      "SELECT tbl_product.* , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM `tbl_product` LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID  WHERE tbl_product.ISDELETED = false;";
    const result = await sequelizeDB.query(query, {
      nest: true,
      type: QueryTypes.SELECT,
    });
    return result;
  };

  get_topseller_product = async () => {
    const query =
      "SELECT tbl_product.* , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM `tbl_product` LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID  WHERE tbl_product.ISDELETED = false ORDER  BY RAND() LIMIT 10;";
    const result = await sequelizeDB.query(query, {
      nest: true,
      type: QueryTypes.SELECT,
    });
    return result;
  };

  recommended_product = async (catrgoryid: number) => {
    const result = await ProductInstance.findAll({
      where: {
        CATEGORY_ID: catrgoryid,
      },
    });
    return result;
  };

  GetBanner = async () => {
    const result = BannnerInstance.findAll({
      where: {
        ISDELETED: false,
      },
    });
    return result;
  };

  GetBannerbyID = async (BANNER_ID: number) => {
    const result = BannnerInstance.findOne({
      where: {
        BANNER_ID: BANNER_ID,
        ISDELETED: false,
      },
    });
    return result;
  };

  getProductColorbyname = async (data: any) => {
    const result = await ProductColorInstance.findOne({
      where: {
        PRODUCTCOLOR_NAME: data.PRODUCTCOLOR_NAME,
      },
    });
    return result;
  };

  PostProductColor = async (data: any, file: any) => {
    const result = await ProductColorInstance.create({
      PRODUCTCOLOR_NAME: data.PRODUCTCOLOR_NAME,
      PRODUCTCOLOR_CODE: data.PRODUCTCOLOR_CODE,
      PRODUCTCOLOR_IMAGE: custom_helpers.file_changepath(file?.path),
    });
    return result;
  };

  UpdateProductColor = async (data: any, file: any) => {
    const result = await ProductColorInstance.update(
      {
        PRODUCTCOLOR_NAME: data.PRODUCTCOLOR_NAME,
        PRODUCTCOLOR_CODE: data.PRODUCTCOLOR_CODE,
        PRODUCTCOLOR_IMAGE:
          data.PRODUCTCOLOR_IMAGE || custom_helpers.file_changepath(file.path),
      },
      {
        where: {
          PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
        },
      }
    );
    return result;
  };

  deleteProductColor = async (data: any) => {
    const result = await ProductColorInstance.update(
      {
        ISDELETED: true,
      },
      {
        where: {
          PRODUCTCOLOR_ID: data.id,
        },
      }
    );
    return result;
  };

  UpdateProduct = async (data: any, files: any) => {
    let productImage: any[] =
      data.PRODUCT_IMAGE_OLD && data.PRODUCT_IMAGE_OLD.split(",");
    if (files.length > 0) {
      files.forEach((img: { path: string }) => {
        productImage.push(custom_helpers.file_changepath(img.path));
      });
    }
    const result = await ProductInstance.update(
      {
        CATEGORY_ID: data.CATEGORY_ID,
        SUBCATEGORY_ID: data.SUBCATEGORY_ID,
        BRAND_ID: data.BRAND_ID,
        PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
        PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
        PRODUCT_NAME: data.PRODUCT_NAME,
        PRODUCT_QUANTITY: data.PRODUCT_QUANTITY,
        PRODUCT_DESCRIPTION: data.PRODUCT_DESCRIPTION,
        PRODUCT_PRICE: data.PRODUCT_PRICE,
        PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
        PRODUCT_DISCOUNTSTATUS: data.PRODUCT_DISCOUNTSTATUS,
        PRODUCT_TAG: data.PRODUCT_TAG,
        PRODUCT_IMAGE: JSON.stringify(productImage),
        COMPANYCODE: data.COMPANYCODE,
        WEIGHT: data.WEIGHT,
        PACKAGETYPE: data.PACKAGETYPE,
        BRANCHNAME: data.BRANCHNAME,
        TECHINFO: data.TECHINFO,
        ADDITINFO: data.ADDITINFO,
      },
      {
        where: {
          PRODUCT_ID: data.PRODUCT_ID,
        },
      }
    );

    return result;
  };

  AddDiscount = async (data: any, files: any) => {
    const result = await ProductInstance.update(
      {
        PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
        PRODUCT_DISCOUNTSTATUS: true,
      },
      {
        where: {
          PRODUCT_ID: data.PRODUCT_ID,
        },
      }
    );

    return result;
  };

  Remove_Discount = async (data: any, files: any) => {
    const result = await ProductInstance.update(
      {
        PRODUCT_DISCOUNT: 0,
        PRODUCT_DISCOUNTSTATUS: false,
      },
      {
        where: {
          PRODUCT_ID: data.PRODUCT_ID,
        },
      }
    );

    return result;
  };

  changeOrderStatus = async (data: any) => {
    const result = await OrderInstance.update(
      {
        ORDER_STATUS: data.ORDER_STATUS,
      },
      {
        where: {
          ORDER_ID: data.ORDER_ID,
        },
      }
    );

    return result;
  };

  getAllOrder = async (data: any, files: any) => {
    const query =
      "SELECT * FROM tbl_order LEFT JOIN tbl_user ON tbl_user.ID = tbl_order.CREATED_BY ORDER BY ORDER_ID DESC";
    const result = await sequelizeDB.query(query, {
      nest: true,
      type: QueryTypes.SELECT,
    });
    return result;
  };

  getOrderCount = async () => {
    const result = await OrderInstance.count();
    return result;
  };

  getDashboardrder = async () => {
    const query =
      "SELECT * FROM tbl_order LEFT JOIN tbl_user ON tbl_user.ID = tbl_order.CREATED_BY ORDER BY tbl_order.ORDER_ID DESC LIMIT 10";
    const result = await sequelizeDB.query(query, {
      nest: true,
      type: QueryTypes.SELECT,
    });
    return result;
  };

  getEarningCount = async () => {
    const result = await OrderInstance.findAll({
      attributes: [
        [sequelizeDB.fn("sum", sequelizeDB.col("AMOUNT")), "TOTAL_AMOUNT"],
      ],
      where: {
        ORDER_STATUS: 4,
      },
    });
    return result;
  };

  getSalesCount = async () => {
    const result = await OrderInstance.count({
      where: {
        ORDER_STATUS: 4,
      },
    });
    return result;
  };
  getRecentOrders = async () => {
    const result = await OrderInstance.findAll({
      limit: 5,
      where: {
        //your where conditions, or without them if you need ANY entry
      },
      order: [["createdAt", "DESC"]],
    });
    return result;
  };

  bulkupload = async (data: any) => {
    try {
      const result = await ProductInstance.create({
        CATEGORY_ID: data.CATEGORY_ID,
        BRAND_ID: data.BRAND_ID,
        PRODUCTSIZE_ID: data.PRODUCTSIZE_ID,
        PRODUCTCOLOR_ID: data.PRODUCTCOLOR_ID,
        PRODUCT_NAME: data.PRODUCT_NAME,
        PRODUCT_QUANTITY: data.PRODUCT_QUANTITY,
        PRODUCT_DESCRIPTION: data.PRODUCT_DESCRIPTION,
        PRODUCT_PRICE: data.PRODUCT_PRICE,
        PRODUCT_DISCOUNT: data.PRODUCT_DISCOUNT,
        PRODUCT_DISCOUNTSTATUS:
          data.PRODUCT_DISCOUNTSTATUS === 0 ? false : true,
        PRODUCT_TAG: Math.floor(Math.random() * 1000000000),
        PRODUCT_IMAGE: data.PRODUCT_IMAGE
          ? JSON.stringify([data?.PRODUCT_IMAGE])
          : JSON.stringify(["defaults/images/NoImage.png"]),
        COMPANYCODE: data.COMPANYCODE,
        WEIGHT: data.WEIGHT,
        PACKAGETYPE: "Parcel",
        BRANCHNAME: data.BRANCHNAME,
        TECHINFO: data.TECHINFO,
        ADDITINFO: data.ADDITINFO,
      });
      return result;
    } catch (error: any) {
      return error.message;
    }
  };

  createCoupon = async (data: any, files: any, user: any) => {
    let couponimage: any =
      files.path.replace("public/uploads", "images") ||
      "defaults/images/NoImage.png";

    let result = await CouponInstance.create({
      COUPON_IMAGE: couponimage,
      COUPON_CODE: data.COUPON_CODE,
      COUPON_MINPRICE: data.COUPON_MINPRICE,
      COUPON_MAXDISCOUNT: data.COUPON_MAXDISCOUNT,
      COUPON_DISCOUNTPERCENT: data.COUPON_DISCOUNTPERCENT,
      COUPON_MINORDER: data.COUPON_MINORDER,
      COUPON_VALIDITY: data.COUPON_VALIDITY,
      ADDED_BY: user.sub,
    });

    return result;
  };

  checkbrandbyname = async (name: any) => {
    let result = await BrandInstance.findOne({
      where: {
        BRAND_CODE: name,
        ISDELETED: false,
      },
    });
    return result;
  };

  CreateBrands = async (data: any) => {
    let uploadbrand = custom_helpers.file_changepath(data?.file?.path);
    let result = await BrandInstance.create({
      BRAND_NAME: data.body.BRAND_NAME,
      BRAND_IMAGE: uploadbrand,
      BRAND_CODE: data.body?.BRAND_CODE,
    }).catch((err) => {
      console.error(err);
    });

    return result;
  };

  getBrands = async () => {
    let result = await BrandInstance.findAll({
      where: {
        ISDELETED: false,
      },
      order: [["createdAt", "DESC"]],
    });
    return result;
  };

  getCoupon = async (data: any) => {
    let { id }: { id: number } = data.query;

    let result;
    if (id) {
      result = await CouponInstance.findAll({
        where: {
          COUPON_ID: id,
        },
      });
      return result;
    }
    result = await CouponInstance.findAll();
    return result;
  };

  delCoupon = async (data: any) => {
    let { COUPON_ID }: { COUPON_ID: number } = data;
    let result = await CouponInstance.destroy({
      where: {
        COUPON_ID: COUPON_ID,
      },
    });
    return result;
  };

  updateCoupon = async (data: any, files: any, user: any) => {
    let couponimage: any =
      files.path.replace("public/uploads", "images") ||
      "defaults/images/NoImage.png";
    let result = await CouponInstance.update(
      {
        COUPON_IMAGE: couponimage,
        COUPON_CODE: data.COUPON_CODE,
        COUPON_MINPRICE: data.COUPON_MINPRICE,
        COUPON_MAXDISCOUNT: data.COUPON_MAXDISCOUNT,
        COUPON_DISCOUNTPERCENT: data.COUPON_DISCOUNTPERCENT,
        COUPON_MINORDER: data.COUPON_MINORDER,
        COUPON_VALIDITY: data.COUPON_VALIDITY,
        COUPON_EXPIRE: data.COUPON_EXPIRE,
        ADDED_BY: user.sub,
        ISDELETED: false,
      },
      {
        where: {
          COUPON_ID: data.COUPON_ID,
        },
      }
    );
    if (result[0] === 0) {
      return false;
    }
    return true;
  };

  applyCoupon = async (data: any) => {
    let coupon = await CouponInstance.findOne({
      where: {
        COUPON_CODE: data.COUPON_CODE,
      },
      attributes: {
        exclude: [
          "ISDELETED",
          "ADDED_BY",
          "createdAt",
          "updatedAt",
          "COUPON_ID",
          "COUPON_VALIDITY",
          "COUPON_EXPIRE",
        ],
      },
    });
    return coupon;
  };

  expireCoupons = async (data: any) => {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    console.log(now);
    // Find all coupons that are not already expired and have a validity date in the past
    const coupons = await CouponInstance.findAll({
      where: {
        COUPON_EXPIRE: false,
        COUPON_VALIDITY: {
          [Op.lte]: now,
        },
      },
    });
    console.log(coupons);
    // Update each coupon to mark it as expired
    await Promise.all(
      coupons.map((coupon) => {
        coupon.setDataValue("COUPON_EXPIRE", true);
        return coupon.save();
      })
    );

    // Return a response indicating how many coupons were marked as expired
    return { expiredCoupons: coupons.length };
  };

  updateBrands = async (data: any) => {
    let upload =
      data.body.BRAND_IMAGE || custom_helpers.file_changepath(data.file.path);
    let result = await BrandInstance.update(
      {
        BRAND_IMAGE: upload,
        BRAND_NAME: data.body.BRAND_NAME,
        BRAND_STATUS: data.body.BRAND_STATUS,
      },
      {
        where: {
          BRAND_ID: data.body.BRAND_ID,
        },
      }
    );
    return true;
  };

  delBrands = async (data: any) => {
    console.log("brand_id", data);

    let { id } = data.query;

    let result = await BrandInstance.destroy({
      where: {
        BRAND_ID: id,
      },
    });
    return result;
  };

  CategoryPDF = async () => {
    const result = await CategoryInstance.findAll({
      attributes: ["CATEGORY_ID", "CATEGORY_NAME", "CATEGORY_CODE"],
    });
    return result;
  };
}

export const AdminService = new AdminServiceClass();
