variable "app_name" {
  description = "The name of the application."
  type        = string
}

variable "env" {
  description = "The environment (e.g., dev, prod)."
  type        = string
}

variable "temp_bucket_arn" {
  description = "The ARN of the temporary S3 bucket used for video uploads."
  type        = string
}
