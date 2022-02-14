const express = require("express");
const cors = require("cors");
const videoRouter = require("./routes/videoRoutes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

app.use((req, res, next) => {
  console.log("Hello from the middleware 😊");
  next();
});

app.use("/api/v1/videos", videoRouter);

module.exports = app;
