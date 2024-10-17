import { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const expressLoader = (app: Express) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // Trust first proxy
  app.set("trust proxy", 1);

  return app;
};
