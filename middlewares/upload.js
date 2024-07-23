const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3"); // Ensure multer-s3 is imported correctly
const path = require("path");
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${path.basename(file.originalname)}`);
    },
  }),
}).array('itemPictures', 10);

module.exports = upload;
