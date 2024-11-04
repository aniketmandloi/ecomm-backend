import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const envVariables = z.object({
  SERVER_PORT: z.string(),
  SESSION_SECRET: z.string(),
  SALT_ROUNDS: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  GOOGLE_CONSUMER_KEY: z.string(),
  GOOGLE_CONSUMER_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  FACEBOOK_CONSUMER_KEY: z.string(),
  FACEBOOK_CONSUMER_SECRET: z.string(),
  FACEBOOK_CALLBACK_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const envVars = {
  PORT: process.env.SERVER_PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  GOOGLE_CONSUMER_KEY: process.env.GOOGLE_CONSUMER_KEY,
  GOOGLE_CONSUMER_SECRET: process.env.GOOGLE_CONSUMER_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  FACEBOOK_CONSUMER_KEY: process.env.FACEBOOK_CONSUMER_KEY,
  FACEBOOK_CONSUMER_SECRET: process.env.FACEBOOK_CONSUMER_SECRET,
  FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
};

export default envVars;
