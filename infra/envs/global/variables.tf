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

