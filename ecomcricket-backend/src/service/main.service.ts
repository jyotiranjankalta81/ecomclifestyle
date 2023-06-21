import { uuid } from "uuidv4";
import { Request } from "express";
import { randomgenrator } from "../utils/randomnumber";
import { sendMail } from "../utils/sendMail";
import dotenv from "dotenv";
import path from "path";
import { config } from "../config/config";
import { uploadimage } from "../utils/imageupload";
import moment from "moment";
import { sequelizeDB } from "../db/db-connection";
import { Op, QueryTypes, Sequelize } from "sequelize";
import { CartInstance } from "../model/cart.model";
import { OrderInstance } from "../model/order.model";
import { ContactInstance } from "../model/contact.model";
import { AddressInstance } from "../model/address.model";
import { RatingReviewInstance } from "../model/RatingReview.model";
import { ProductInstance } from "../model/product.model";
import { NotificationInstance } from "../model/notification.model";
import { CouponInstance } from "../model/coupon.model";
import { UserInstance } from "../model/user.model";
dotenv.config({ path: path.join(__dirname, "../../.env") });

class mainServiceClass {
  GetCart = async (req: any, user: any) => {
    const result = await sequelizeDB.query(
      `SELECT tbl_cart.*,tbl_product.PRODUCT_NAME,tbl_product.PRODUCT_DESCRIPTION,tbl_product.PRODUCT_PRICE,tbl_product.PRODUCT_DISCOUNT,tbl_product.PRODUCT_IMAGE,tbl_product.PRODUCT_DISCOUNTSTATUS,tbl_product.PRODUCT_BARCODE , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM tbl_cart LEFT JOIN tbl_product ON tbl_product.PRODUCT_ID = tbl_cart.CART_PRODUCT_ID  LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID WHERE tbl_cart.CART_USER_ID = ${user?.sub}`,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };

  getCartById = async (req: any, user: any) => {
    const result = await CartInstance.findOne({
      where: {
        CART_USER_ID: user.sub,
        CART_ID: req.CART_ID,
      },
    });
    return result;
  };

  getcartbyPID = async (req: any, user: any) => {
    const result = await CartInstance.findOne({
      where: {
        CART_USER_ID: user.sub,
        CART_PRODUCT_ID: req.CART_PRODUCT_ID,
        CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
        CART_PRODUCT_QUANTITY: req.CART_PRODUCT_QUANTITY,
        CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
      },
    });
    return result;
  };

  Create_Cart = async (req: any, user: any) => {
    const result = await CartInstance.create({
      CART_USER_ID: user.sub,
      CART_PRODUCT_ID: req.CART_PRODUCT_ID,
      CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
      CART_PRODUCT_QUANTITY: req.CART_PRODUCT_QUANTITY,
      CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
    });
    return result;
  };

  getproductbyid = async (productID: any) => {
    const result = await ProductInstance.findOne({
      where: {
        PRODUCT_ID: productID,
      },
    });
    return result;
  };

  get_order = async (req: any, user: any) => {
    const result = await OrderInstance.findAll({
      where: {
        CREATED_BY: user.sub,
      },
    });
    return result;
  };

  create_order = async (req: any, user: any) => {
    const result = await OrderInstance.create({
      CREATED_BY: user.sub,
      ODR_ID: 0,
      USER_ORDER: req.USER_ORDER,
      AMOUNT: req.AMOUNT,
      TYPE_OF_PAYMENT: req.TYPE_OF_PAYMENT,
      USER_ADDRESS : req.USER_ADDRESS,
      ORDER_STATUS: 0,
      ISDELETED: false,
    });
    return result;
  };

  clear_cart = async (user: any) => {
    const result = await CartInstance.destroy({
      where: {
        CART_USER_ID: user.sub,
      },
    });
    return result;
  };

  update_CartbyPID = async (req: any, user: any, olddata: any) => {
    const result = await CartInstance.update(
      {
        CART_PRODUCT_QUANTITY:
          olddata.CART_PRODUCT_QUANTITY + req.CART_PRODUCT_QUANTITY,
      },
      {
        where: {
          CART_USER_ID: user.sub,
          CART_PRODUCT_ID: req.CART_PRODUCT_ID,
          CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
          CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
        },
      }
    );
    return result;
  };

  update_cart = async (req: any, user: any) => {
    const result = await CartInstance.update(
      {
        CART_USER_ID: user.sub,
        CART_PRODUCT_ID: req.CART_PRODUCT_ID,
        CART_PRODUCT_COLOR: req.CART_PRODUCT_COLOR,
        CART_PRODUCT_QUANTITY: req.CART_PRODUCT_QUANTITY,
        CART_PRODUCT_SIZE: req.CART_PRODUCT_SIZE,
      },
      {
        where: {
          CART_ID: req.CART_ID,
        },
      }
    );
    return result;
  };

  delete_cart = async (req: any, user: any) => {
    console.log(req);

    const result = await CartInstance.destroy({
      where: {
        CART_ID: req.CART_ID,
      },
    });

    return result;
  };

  contact = async (req: any, res: any) => {
    const result = await ContactInstance.create({
      NAME: req.NAME,
      EMAIL: req.EMAIL,
      PHONE: req.PHONE,
      MESSAGE: req.MESSAGE,
      ISDELETED: false,
    });
    return result;
  };

  get_contact = async (req: any, user: any) => {
    const result = ContactInstance.findAll({
      where: {
        ISDELETED: false,
      },
    });
    return result;
  };

  addAddress = async (req: any, user: any) => {
    const result = await AddressInstance.create({
      ADDRESS_USER_ID: user.sub,
      FULLNAME: req.FULLNAME,
      PHONE: req.PHONE,
      FLAT: req.FLAT,
      STREET: req.STREET,
      LANDMARK: req.LANDMARK,
      PIN: req.PIN,
      CITY: req.CITY,
      STATE: req.STATE,
      COUNTRY: req.COUNTRY,
      ISDELETED: false,
    });
    return result;
  };

  getAddress = async (req: any, user: any) => {
    const result = AddressInstance.findAll({
      where: {
        ADDRESS_USER_ID: user.sub,
      },
    });
    return result;
  };

  updateAddress = async (req: any, user: any) => {
    const result = await AddressInstance.update(
      {
        FULLNAME: req.FULLNAME,
        PHONE: req.PHONE,
        FLAT: req.FLAT,
        STREET: req.STREET,
        LANDMARK: req.LANDMARK,
        PIN: req.PIN,
        CITY: req.CITY,
        STATE: req.STATE,
        COUNTRY: req.COUNTRY,
      },
      {
        where: {
          ADDRESS_ID: req.ADDRESS_ID,
        },
      }
    );
    return result;
  };

  deleteAddress = async (header: any) => {
    const result = await AddressInstance.destroy({
      where: {
        ADDRESS_ID: header.ADDRESS_ID,
      },
    });
  };

  addRatingReview = async (req: any, user: any) => {
    const result = await RatingReviewInstance.create({
      CREATED_BY: user.sub,
      PRODUCT_ID: req.PRODUCT_ID,
      RATING: req.RATING,
      REVIEWS: req.REVIEWS,
      ISDELETED: false,
    });
    return result;
  };

  getRatingReview = async (req: any, user: any) => {
    const result = await RatingReviewInstance.findAll({
      where: {
        PRODUCT_ID: req.PRODUCT_ID,
      },
    });
    return result;
  };

  createNotification = async (data: any) => {
    await NotificationInstance.create(data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  getNotification = async (req: any) => {
    let { id }: { id: number } = req.query;
    let result;
    if (id) {
      result = await NotificationInstance.findAll({
        where: {
          NId: id,
        },
      });
    } else {
      result = await NotificationInstance.findAll();
    }

    return result;
  };

  Produectsearch = async (req: any) => {
    const query = ` SELECT tbl_product.* , tbl_Category.CATEGORY_NAME AS CATALOG_NAME , tbl_SubCategory.SUBCATEGORY_NAME AS SUBNAME ,tbl_ProductSize.PRODUCTSIZE_NAME AS PRODUCTSIZE , tbl_ProductColor.PRODUCTCOLOR_NAME AS PRODUCT_COLOR FROM tbl_product  LEFT JOIN tbl_Category ON tbl_Category.CATEGORY_ID = tbl_product.CATEGORY_ID    LEFT JOIN tbl_SubCategory ON tbl_SubCategory.SUBCATEGORY_ID = tbl_product.SUBCATEGORY_ID LEFT JOIN tbl_ProductSize ON tbl_ProductSize.PRODUCTSIZE_ID = tbl_product.PRODUCTSIZE_ID  LEFT JOIN tbl_ProductColor ON tbl_ProductColor.PRODUCTCOLOR_ID = tbl_product.PRODUCTCOLOR_ID WHERE tbl_product.PRODUCT_NAME LIKE '%${req.product}%' OR tbl_Category.CATEGORY_NAME LIKE '%${req.product}%' OR tbl_SubCategory.SUBCATEGORY_NAME LIKE '%${req.product}%'`;
    const result = await sequelizeDB.query(query, {
      nest: true,
      type: QueryTypes.SELECT,
    });
    return result;
  };

  updateNotification = async (data: any) => {
    let { id }: { id: number } = data.params;

    let { title, message }: { title: string; message: string } = data.body;

    let result = await NotificationInstance.update(
      { TITLE: title, MESSAGE: message },
      {
        where: {
          NId: id,
        },
      }
    );
    return result;
  };

  getFilteredProduct = async (data: any) => {
    const categoryData: any[] = data?.CATEGORY_ID?.length > 0 ? data?.CATEGORY_ID : null;
    const subcategoryData: any[] = data?.SUBCATEGORY_ID?.length > 0 ? data?.SUBCATEGORY_ID : null;
    const brandData: any[] = data?.BRAND_ID?.length > 0 ? data?.BRAND_ID : null;
    const productsizedata: any[] = data?.PRODUCTSIZE_ID?.length > 0 ? data?.PRODUCTSIZE_ID : null;
    const productcolorData: any[] = data?.PRODUCTCOLOR_ID?.length > 0 ? data?.PRODUCTCOLOR_ID : null;

    if (
      categoryData ||
      subcategoryData ||
      brandData ||
      productsizedata ||
      productcolorData
    ) {
      const result = await ProductInstance.findAll({
        where: {
          [Op.or]: [
            { CATEGORY_ID: categoryData },
            { SUBCATEGORY_ID: subcategoryData },
            { BRAND_ID: brandData },
            { PRODUCTSIZE_ID: { [Op.like]: `%${productsizedata}%` } },
            { PRODUCTCOLOR_ID: { [Op.like]: `%${productcolorData}%` } },
          ],
        },
      });
      return result;
    } else {
      const result = await ProductInstance.findAll();
      return result;
    }
  };

  getFilteredWithoutProduct = async () => {
    const result = await ProductInstance.findAll();
    return result;
  };

  update_payment = async (req: any) => {
    const result = await OrderInstance.update(
      {
        PAYMENT_ID: req.PAYMENT_ID,
        PAYMENT_AT: req.PAYMENT_AT,
      },
      {
        where: {
          ORDER_REFNO: req.ORDER_REFNO,

        }
      })

    return result
  }

  checkpayment = async (refno: any) => {
    const result = await sequelizeDB.query(
      `SELECT *  FROM tbl_order WHERE ORDER_REFNO = '${refno}' AND PAYMENT_ID IS NOT NULL LIMIT 1;`,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  profiledetails = async (userid: number) => {
    const result = await UserInstance.findOne({ where: { ID: userid } })
    return result;
  }

}

export const mainService = new mainServiceClass();
