resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.env}-${var.app_name}-lambda-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_cloudwatch_log_group" "api_logs" {
  name              = "/aws/lambda/${var.env}-${var.app_name}-api"
  retention_in_days = var.log_retention_days

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_iam_policy" "api_logging" {
  name        = "${var.env}-${var.app_name}-api-logging"
  description = "IAM policy for logging from a lambda"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "${aws_cloudwatch_log_group.api_logs.arn}:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "api_logs" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = aws_iam_policy.api_logging.arn
}

data "aws_caller_identity" "current" {}

resource "aws_lambda_function" "api_lambda" {
  function_name = "${var.env}-${var.app_name}-api"
  role          = aws_iam_role.lambda_execution_role.arn
  package_type  = "Image"
  image_uri     = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.ecr_repo}${var.image_tag}"
  timeout       = 30
  memory_size   = 128

  environment {
    variables = merge({
      BACKEND_URL = var.backend_api_url
      },
      var.env_vars
    )
  }

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_lambda_permission" "api_gateway_invoke_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The source ARN for the API Gateway
  source_arn = "${var.api_gateway_execution_arn}/*/*"
}


