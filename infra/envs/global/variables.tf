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

variable "allowed_origins" {
  description = "The allowed origins for CORS configuration."
  type        = list(string)
  default     = ["http://localhost:3000", "https://frame-by-frame-course-dev.vercel.app"]
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
  sensitive   = true
}

