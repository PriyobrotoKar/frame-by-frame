output "ecr_repository_url" {
  description = "The URL of the ECR repository"
  value       = module.lambda.ecr_repository_url
}

output "ecr_repository" {
  description = "The URL of the ECR repository"
  value       = module.lambda.ecr_repository
}

output "api_gateway_url" {
  description = "The URL of the API Gateway"
  value       = module.api-gateway.invoke_url
}
