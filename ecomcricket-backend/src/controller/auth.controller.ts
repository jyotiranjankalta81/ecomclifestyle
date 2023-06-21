import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserService } from "../service/auth.service";
import { catchAsync } from "../utils/catchAsync";
import { generateAuthTokens } from "../utils/tokens";
import { registerValidation } from "../validation/AuthValidation";
import jwt_decode from "jwt-decode";

class AuthControllerClass {
  CreateUser = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkuser: any = await UserService.GetuserbyEmail(
        req.body.EMAIL as string
      );
      if (checkuser)
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "email is already in use",
          data: [],
        });
      const createuser: any = await UserService.CreateUser(req.body);
      return res.status(httpStatus.OK).send({
        success: true,
        message: "User created successfully",
        data: createuser,
      });
    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: e });
    }
  });

  ForgotPassword = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkuser: any = await UserService.GetuserbyEmail(
        req.body.EMAIL as string
      );
      if (checkuser) {
        const checkotp = await UserService.checkotp(req.body.EMAIL as string);
        if (checkotp) {
          const createotp = await UserService.updateOpt(
            req.body.EMAIL as string
          );
          return res.status(httpStatus.OK).send({
            success: true,
            message: "Requested successfully",
            data: createotp,
          });
        } else {
          const createotp = await UserService.createOpt(
            req.body.EMAIL as string
          );
          return res.status(httpStatus.OK).send({
            success: true,
            message: "Requested successfully",
            data: createotp,
          });
        }
      } else {
        return res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          message: "no User Found With this email",
          data: [],
        });
      }
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  LoginUser = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkuser: any = await UserService.GetuserbyEmail(
        req.body.EMAIL as string
      );
      if (!checkuser)
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "user dosenot exist!!", data: [] });

      const loginuserdata: any = await UserService.LoginUser(
        req.body.EMAIL as string,
        req.body.PASSWORD as string,
        checkuser.PASSWORD
      );
      if (!loginuserdata)
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "invalid passowrd", data: [] });
      const tokens = await generateAuthTokens(checkuser.dataValues);
      if (tokens) {
        const closesession = await UserService.CloseOldSession({
          USERID: checkuser.dataValues.ID,
        });
        const insertsession = await UserService.CresteSession({
          USERAGENT: req.get("user-agent"),
          UERIP: req.ip,
          USERID: checkuser.dataValues.ID,
          SESSION_STATUS: true,
        });
        if (insertsession) {
          return res.status(httpStatus.OK).send({
            success: true,
            message: "login successful",
            data: {
              email: checkuser.dataValues.EMAIL,
              sessionid: insertsession.SESSION_ID,
              userrole: checkuser.dataValues.USERROLE,
              tokens: tokens,
            },
          });
        }
      }
    } catch (e) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: e });
    }
  });

  LoginWithOtp = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkuser: any = await UserService.GetuserbyPhone(
        req.body.PHONENO as string
      );

      if (!checkuser) {
        const userobj: any = {
          FULLNAME: req.body.PHONENO,
          MOBILENO: req.body.PHONENO,
          EMAIL: "",
          PASSWORD: "12345",
        };
        const createuser: any = await UserService.CreateUser(userobj);
        if (createuser) {
          const createotp: any = await UserService.CreateUserOtp(createuser.ID);
          return res.status(httpStatus.OK).send({
            success: true,
            message: "Otp Send successfully",
            data: {
              opt: createotp,
            },
          });
        }
      } else {
        const createotp: any = await UserService.UpdateUserOtp(checkuser.ID);
        return res.status(httpStatus.OK).send({
          success: true,
          message: "Otp Send successfully",
          data: {
            opt: createotp,
          },
        });
      }
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  verifyOtp = catchAsync(async (req: Request, res: Response) => {
    try {
      const checkuser: any = await UserService.GetuserbyPhone(
        req.body.PHONENO as string
      );
      if (checkuser) {
        const getotpuser: any = await UserService.GetOtpuser(
          checkuser.ID as number
        );
        if (getotpuser) {
          if (getotpuser.OTP === req.body.OTP) {
            const tokens = await generateAuthTokens(checkuser);
            if (tokens) {
              const closesession = await UserService.CloseOldSession({
                USERID: checkuser.ID,
              });
              const insertsession = await UserService.CresteSession({
                USERAGENT: req.get("user-agent"),
                UERIP: req.ip,
                USERID: checkuser.dataValues.ID,
                SESSION_STATUS: true,
              });
              if (insertsession) {
                return res.status(httpStatus.OK).send({
                  success: true,
                  message: "login successful",
                  data: {
                    email: checkuser.dataValues?.EMAIL,
                    sessionid: insertsession.SESSION_ID,
                    userrole: checkuser.dataValues.USERROLE,
                    tokens: tokens,
                  },
                });
              }
            }
          } else {
            return res
              .status(httpStatus.BAD_REQUEST)
              .send({ success: false, message: "invalid otp!", data: [] });
          }
        }
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ success: false, message: "Somthing went wrong!", data: [] });
      }
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ success: false, message: "Somthing went wrong!", data: error });
    }
  });

  getUser = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await UserService.getUser(req.body as any, users as any);
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

  getUsers = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await UserService.getUsers(req.body as any, users as any);
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

  updateUser = catchAsync(async (req: Request, res: Response) => {
    const getheader: any = req.header("authorization");
    const users = jwt_decode(getheader);
    const datafile = await UserService.updateUser(
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
}

export const AuthController = new AuthControllerClass();
