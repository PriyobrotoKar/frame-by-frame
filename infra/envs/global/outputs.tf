output "video_transcoding_queue_arn" {
  value       = module.sqs.video_transcoding_queue_arn
  description = "ARN of the video transcoding SQS queue"
}

output "file_destroyer_queue_arn" {
  value       = module.sqs.file_destroyer_queue_arn
  description = "ARN of the file destroyer SQS queue"
}

output "temp_dev_bucket" {
  value       = module.s3.temp_dev_bucket
  description = "The temporary S3 bucket used for video uploads"
}

output "primary_dev_bucket" {
  value       = module.s3.primary_dev_bucket
  description = "The primary S3 bucket used for storage"
}

output "private_bucket" {
  value       = module.r2.private_bucket
  description = "The private R2 bucket used for storage"
}
