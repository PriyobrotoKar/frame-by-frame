variable "app_name" {
  description = "The name of the application."
  type        = string
}

variable "allowed_origins" {
  description = "The allowed origins for CORS configuration."
  type        = list(string)
}
