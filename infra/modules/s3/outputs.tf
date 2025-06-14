output "temp_dev_bucket" {
  value       = aws_s3_bucket.temp_dev_bucket.arn
  description = "ARN of the temporary S3 bucket used for video uploads"
}

output "primary_dev_bucket" {
  value       = aws_s3_bucket.primary_dev_bucket.arn
  description = "ARN of the primary S3 bucket used for video storage"
}

output "primary_bucket_name" {
  value       = aws_s3_bucket.primary_dev_bucket.id
  description = "Name of the primary S3 bucket used for video storage"
}
