output "video_transcoding_queue_arn" {
  value       = module.sqs.video_transcoding_queue_arn
  description = "ARN of the video transcoding SQS queue"
}

output "temp_bucket_arn" {
  value       = module.s3.temp_dev_bucket
  description = "ARN of the temporary S3 bucket used for video uploads"
}

output "primary_bucket_arn" {
  value       = module.s3.primary_dev_bucket
  description = "ARN of the primary S3 bucket used for video storage"
}

output "primary_bucket_name" {
  value       = module.s3.primary_bucket_name
  description = "Name of the primary S3 bucket used for video storage"
}
