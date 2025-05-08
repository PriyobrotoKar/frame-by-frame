output "invoke_url" {
  description = "Invoke URL for the API Gateway"
  value       = aws_api_gateway_stage.api_stage.invoke_url
}

output "api_gateway_execution_arn" {
  description = "API Gateway execution ARN"
  value       = aws_api_gateway_rest_api.api_gateway.execution_arn
}

output "rest_api_id" {
  description = "The ID of the API Gateway REST API"
  value       = aws_api_gateway_rest_api.api_gateway.id
}
