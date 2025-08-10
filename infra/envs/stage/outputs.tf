output "api_gateway_url" {
  description = "The URL of the API Gateway"
  value       = module.api-gateway.invoke_url
}
