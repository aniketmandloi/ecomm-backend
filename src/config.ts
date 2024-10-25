import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const envVariables = z.object({
  SERVER_PORT: z.string(),
  SESSION_SECRET: z.string(),
  SALT_ROUNDS: z.string(),
  STRIPE_SECRET_KEY: z.string(),
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
};

export default envVars;
