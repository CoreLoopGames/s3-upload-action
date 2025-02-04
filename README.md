# S3 Upload Action

A custom GitHub Action that uploads a file to AWS S3 using the AWS SDK's `upload()` method. This action reads a local file, uploads it to the specified S3 bucket with the given key, and returns the URL of the uploaded file as an output.

## Features

- Uses AWS SDK’s managed upload method to handle large files via multipart upload.
- Configurable inputs for bucket, key, file path, content type, and region.
- Outputs the S3 URL of the uploaded file.
- Designed to be used as a standalone GitHub Action.

## Inputs

| Input         | Description                                                        | Required | Default                      |
|---------------|--------------------------------------------------------------------|----------|------------------------------|
| `bucket`      | The name of the S3 bucket.                                         | Yes      | —                            |
| `key`         | The destination key (file name/path) in S3.                        | Yes      | —                            |
| `file`        | The local file path to upload.                                     | Yes      | —                            |
| `content-type`| The MIME content type of the file (e.g., `application/octet-stream`). | No       | `application/octet-stream`   |
| `region`      | The AWS region to use.                                             | No       | `us-east-1`                  |

## Outputs

| Output | Description                                        |
|--------|----------------------------------------------------|
| `url`  | The URL of the uploaded file in S3.                |

## Usage

Below is an example workflow that uses this action:

```yaml
jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Upload file to S3
        id: s3upload
        uses: yourusername/s3-upload-action@v1
        with:
          bucket: ${{ secrets.AWS_S3_BUCKET }}
          key: 'client-apk/WorldEternal.apk'
          file: 'lm_client/WorldEternal/WorldEternal.apk'
          content-type: 'application/vnd.android.package-archive'
          region: 'us-east-1'
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Display uploaded URL
        run: echo "File uploaded to ${{ steps.s3upload.outputs.url }}"
