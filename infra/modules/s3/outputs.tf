output "primary_dev_bucket" {
  value = {
    arn  = aws_s3_bucket.primary_dev_bucket.arn
    name = aws_s3_bucket.primary_dev_bucket.id
  }
  description = "The primary S3 bucket used for storage"
}

output "temp_dev_bucket" {
  value = {
    arn  = aws_s3_bucket.temp_dev_bucket.arn
    name = aws_s3_bucket.temp_dev_bucket.id
  }
  description = "Name of the temporary S3 bucket used for video uploads"
}
