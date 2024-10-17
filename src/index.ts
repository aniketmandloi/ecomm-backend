import express from "express";
import envVars from "./config";
import cors from "cors";

const app = express();

const serverPort = envVars.PORT;

async function startServer() {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.listen(serverPort, () => {
    console.log(`🚀 Server is running on port ${serverPort}`);
  });
}

startServer();
