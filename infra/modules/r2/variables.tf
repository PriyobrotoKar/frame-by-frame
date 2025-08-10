variable "app_name" {
  description = "The name of the application."
  type        = string
}

variable "allowed_origins" {
  description = "The allowed origins for CORS configuration."
  type        = list(string)
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID for R2 bucket."
  type        = string
}

