import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import { AuthService } from "../services/AuthService";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { Strategy as FacebookStrategy } from "passport-facebook";
import envVars from "../config";

export const passportLoader = (app: Express) => {
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Set method to serialize data to store in cookie
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  // Configure strategy to be use for local login
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await AuthService.login({
          email: username,
          password,
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Configure strategy to be use for Google login
  passport.use(
    new GoogleStrategy(
      {
        clientID: envVars.GOOGLE_CONSUMER_KEY,
        clientSecret: envVars.GOOGLE_CONSUMER_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthService.googleLogin(profile);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Configure strategy to be use for Google login
  passport.use(
    new FacebookStrategy(
      {
        clientID: envVars.FACEBOOK_CONSUMER_KEY,
        clientSecret: envVars.FACEBOOK_CONSUMER_SECRET,
        callbackURL: envVars.FACEBOOK_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthService.facebookLogin(profile);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  return passport;
};
