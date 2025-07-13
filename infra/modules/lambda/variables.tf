variable "env" {
  description = "The environment for the Lambda function (e.g., dev, prod)."
  type        = string
}

variable "aws_region" {
  description = "The AWS region to deploy resources."
  type        = string
  default     = "ap-south-1"
}
variable "ecr_repo" {
  description = "The ECR repository name."
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
}

variable "image_tag" {
  description = "The image tag for the Lambda function."
  type        = string
  default     = ":latest"
}

variable "log_retention_days" {
  description = "The number of days to retain logs in CloudWatch."
  type        = number
  default     = 14
}

variable "env_vars" {
  description = "Environment variables to pass to the Lambda function."
  type        = map(string)
  default     = {}
}

variable "backend_api_url" {
  description = "Backend API URL"
  type        = string
}

variable "api_gateway_execution_arn" {
  description = "API Gateway execution ARN"
  type        = string
}

variable "video_transcoding_queue_arn" {
  description = "The ARN of the SQS queue for video transcoding."
  type        = string
}

variable "file_destroyer_queue" {
  description = "The ARN of the SQS queue for video transcoding."
  type        = map(string)
}

variable "ecs_cluster_arn" {
  description = "The ARN of the ECS cluster."
  type        = string
}

variable "ecs_task_definition_arn" {
  description = "The ARN of the ECS task definition."
  type        = string
}

variable "ecs_task_role_arn" {
  description = "The ARN of the ECS task role."
  type        = string
}

variable "ecs_execution_role_arn" {
  description = "The ARN of the ECS execution role."
  type        = string
}

variable "private_bucket" {
  description = "The private R2 bucket used for storage."
  type = object({
    name = string
  })
}

variable "primary_bucket" {
  description = "The primary S3 bucket used for storage."
  type = object({
    name = string
    arn  = string
  })
}

variable "temp_bucket" {
  description = "The temp S3 bucket used for video storage."
  type = object({
    name = string
    arn  = string
  })
}
