import express from "express";
import envVars from "./config";
import { loaders } from "./loaders";

const app = express();

const serverPort = envVars.PORT;

async function startServer() {
  // Init application loaders
  loaders(app);

  app.listen(serverPort, () => {
    console.log(`🚀 Server is running on port ${serverPort}`);
  });
}

startServer();
