const CustomAPIError = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({msg:err.message})
  }
  return res.status(500).send("Something went wrong. Please try again")
};
