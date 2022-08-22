export default {
  secret: process.env.JWT_SECRET || "mysecret",
  expiresIn: "90 days",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
  refreshExpiresIn: "7d",
  awsS3UploadEnabled: Boolean(process.env.FILE_SUBMISSION_TO_AWS_S3_ENABLED),
};
