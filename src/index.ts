import express from "express";

const app = express();

async function startServer() {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

startServer();
