import passport from 'passport'
import jwt_decode from "jwt-decode";
import { NextFunction, Request, Response } from 'express'
import { jwttoken } from '../interface/auth.interface';
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError';

const verifyCallback = (req: Request, resolve: any, reject: any, requiredRights: any[]) => async (err: any, user: any, info: any) => {
    // if (err || info || !user) {
    //     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    // }    
    // const getheader: any = req.header("authorization");
    // const users = jwt_decode<jwttoken>(getheader);    
    // const userRights = get_accessrights(users.role, requiredRights[0]);
    // userRights.then((data: any) => {
    //     if (data) {
    //         return resolve();
    //     }
    //     reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    // })
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    resolve();
};
export const auth = (...requiredRights: any[]) => async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

