const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMw = require("./middlewares/notFound");
// const errHandlerMw = require("./middlewares/errorHandler");
require("dotenv").config();
const itemRoute = require("./routes/Items");
const authRoute = require("./routes/user");
const commentRoute = require("./routes/Comment");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1", itemRoute, authRoute, commentRoute);

// app.use(errHandlerMw);
app.use(notFoundMw);

port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_LOCAL_URI);
    app.listen({ port }, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
