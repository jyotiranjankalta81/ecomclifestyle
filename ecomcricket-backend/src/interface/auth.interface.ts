export interface UserAttributes {
    ID?: number;
    USERROLE: number;
    FULLNAME: string;
    MOBILENO: string;
    PROFILE_PIC?:string;
    EMAIL: String;
    PASSWORD: String;
    EMAILSTATUS: Boolean;
    ISDELETED: Boolean;
}

export interface RoleAttributes {
    ID?: number;
    ROLE: number;
    ISDELETED?: Boolean;
}




export interface OtpAttributes {
    OTP_ID?: number;
    USER_ID: number;
    OTP: string;
    ISDELETED?: Boolean;
}

export interface jwttoken {
    sub: number,
    role: number,
    iat: any,
    exp: any,
}
export interface resetinterface {
    RESET_ID?: number;
    EMAIL: any;
    RESET_OTP: string;
}

export interface userroleinterface {
    ID?: number;
    ROLE_ID?: number;
    ROLE_NAME: string;
    ROLE_DESC: string;
}

export interface ImageRequest extends Request {
    files: any;
}