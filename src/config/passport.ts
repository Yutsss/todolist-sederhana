import passport from "passport";
import { jwtStrategy } from "../strategy/jwt-strategy";
import { googleStrategy } from "../strategy/google-strategy";

passport.use('jwt', jwtStrategy);
passport.use('google', googleStrategy);

export { passport };