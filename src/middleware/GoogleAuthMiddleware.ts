import { passport } from "../config/passport";

export class GoogleAuthMiddleware {
  static concern = passport.authenticate('google', {
    session: false,
    scope: [
      'profile',
      'email'
    ] 
  });
  static callback = passport.authenticate('google', {
    session: false,
  });
}