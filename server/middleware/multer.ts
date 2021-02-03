import multer from 'multer';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import awsS3Key from './aws.json';

const s3 = new AWS.S3({
  accessKeyId:awsS3Key.KeyId,
  secretAccessKey:awsS3Key.key,
  region: awsS3Key.region
})

const storage = multerS3({
  s3:s3,
  bucket:'namspostitserver',
  contentType: multerS3.AUTO_CONTENT_TYPE,
})

const upload = multer({storage:storage});

export default upload;