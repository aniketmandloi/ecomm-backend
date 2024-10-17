import express from "express";
import envVars from "./config";

const app = express();

const serverPort = envVars.PORT;

async function startServer() {
  app.listen(serverPort, () => {
    console.log(`🚀 Server is running on port ${serverPort}`);
  });
}

startServer();
