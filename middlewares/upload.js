const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const multer = require("multer");
require("dotenv").config();

const upload = multer({
  storage: multer.memoryStorage(),
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async (file) => {
  const key = `${uuidv4()}-${file.originalname}`;

  const buffer = await sharp(file.buffer).toBuffer();

  console.log("Bucket:", process.env.AWS_BUCKET_NAME); // Debug line

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to upload file to S3");
  }
};

module.exports = { upload, uploadToS3 };
