const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const lost = require("./routes/Items");

app.use(express.json());
app.use("/api/v1/lost", lost);

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
