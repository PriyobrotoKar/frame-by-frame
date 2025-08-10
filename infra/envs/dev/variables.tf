variable "aws_region" {
  description = "The AWS region to deploy resources."
  type        = string
  default     = "ap-south-1"
}

variable "aws_profile" {
  description = "The AWS profile to use for authentication."
  type        = string
  default     = "framebyframe"
}

variable "app_name" {
  description = "The name of the application."
  type        = string
  default     = "framebyframe"
}

variable "ecr_repo" {
  description = "The ECR repository name."
  type        = string
  default     = "stage-framebyframe/api"
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

variable "cors_allow_origins" {
  description = "List of allowed origins for CORS"
  type        = list(string)
  default     = ["http://localhost:3000"]
}

variable "throttling_burst_limit" {
  description = "Throttling burst limit for API Gateway"
  type        = number
  default     = 200
}

variable "throttling_rate_limit" {
  description = "Throttling rate limit for API Gateway"
  type        = number
  default     = 1000
}
