output "ecr_repository_url" {
  description = "The URL of the ECR repository"
  value       = aws_ecr_repository.app_repo.repository_url
}

output "ecr_repository" {
  description = "The Repo of the ECR repository"
  value       = aws_ecr_repository.app_repo.name
}

output "api_lambda_invoke_arn" {
  description = "The ARN of the Lambda function"
  value       = aws_lambda_function.api_lambda.invoke_arn
}
