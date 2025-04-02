# Upload to S3 using AWS CLI GitHub Action

This GitHub Action uploads files or directories to an AWS S3 bucket using the AWS CLI. It supports uploading individual files or entire directories, with an option to zip directories before uploading.

---

## Features

- **Upload Files or Directories**: Upload files or entire directories to an S3 bucket.
- **Optional Zipping**: Automatically zip directories before uploading.
- **Custom S3 Key**: Specify the S3 keys (paths) where the files/directories should be uploaded.
- **AWS Credentials**: Securely pass AWS credentials using GitHub Secrets.

---

## Usage

### Inputs

| Input Name               | Description                                                              | Required | Default Value     |
|--------------------------|--------------------------------------------------------------------------|----------|-------------------|
| `aws-access-key-id`      | AWS Access Key ID for authentication.                                    | Yes      | -                 |
| `aws-secret-access-key`  | AWS Secret Access Key for authentication.                                | Yes      | -                 |
| `aws-region`             | AWS Region where the S3 bucket is located.                               | Yes      | `us-east-1`       |
| `s3-bucket`              | Name of the S3 bucket to upload to.                                      | Yes      | -                 |
| `local-path`             | Comma-separated list of local paths to upload                            | Yes      | -                 |
| `s3-key`                 | Comma-separated list of S3 keys (paths) to upload to                     | Yes      | -                 |
| `zip-before-upload`      | Whether to zip the directory before uploading. Set to `true` or `false`. | No       | `false`           |

---

## Example Workflow

### Upload a File to S3

```yaml
name: Upload File to S3
on: [push]

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Upload to S3 using AWS CLI
        uses: CoreLoopGames/s3-upload-action@cli
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: 'us-east-1'
          s3-bucket: 'your-s3-bucket-name'
          local-path: 'path/to/your/file.txt'
          s3-key: 'path/in/s3/file.txt'
