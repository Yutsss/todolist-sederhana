import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserRepository } from "../repository/UserRepository";
import { AuthRequest, User } from "../model/AuthModel";

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
};

const googleStrategy = new GoogleStrategy(googleConfig, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails![0].value;
    const existingUser = await UserRepository.findByEmail(email);
    let user: User;

    if (!existingUser) {
      const newUser = await UserRepository.create(
        email,
        "",
        profile.displayName,
        profile.id
      );

      user = {
        id: newUser.id,
        role: newUser.role
      }
    } else {
      if (!existingUser.googleId) {
        await UserRepository.findByIdAndUpdate(existingUser.id, {
          googleId: profile.id,
        });
      }

      user = {
        id: existingUser.id,
        role: existingUser.role
      }
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export { googleStrategy };