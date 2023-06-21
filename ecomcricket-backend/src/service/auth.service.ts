import { UserInstance } from "../model/user.model";
import bcrypt from "bcrypt";
import { UserAttributes } from "../interface/auth.interface";
import { SessionInstance } from "../model/session.model";
import {
  sessionInterface,
  UpdatesessionInterface,
} from "../interface/session.interface";
import { uuid } from "uuidv4";
import { ResetInstance } from "../model/resetpassword";
import { otpgenerator } from "../utils/randomnumber";
import { sendMail } from "../utils/sendMail";
import { resetpassword } from "../template/resetpasword";
import { OtpInstance } from "../model/otp.model";
import { RoleInstance } from "../model/userrole";

class UserServiceClass {
  GetuserbyEmail = async (EMAIL: string) => {
    const result = await UserInstance.findOne({
      where: {
        EMAIL: EMAIL,
      },
    });
    return result;
  };

  GetuserbyPhone = async (MOBILENO: string) => {
    const result = await UserInstance.findOne({
      where: {
        MOBILENO: MOBILENO,
      },
    });
    return result;
  };

  GetOtpuser = async (USER_ID: number) => {
    const result = await OtpInstance.findOne({
      where: {
        USER_ID: USER_ID,
      },
    });
    return result;
  };

  GetuserbyID = async (ID: number) => {
    const result = await UserInstance.findOne({
      where: {
        ID: ID,
      },
    });
    return result;
  };

  CreateUser = async (request: UserAttributes) => {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = bcrypt.hashSync(request.PASSWORD as string, salt);
    const result = await UserInstance.create({
      USERROLE: 1,
      FULLNAME: request.FULLNAME,
      MOBILENO: request.MOBILENO,
      PROFILE_PIC:'defaults/images/profilepic.png',
      EMAIL: request.EMAIL,
      PASSWORD: hashedpassword,
      EMAILSTATUS: false,
      ISDELETED: false,
    });
    return result;
  };

  LoginUser = async (EMAIL: string, PASSWORD: string, COMPPASSWORD: string) => {
    const comparepassword = bcrypt.compare(PASSWORD, COMPPASSWORD);
    return comparepassword;
  };

  CresteSession = async (request: sessionInterface) => {
    const salt = await bcrypt.genSalt(10);
    const result = await SessionInstance.create({
      SESSION_ID: uuid(),
      USERAGENT: request.USERAGENT,
      UERIP: request.UERIP,
      USERID: request.USERID,
      SESSION_STATUS: true,
    });
    return result;
  };

  CloseOldSession = async (request: UpdatesessionInterface) => {
    const salt = await bcrypt.genSalt(10);
    const result = await SessionInstance.update(
      {
        SESSION_STATUS: false,
      },
      {
        where: {
          USERID: request.USERID,
        },
      }
    );
    return result;
  };

  checkotp = async (EMAIL: string) => {
    const result = await ResetInstance.findOne({
      where: {
        EMAIL: EMAIL,
      },
    });
    return result;
  };

  createOpt = async (EMAIL: string) => {
    const result = "";
    const resetotp = otpgenerator(6);
    await ResetInstance.create({
      EMAIL: EMAIL,
      RESET_OTP: resetotp,
    }).then(async (res) => {
      const nodemail = await sendMail(
        EMAIL,
        "GCMSBuddy - Reset Password Request",
        "",
        resetpassword(resetotp)
      );
      return nodemail;
    });
    return result;
  };

  CreateUserOtp = async (USER_ID: number) => {
    let result: any;
    const resetotp = otpgenerator(6);
    result = await OtpInstance.create({
      USER_ID: USER_ID,
      OTP: resetotp,
    });
    return resetotp;
  };

  UpdateUserOtp = async (USER_ID: number) => {
    let result: any;
    const resetotp = otpgenerator(6);
    result = await OtpInstance.update(
      {
        OTP: resetotp,
      },
      {
        where: {
          USER_ID: USER_ID,
        },
      }
    );
    return resetotp;
  };

  updateOpt = async (EMAIL: string) => {
    const result = "";
    const resetotp = otpgenerator(6);
    await ResetInstance.update(
      {
        RESET_OTP: resetotp,
      },
      {
        where: {
          EMAIL: EMAIL,
        },
      }
    ).then(async (res) => {
      const nodemail = await sendMail(
        EMAIL,
        "quality cricket - Reset Password Request",
        "",
        resetpassword(resetotp)
      );
      return nodemail;
    });
    return result;
  };

  getUser = async (req: any, user: any) => {
    const result = await UserInstance.findOne({
      where: {
        ID: user.sub,
      },
    });
    return result;
  };

  getUsers = async (req: any, user: any) => {
    const result = await UserInstance.findAll({});
    return result;
  };

  updateUser = async (req: any, user: any) => {
    const result = await UserInstance.update(
      {
        FULLNAME: req.FULLNAME,
        MOBILENO: req.MOBILENO,
        EMAIL: req.EMAIL,
      },
      {
        where: {
          ID: user.sub,
        },
      }
    );
    return result;
  };
}

export const UserService = new UserServiceClass();
