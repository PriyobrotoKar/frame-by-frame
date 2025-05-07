variable "env" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "app_name" {
  description = "Application name"
  type        = string
}

variable "api_lambda_invoke_arn" {
  description = "ARN of the Lambda function to be invoked by API Gateway"
  type        = string
}

variable "log_retention_days" {
  description = "Number of days to retain logs in CloudWatch"
  type        = number
  default     = 14
}
