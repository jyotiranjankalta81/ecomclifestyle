import { Request, Response } from "express";
import httpStatus from "http-status";
import { mainService } from "../service/main.service";
import { catchAsync } from "../utils/catchAsync";
import { generateAuthTokens } from "../utils/tokens";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import qs from "querystring";
import ApiStatus from "../utils/apistatus";
const stripe = require("stripe")(
  "sk_test_51L2wFuSIakMfogRlbY0t1gPUKf7bbZyMkEdWELrX98T6LsBPeOV2Y0R4BkEDWBo7v4sCJ98x5aQBjtqPjsCk7FB400v9cTQOMM"
);

class MainControllerClass {
  get_cart = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.GetCart(req.body as any, users as any);
    try {
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

  create_cart = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const getcartbyPID = await mainService.getcartbyPID(
      req.body as any,
      users as any
    );

    if (!getcartbyPID) {
      const datafile = await mainService.Create_Cart(
        req.body as any,
        users as any
      );
      try {
        return res.status(httpStatus.OK).send({
          success: true,
          message: " inserted  successfully",
          data: datafile,
        });
      } catch (error) {
        console.log(error);
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: error,
        });
      }
    } else {
      const datafile = await mainService.update_CartbyPID(
        req.body as any,
        users as any,
        getcartbyPID as any
      );
      try {
        return res.status(httpStatus.OK).send({
          success: true,
          message: " updated  successfully",
          data: datafile,
        });
      } catch (error) {
        console.log(error);
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: error,
        });
      }
    }
  });

  update_cart = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const getcartbyID = await mainService.getCartById(
      req.body as any,
      users as any
    );
    if (getcartbyID) {
      const datafile = await mainService.update_cart(
        req.body as any,
        users as any
      );
      try {
        return res.status(httpStatus.OK).send({
          success: true,
          message: " updated  successfully",
          data: datafile,
        });
      } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: error,
        });
      }
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: "invalid id!",
        data: [],
      });
    }
  });

  delete_cart = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const getcartbyID = await mainService.getCartById(
      req.query as any,
      users as any
    );
    if (getcartbyID) {
      const datafile = await mainService.delete_cart(
        req.query as any,
        users as any
      );
      try {
        return res.status(httpStatus.OK).send({
          success: true,
          message: " updated  successfully",
          data: datafile,
        });
      } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "Somthing went wrong!",
          data: error,
        });
      }
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: "invalid id!",
        data: [],
      });
    }
  });

  get_order = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    var datafile = await mainService.get_order(req.body as any, users as any);
    for (let i = 0; i < datafile.length; i++) {
      let userarray = JSON.parse(datafile[i].USER_ORDER);
      let orderarray: any[] = [];
      for (let j = 0; j < userarray.length; j++) {
        let newrpid = JSON.parse(datafile[i].USER_ORDER)[j];
        let product = await mainService.getproductbyid(newrpid.product_id);
        newrpid.product_id = JSON.stringify(product);
        orderarray.push(newrpid);
      }
      datafile[i].USER_ORDER = orderarray;
    }
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " inserted  successfully",
        data: datafile,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  create_order = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.create_order(
      req.body as any,
      users as any
    );
    const clearcart = await mainService.clear_cart(users as any);
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " inserted  successfully",
        data: datafile,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  create_session = catchAsync(async (req: Request, res: Response) => {


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'apiOperation': 'INITIATE_CHECKOUT',
        'apiPassword': "b78feb6ae32a8bc67f65305510cb3545", // replace with your password or provide the value directly
        'apiUsername': `merchant.TESTQUALITYCRKET`, // replace with your merchant ID
        'merchant': "TESTQUALITYCRKET", // replace with your merchant ID
        'interaction.operation': 'PURCHASE',
        'interaction.merchant.name': "TEST QUALITYCRKET",
        'interaction.returnUrl': req.body.RESPONSE_URL, // replace with your merchant name
        'order.id': req.body.ORDER_ID, // replace with your unique order ID
        'order.amount': req.body.AMOUNT,
        'order.currency': 'AED',
        'order.description': "New Order" // replace with the description of your order
      })
    };
    axios.post('https://rakbankpay.gateway.mastercard.com/api/nvp/version/65', requestOptions.body, {
      headers: requestOptions.headers,
    })
      .then(function (result:any) {
        console.log(result);
        
        const Response = qs.parse(result.data);
        return res.status(httpStatus.OK).send({
          success: true,
          message: "Created  successfully",
          data:Response['session.id'] ,
        });   
      })
      .catch(function (error:any) {
        return res.status(httpStatus.BAD_REQUEST).send({ success: false, message: "Somthing went wrong!", data: error });
      })
  
  });

  contact = catchAsync(async (req: Request, res: Response) => {
    const datafile = await mainService.contact(req.body as any, res as any);
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " submitted  successfully",
        data: datafile,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  get_contact = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.get_contact(
      req.body as any,
      users as any
    );
    try {
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

  addAddress = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.addAddress(
      req.body as any,
      users as any
    );
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " submitted  successfully",
        data: datafile,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getAddress = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.getAddress(
      req.body as any,
      users as any
    );
    try {
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

  getRatingReview = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.getRatingReview(
      req.body as any,
      users as any
    );
    try {
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

  updateAddress = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.updateAddress(
      req.body as any,
      users as any
    );
    try {
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

  deleteAddress = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const header: any = req.query;
    const datafile = await mainService.deleteAddress(header);
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " deleted successfully",
        data: datafile,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  addRatingReview = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await mainService.addRatingReview(
      req.body as any,
      users as any
    );
    try {
      return res.status(httpStatus.OK).send({
        success: true,
        message: " submitted  successfully",
        data: datafile,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  createNotification = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await mainService.createNotification(req.body);

      return res.status(httpStatus.OK).send({
        success: true,
        message: "Notification created successfully",
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getNotification = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await mainService.getNotification(req);

      return res.status(httpStatus.OK).send({
        success: true,
        message: "Success",
        data,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });


  Produectsearch = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await mainService.Produectsearch(req.body);

      return res.status(httpStatus.OK).send({
        success: true,
        message: "Success",
        data,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });


  update_payment = catchAsync(async (req: Request, res: Response) => {
    try {

      const checkpayment : any = mainService.checkpayment(req.body.ORDER_REFNO);
      if(typeof checkpayment !== 'undefined' && checkpayment.length === 0){
        return res.status(httpStatus.OK).send(ApiStatus.errormsg("Aayment Already complete!"))
      }
      const data = await mainService.update_payment(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: "Success",
        data,
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  updateNotification = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await mainService.updateNotification(req);

      return res.status(httpStatus.OK).send({
        success: true,
        message: "Updated Successfully",
      });
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  filter_product = catchAsync(async (req: Request, res: Response) => {
    try {
      const data = await mainService.getFilteredProduct(req.body);
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




  
}

export const MainController = new MainControllerClass();
