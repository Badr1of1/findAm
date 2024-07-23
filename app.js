const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const notFoundMw = require("./middlewares/notFound");
// const errHandlerMw = require("./middlewares/errorHandler");
require("dotenv").config();

const itemRoute = require("./routes/Items");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/Comment");

const allowedOrigins = ["http://localhost:5173", "https://findam.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
    },
  })
);

// app.use(cors({origin:'http://localhost:5173'}));
app.use("/uploads", express.static("uploads"));
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1", itemRoute, userRoute, commentRoute);

// app.use(errHandlerMw);
app.use(notFoundMw);

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
