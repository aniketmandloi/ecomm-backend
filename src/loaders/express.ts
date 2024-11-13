import { Express } from "express";
import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import envVars from "../config";

const sessionSecret = envVars.SESSION_SECRET;

export const expressLoader = (app: Express) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(express.json());

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Trust first proxy
  app.set("trust proxy", 1);

  // Creates a session
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app;
};
