const core = require('@actions/core');
const fs = require('fs');
const AWS = require('aws-sdk');

async function writeToS3(bucket, filename, localFilePath, contentType, region) {
  // Configure AWS with the provided region.
  AWS.config.update({ region: region });
  const s3 = new AWS.S3();
  const contents = fs.createReadStream(localFilePath);
  const s3Params = {
    Bucket: bucket,
    Key: filename,
    Body: contents,
    ContentType: contentType
  };
  const options = {
    partSize: 25 * 1024 * 1024,
    queueSize: 5
  };
  return await s3.upload(s3Params, options).promise();
}

async function run() {
  try {
    // Get inputs defined in action.yml
    const bucket = core.getInput('bucket');
    const key = core.getInput('key');
    const file = core.getInput('file');
    const contentType = core.getInput('content-type');
    const region = core.getInput('region');

    // Perform the S3 upload.
    const result = await writeToS3(bucket, key, file, contentType, region);
    
    // Set the output (result.Location is the URL returned by AWS S3)
    core.setOutput('url', result.Location);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
