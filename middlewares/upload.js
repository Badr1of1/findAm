const aws = require("aws-sdk");
const multer = require("multer");
const path = require("path");
require('dotenv').config();

const s3 = aws.config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secreteAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
});


// const storage = multerS3({
//   s3:s3,
//   bucket: 'badrak',
//   acl: 'public read',
//   metadata: function(req, file, cb){
//     cb(null, {fieldName: file.fieldname})
//   },
//   key: function(req, file, cb){
//     cb(null,`${Date.now().toString()}-${path.basename(file.originalname)}`)
//   }
// })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
//   },
// });

//multer instance
// const upload = multer({ storage: storage });

module.exports = upload;
