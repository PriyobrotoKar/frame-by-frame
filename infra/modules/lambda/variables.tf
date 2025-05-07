variable "env" {
  description = "The environment for the Lambda function (e.g., dev, prod)."
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

variable "api_gateway_execution_arn" {
  description = "API Gateway execution ARN"
  type        = string
}
