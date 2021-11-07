const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

const s3 = new aws.S3({
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  signatureVersion: "v4",
});

module.exports.generateUploadURL = async function () {
  const rawBytes = await randomBytes(16);
  const filename = rawBytes.toString("hex");

  const params = {
    Bucket: process.env.bucketName,
    Key: filename,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};
