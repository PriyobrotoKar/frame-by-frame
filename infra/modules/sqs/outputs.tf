output "video_transcoding_queue_arn" {
  value       = aws_sqs_queue.video_transcoding_queue.arn
  description = "ARN of the video transcoding SQS queue"
}

output "file_destroyer_queue" {
  value = {
    arn = aws_sqs_queue.file_destroyer_queue.arn
    url = aws_sqs_queue.file_destroyer_queue.id
  }
  description = "ARN of the file destroyer SQS queue"
}
