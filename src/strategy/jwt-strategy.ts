import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../model/AuthModel";

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

const jwtStrategy = new Strategy(opt, async (payload, done) => {
    const userData = await UserRepository.findById(payload.userId);

    const user = {
      id: userData?.id,
      role: userData?.role,
    } as User;

    if (user) {
      return done(null, user);
    } 

    return done(null, false);
  },
)

export { jwtStrategy };

  