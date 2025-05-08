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
