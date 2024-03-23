const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const itemRoute = require("./routes/Items");

app.use(express.json());
app.use("/api/v1", itemRoute);

port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen({ port }, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
