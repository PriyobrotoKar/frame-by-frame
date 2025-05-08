output "api_lambda_invoke_arn" {
  description = "The ARN of the Lambda function"
  value       = aws_lambda_function.api_lambda.invoke_arn
}
