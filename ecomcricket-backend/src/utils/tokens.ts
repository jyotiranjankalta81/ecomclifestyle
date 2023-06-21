import jwt from 'jsonwebtoken'
import moment from 'moment'
import { config } from '../config/config';




const generateToken = (userId: number, userRole: number, expires: any, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    role: userRole,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

export const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.ID, user.USERROLE, accessTokenExpires);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate().toISOString(),
    },
  };
};

