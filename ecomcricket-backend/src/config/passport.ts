import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../service/auth.service';
import { config } from './config';


const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    const user = await UserService.GetuserbyID(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};
export const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

