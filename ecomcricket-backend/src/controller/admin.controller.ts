import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import jwt_decode from "jwt-decode";
import { AdminService } from "../service/admin.service";
import { ProductValidation } from "../validation/MainValidation";
import { mainService } from "../service/main.service";
import { uploadimage } from "../utils/imageupload";
import path from "path";
import ApiStatus from "../utils/apistatus";
import custom_helpers from "../utils/custom_helpers";
import { CountryInstance } from "../model/country.model";
import { StateInstance } from "../model/state.model";
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
class AdminControllerClass {
  get_category = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.GetCategory();
      return res.status(httpStatus.OK).send({
        success: true,
        message: "Your Form has subbmitted successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  post_category = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkcategorybyname: any = await AdminService.checkcategorybyname(
        req.body
      );
      if (checkcategorybyname) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send(ApiStatus.errormsg("Category Code Already Exist!"));
      } else {
        const category = await AdminService.PostCategory(req.body, req.file);
        return res
          .status(httpStatus.OK)
          .send(ApiStatus.successmsg("Category Created Successfully"));
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error.message));
    }
  });

  put_category = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.PutCategory(req.body, req.file);
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("Category Updated successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  delete_category = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.DeleteCategory(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: "Category Updated successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_subcategory = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.GetSubCategory();
      return res.status(httpStatus.OK).send({
        success: true,
        message: "Your Form has subbmitted successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  post_subcategory = catchAsync(async (req: Request, res: Response) => {
    try {
      const CheckSubCategory: any = await AdminService.CheckSubCategory(
        req.body
      );
      if (CheckSubCategory) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Sub category product already exist!",
          data: [],
        });
      } else {
        const category = await AdminService.PostSubCategory(req.body);
        return res.status(httpStatus.OK).send({
          success: true,
          message: "SubCategory Created successfully",
          data: category,
        });
      }
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  put_subcategory = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.UpdateSubCategory(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: "SubCategory Updated successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  delete_subcategory = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.deleteSubCategory(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: "SubCategory Deleted successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_productsize = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.GetProductSize();
      return res.status(httpStatus.OK).send({
        success: true,
        message: "subbmitted successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  post_productsize = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.PostProductSize(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Created successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  put_productsize = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.UpdateProductSize(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Updated successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  delete_productsize = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.DeleteProductSize(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Updated successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_productcolor = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.GetProductColor();
      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_topseller_product = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.get_topseller_product();
      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  recommended_product = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.recommended_product(
        req.body.CATEORY_ID
      );
      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_product = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.GetAllProduct();
      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_bannner = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.GetBanner();
      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  post_product = catchAsync(async (req: Request, res: Response) => {
    const category = await AdminService.PostProduct(req.body, req.files);
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Created successfully",
        data: category,
      });
    } catch (error) {
      console.log("product", error);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  post_banner = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg("Banner image is required"));
    }

    const getheader: any = req.header("authorization");
    const users: any = jwt_decode(getheader);
    const category = await AdminService.PostBanner(
      req.body,
      req.file,
      users?.sub
    );
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Created successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  put_banner = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg("Banner image is required"));
    }
    const getbannerbyid = await AdminService.GetBannerbyID(req.body.BANNER_ID);
    if (getbannerbyid) {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);
      const category = await AdminService.UpdateBanner(
        req.body,
        req.file,
        users?.sub
      );
      try {
        return res
          .status(httpStatus.OK)
          .send(ApiStatus.successmsg("Banner Updated successfully"));
      } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: error,
        });
      }
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "invalid Id!", data: [] });
    }
  });

  delete_banner = catchAsync(async (req: Request, res: Response) => {
    const getbannerbyid = await AdminService.GetBannerbyID(req.body.BANNER_ID);
    if (getbannerbyid) {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);
      const category = await AdminService.DeleteBanner(
        req.body,
        req.files,
        users?.sub
      );
      try {
        return res.status(httpStatus.OK).send({
          success: true,
          message: " Created successfully",
          data: category,
        });
      } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: error,
        });
      }
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "invalid Id!", data: [] });
    }
  });

  Add_Discount = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.AddDiscount(req.body, req.files);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Created successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  Remove_Discount = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.Remove_Discount(req.body, req.files);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Created successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
    try {
      const category = await AdminService.changeOrderStatus(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Created successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getAllOrder = catchAsync(async (req: Request, res: Response) => {
    try {
      const datafile: any[] = await AdminService.getAllOrder(
        req.body,
        req.files
      );
      for (let i = 0; i < datafile.length; i++) {
        let userarray = JSON.parse(datafile[i]?.USER_ORDER);
        let orderarray: any[] = [];
        for (let j = 0; j < userarray.length; j++) {
          let newrpid = JSON.parse(datafile[i].USER_ORDER)[j];
          let product = await mainService.getproductbyid(newrpid.product_id);
          newrpid.product_id = JSON.stringify(product);
          orderarray.push(newrpid);
        }
        datafile[i].USER_ORDER = orderarray;
      }

      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: datafile,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  post_productcolor = catchAsync(async (req: Request, res: Response) => {
    try {
      const checksizeduplicate: any = await AdminService.getProductColorbyname(
        req.body as any
      );
      if (checksizeduplicate) {
        return res
          .status(httpStatus.BAD_GATEWAY)
          .send(ApiStatus.errormsg("Color Already exist"));
      } else {
        const category = await AdminService.PostProductColor(
          req.body as any,
          req.file as any
        );
        return res.status(httpStatus.OK).send({
          success: true,
          message: " submitted successfully",
          data: category,
        });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_GATEWAY)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  put_productColor = catchAsync(async (req: Request, res: Response) => {
    try {
      // const checksizeduplicate: any = await AdminService.getProductColorbyname(req.body as any);
      // if (checksizeduplicate) {
      //   return res.status(httpStatus.BAD_GATEWAY).send(ApiStatus.errormsg("Color Already exist"))
      // }
      const category = await AdminService.UpdateProductColor(
        req.body as any,
        req.file as any
      );
      return res.status(httpStatus.OK).send({
        success: true,
        message: "updated  successfully",
        data: category,
      });
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_GATEWAY)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  put_product = catchAsync(async (req: Request, res: Response) => {
    const datafile = await AdminService.UpdateProduct(
      req.body as any,
      req.files as any
    );
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " updated  successfully",
        data: datafile,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  delete_productcolor = catchAsync(async (req: Request, res: Response) => {
    const category = await AdminService.deleteProductColor(req.query as any);
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " updated  successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  delete_product = catchAsync(async (req: Request, res: Response) => {
    try {
      const product = req.query;
      if (!product.PRODUCT_ID) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send(ApiStatus.errormsg("Product Id is required"));
      }
      const category = await AdminService.delete_product(req.query as any);
      return res.status(httpStatus.OK).send({
        success: true,
        message: " Deleted Successfully",
        data: category,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getAllCount = catchAsync(async (req: Request, res: Response) => {
    try {
      const countOrder = await AdminService.getOrderCount();
      const totalEarning = await AdminService.getEarningCount();
      const countSales = await AdminService.getSalesCount();
      const totalProfit = await AdminService.getOrderCount();
      const countPurches = await AdminService.getOrderCount();
      const recentOrders = await AdminService.getRecentOrders();
      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: {
          countOrder: countOrder,
          totalEarning: totalEarning,
          countSales: countSales,
          totalProfit: totalProfit,
          countPurches: countPurches,
          recentOrders: recentOrders,
        },
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getDashboardrder = catchAsync(async (req: Request, res: Response) => {
    try {
      const datafile: any[] = await AdminService.getDashboardrder();
      for (let i = 0; i < datafile.length; i++) {
        let userarray = JSON.parse(datafile[i]?.USER_ORDER);
        let orderarray: any[] = [];
        for (let j = 0; j < userarray.length; j++) {
          let newrpid = JSON.parse(datafile[i].USER_ORDER)[j];
          let product = await mainService.getproductbyid(newrpid.product_id);
          newrpid.product_id = JSON.stringify(product);
          orderarray.push(newrpid);
        }
        datafile[i].USER_ORDER = orderarray;
      }

      return res.status(httpStatus.OK).send({
        success: true,
        message: " fetched successfully",
        data: datafile,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  BulkProductUpload = catchAsync(async (req: Request, res: Response) => {
    try {
      const productcsv = req.body.productcsv;
      if (productcsv.length > 0) {
        productcsv.forEach(async (data: any, index: number) => {
          await AdminService.bulkupload(data);
        });
        return res
          .status(httpStatus.OK)
          .send(ApiStatus.successmsg("Product Uploaded Successfully!"));
      } else {
        return res
          .status(httpStatus.OK)
          .send(ApiStatus.errormsg("please ensert data to upload!"));
      }
    } catch (error: any) {
      return res.status(httpStatus.OK).send(ApiStatus.errormsg(error?.message));
    }
  });

  create_coupon = catchAsync(async (req: Request, res: Response) => {
    try {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);
      const data = await AdminService.createCoupon(req.body, req.file, users)
        .then(() => {
          return res.status(httpStatus.OK).send({
            success: true,
            message: "Coupon created successfully",
          });
        })
        .catch((err) => {
          return res.status(httpStatus.BAD_GATEWAY).send({
            success: false,
            message: "Failed to create coupon",
          });
        });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getCoupon = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.getCoupon(req);
      return res.status(httpStatus.OK).send({
        success: true,
        data,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  delCoupon = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.delCoupon(req.query);
      return res.status(httpStatus.OK).send({
        success: true,
        message: "Coupon Deleted Successfully",
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  CreateBrands = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkbrand = await AdminService.checkbrandbyname(
        req.body.BRAND_CODE
      );
      if (!checkbrand) {
        const data = await AdminService.CreateBrands(req);
        if (data) {
          return (
            res
              .status(httpStatus.OK)
              // .send(ApiStatus.successmsg("Brand Created Successfully"));
              .send({
                success: true,
                message: "Brand Created Succesfully",
                data: data,
              })
          );
        }
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Brand Already exist!" });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  getBrands = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.getBrands();
      if (data) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "success",
          data,
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Somthing went wrong!" });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  updateBrands = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.updateBrands(req);
      if (data) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "Brand updated Successfully",
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Somthing went wrong!" });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  delBrands = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.delBrands(req);
      if (data) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "Brand delted Successfully",
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Somthing went wrong!" });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  applyCoupon = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.applyCoupon(req.body);
      if (data) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "success",
          data,
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Somthing went wrong!" });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  expireCoupons = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await AdminService.expireCoupons(req);
      if (data) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "success",
          data,
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Somthing went wrong!" });
      }
    } catch (error: any) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: "Somthing went wrong!",
        data: error?.message,
      });
    }
  });
  updateCoupon = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users: any = jwt_decode(getheader);
    const data = await AdminService.updateCoupon(req.body, req.file, users);
    console.log(data);
    try {
      if (data) {
        return res.status(httpStatus.OK).send({
          success: true,
          message: "Coupon updated Successfully",
          data: data,
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: data,
        });
      }
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(ApiStatus.errormsg(error?.message));
    }
  });

  export_csv = catchAsync(async (req: Request, res: Response) => {
    try {
      const ExcelJS = require("exceljs");
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Product Sheet");
      sheet.columns = [
        { header: "CATEGORY_ID", key: "CATEGORY_ID", width: 20 },
        { header: "BRAND_ID", key: "BRAND_ID", width: 20 },
        { header: "PRODUCTSIZE_ID", key: "PRODUCTSIZE_ID", width: 20 },
        { header: "PRODUCTCOLOR_ID", key: "PRODUCTCOLOR_ID", width: 20 },
        { header: "PRODUCT_NAME", key: "PRODUCT_NAME", width: 20 },
        { header: "PRODUCT_QUANTITY", key: "PRODUCT_QUANTITY", width: 20 },
        {
          header: "PRODUCT_DESCRIPTION",
          key: "PRODUCT_DESCRIPTION",
          width: 20,
        },
        { header: "PRODUCT_IMAGE", key: "PRODUCT_IMAGE", width: 80 },
        { header: "PRODUCT_PRICE", key: "PRODUCT_PRICE", width: 20 },
        {
          header: "PRODUCT_DISCOUNTSTATUS",
          key: "PRODUCT_DISCOUNTSTATUS",
          width: 20,
        },
        { header: "PRODUCT_DISCOUNT", key: "PRODUCT_DISCOUNT", width: 20 },
        { header: "COMPANYCODE", key: "COMPANYCODE", width: 20 },
        { header: "WEIGHT", key: "WEIGHT", width: 20 },
        { header: "BRANCHNAME", key: "BRANCHNAME", width: 20 },
        { header: "TECHINFO", key: "TECHINFO", width: 20 },
        { header: "ADDITINFO", key: "ADDITINFO", width: 20 },
      ];

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "product.csv"
      );
      return workbook.xlsx.write(res).then(function () {
        res.status(httpStatus.OK).end();
      });
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  export_Category = catchAsync(async (req: Request, res: Response) => {
    try {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);

      const categoryList: any = await AdminService.CategoryPDF();
      let doc = new PDFDocument({ margin: 30, size: "A4" });
      doc.font("Helvetica-Bold");
      doc.fontSize(17);
      doc.text("Category List", { align: "center", underline: true });
      doc.fontSize(12);
      doc.text("please use In in bulk upload", { align: "center" });
      doc.text("  ", { align: "center" });
      let data: string[] = [];
      interface rowobject {
        category_id: any;
        category_name: any;
      }
      categoryList &&
        categoryList.forEach((item: any, index: number) => {
          const object: any = {
            category_id: item.CATEGORY_ID,
            category_name: {
              label: item.CATEGORY_NAME,
              options: { fontSize: 10 },
            },
            category_code: {
              label: item.CATEGORY_CODE,
              options: { fontSize: 10 },
            },
          };
          return data.push(object);
        });
      const table = {
        headers: [
          {
            label: "Category Id",
            property: "category_id",
            align: "center",
            renderer: null,
          },
          {
            label: "Category Name",
            property: "category_name",
            align: "center",
            renderer: null,
          },
          {
            label: "Category Code",
            property: "category_code",
            align: "center",
            renderer: null,
          },
        ],
        datas: data,
      };
      doc.table(table, {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (
          row: any,
          indexColumn: number,
          indexRow: any,
          rectRow: any,
          rectCell: any
        ) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
        align: "center",
      });
      doc.pipe(res);
      doc.end();
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  export_SubCategory = catchAsync(async (req: Request, res: Response) => {
    try {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);

      const categoryList: any = await AdminService.GetSubCategory();
      let doc = new PDFDocument({ margin: 30, size: "A4" });
      doc.font("Helvetica-Bold");
      doc.fontSize(17);
      doc.text("Sub Category List", { align: "center", underline: true });
      doc.fontSize(12);
      doc.text("please use In in bulk upload", { align: "center" });
      doc.text("  ", { align: "center" });
      let data: string[] = [];

      categoryList &&
        categoryList.forEach((item: any, index: number) => {
          const object: any = {
            subcategory_id: item.SUBCATEGORY_ID,
            category_name: item.CATEGORY_NAME,
            subcategory_name: item.SUBCATEGORY_NAME,
          };
          return data.push(object);
        });
      const table = {
        headers: [
          {
            label: "Sub Category Id",
            property: "subcategory_id",
            align: "center",
            renderer: null,
          },
          {
            label: "Category Name",
            property: "category_name",
            align: "center",
            renderer: null,
          },
          {
            label: "Sub Category Name",
            property: "subcategory_name",
            align: "center",
            renderer: null,
          },
        ],
        datas: data,
      };
      doc.table(table, {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (
          row: any,
          indexColumn: number,
          indexRow: any,
          rectRow: any,
          rectCell: any
        ) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
        align: "center",
      });
      doc.pipe(res);
      doc.end();
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  export_Brand = catchAsync(async (req: Request, res: Response) => {
    try {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);

      const brandlist: any = await AdminService.getBrands();
      let doc = new PDFDocument({ margin: 30, size: "A4" });
      doc.font("Helvetica-Bold");
      doc.fontSize(17);
      doc.text("Brand List", { align: "center", underline: true });
      doc.fontSize(12);
      doc.text("please use In in bulk upload", { align: "center" });
      doc.text("  ", { align: "center" });
      let data: string[] = [];

      brandlist &&
        brandlist.forEach((item: any, index: number) => {
          const object: any = {
            brand_id: item.BRAND_ID,
            brand_name: item.BRAND_NAME,
            brand_code: item.BRAND_CODE,
          };
          return data.push(object);
        });
      const table = {
        headers: [
          {
            label: "brand id",
            property: "brand_id",
            align: "center",
            renderer: null,
          },
          {
            label: "brand name",
            property: "brand_name",
            align: "center",
            renderer: null,
          },
          {
            label: "brand code",
            property: "brand_code",
            align: "center",
            renderer: null,
          },
        ],
        datas: data,
      };
      doc.table(table, {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (
          row: any,
          indexColumn: number,
          indexRow: any,
          rectRow: any,
          rectCell: any
        ) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
        align: "center",
      });
      doc.pipe(res);
      doc.end();
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  export_Color = catchAsync(async (req: Request, res: Response) => {
    try {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);

      const colorlist: any = await AdminService.GetProductColor();
      let doc = new PDFDocument({ margin: 30, size: "A4" });
      doc.font("Helvetica-Bold");
      doc.fontSize(17);
      doc.text("Product Color List", { align: "center", underline: true });
      doc.fontSize(12);
      doc.text("please use In in bulk upload", { align: "center" });
      doc.text("  ", { align: "center" });
      let data: string[] = [];

      colorlist &&
        colorlist.forEach((item: any, index: number) => {
          const object: any = {
            productcolor_id: item.PRODUCTCOLOR_ID,
            productcolor_name: item.PRODUCTCOLOR_NAME,
            productcolor_code: item.PRODUCTCOLOR_CODE,
          };
          return data.push(object);
        });
      const table = {
        headers: [
          {
            label: "Color id",
            property: "productcolor_id",
            align: "center",
            renderer: null,
          },
          {
            label: "Color Name",
            property: "productcolor_name",
            align: "center",
            renderer: null,
          },
          {
            label: "Color Code",
            property: "productcolor_code",
            align: "center",
            renderer: null,
          },
        ],
        datas: data,
      };
      doc.table(table, {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (
          row: any,
          indexColumn: number,
          indexRow: any,
          rectRow: any,
          rectCell: any
        ) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
        align: "center",
      });
      doc.pipe(res);
      doc.end();
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  export_Size = catchAsync(async (req: Request, res: Response) => {
    try {
      const getheader: any = req.header("authorization");
      const users: any = jwt_decode(getheader);
      const colorlist: any = await AdminService.GetProductSize();
      let doc = new PDFDocument({ margin: 30, size: "A4" });
      doc.font("Helvetica-Bold");
      doc.fontSize(17);
      doc.text("Product Size List", { align: "center", underline: true });
      doc.fontSize(12);
      doc.text("please use In in bulk upload", { align: "center" });
      doc.text("  ", { align: "center" });
      let data: string[] = [];
      colorlist &&
        colorlist.forEach((item: any, index: number) => {
          const object: any = {
            productsize_id: item.PRODUCTSIZE_ID,
            productsize_name: item.PRODUCTSIZE_NAME,
          };
          return data.push(object);
        });
      const table = {
        headers: [
          {
            label: "Size id",
            property: "productsize_id",
            align: "center",
            renderer: null,
          },
          {
            label: "Size",
            property: "productsize_name",
            align: "center",
            renderer: null,
          },
        ],
        datas: data,
      };
      doc.table(table, {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (
          row: any,
          indexColumn: number,
          indexRow: any,
          rectRow: any,
          rectCell: any
        ) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "white", 0.15);
        },
        align: "center",
      });
      doc.pipe(res);
      doc.end();
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  cloudimage = (req: Request, res: Response) => {
    try {
      const path: string = req.file?.path || "";
      const response: any[] = [
        {
          url: path,
        },
      ];

      console.log(response);

      return res.status(httpStatus.OK).send({
        success: false,
        message: "Success",
        data: custom_helpers.file_changepath(path),
      });
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  };

  GetCountry = catchAsync(async (req: Request, res: Response) => {
    try {
      const get_country: any = await CountryInstance.findAll({
        where: {
          ISDELETED: false,
        },
      });
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsgdata("success", get_country));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  PostCountry = catchAsync(async (req: Request, res: Response) => {
    try {
      const { COUNTRY_NAME, COUNTRY_CODE } = req.body;
      await CountryInstance.create({ COUNTRY_NAME, COUNTRY_CODE });
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("Country Inserted Successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  PostState = catchAsync(async (req: Request, res: Response) => {
    try {
      const { STATE_NAME, COUNTRY_ID } = req.body;
      await StateInstance.create({ STATE_NAME, COUNTRY_ID });
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("State Inserted Successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  PutCountry = catchAsync(async (req: Request, res: Response) => {
    try {
      const { COUNTRY_NAME, COUNTRY_CODE, COUNTRY_ID } = req.body;
      await CountryInstance.update(
        { COUNTRY_NAME, COUNTRY_CODE },
        { where: { COUNTRY_ID } }
      );
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("Country Inserted Successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  PutState = catchAsync(async (req: Request, res: Response) => {
    try {
      const { STATE_ID, STATE_NAME, COUNTRY_ID } = req.body;
      await StateInstance.update(
        { STATE_NAME, COUNTRY_ID },
        { where: { STATE_ID } }
      );
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("State Inserted Successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  DeleteCounrty = catchAsync(async (req: Request, res: Response) => {
    try {
      const id: any = req.query.id;
      await CountryInstance.update(
        {
          ISDELETED: true,
        },
        {
          where: {
            COUNTRY_ID: id,
          },
        }
      );
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("Deleted Successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  DeleteState = catchAsync(async (req: Request, res: Response) => {
    try {
      const id: any = req.query.id;
      await StateInstance.update(
        {
          ISDELETED: true,
        },
        {
          where: {
            STATE_ID: id,
          },
        }
      );
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsg("Deleted Successfully"));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });

  GetState = catchAsync(async (req: Request, res: Response) => {
    try {
      const get_country: any = await StateInstance.findAll({
        include: [
          {
            model: CountryInstance,
            attributes: ["COUNTRY_NAME", "COUNTRY_CODE"],
            where: {
              ISDELETED: false,
            },
          },
        ],
        where: {
          ISDELETED: false,
        },
      });
      return res
        .status(httpStatus.OK)
        .send(ApiStatus.successmsgdata("success", get_country));
    } catch (error: any) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: error.message, data: error });
    }
  });
}

export const AdminController = new AdminControllerClass();
