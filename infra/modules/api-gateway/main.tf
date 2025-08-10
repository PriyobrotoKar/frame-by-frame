resource "aws_api_gateway_rest_api" "api_gateway" {
  name = "${var.env}-${var.app_name}-api-gateway"

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_iam_role" "api_gateway_role" {
  name = "${var.env}-${var.app_name}-api-gateway-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_iam_policy" "api_gateway_policy" {
  name        = "${var.env}-${var.app_name}-api-gateway-policy"
  description = "Policy for API Gateway to invoke Lambda functions"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams",
          "logs:PutLogEvents",
          "logs:GetLogEvents",
          "logs:FilterLogEvents",
        ]
        Resource = "*"
      }
    ]
  })

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_iam_role_policy_attachment" "api_gateway_role_policy_attachment" {
  role       = aws_iam_role.api_gateway_role.name
  policy_arn = aws_iam_policy.api_gateway_policy.arn
}

resource "aws_api_gateway_account" "api_gateway_account" {
  cloudwatch_role_arn = aws_iam_role.api_gateway_role.arn
}

resource "aws_api_gateway_resource" "api_gateway_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "api_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.api_gateway_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "api_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.api_gateway_resource.id
  http_method             = aws_api_gateway_method.api_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.api_lambda_invoke_arn
}

resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id

  triggers = {
    redeploy = sha1(jsonencode([
      aws_api_gateway_method.api_method.id,
      aws_api_gateway_integration.api_integration.id,
      aws_api_gateway_method.api_method.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api_stage" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  stage_name  = var.env

  deployment_id = aws_api_gateway_deployment.api_deployment.id

  depends_on = [aws_api_gateway_account.api_gateway_account]

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway_log_group.arn
    format = jsonencode({
      requestId        = "$context.requestId"
      requestTime      = "$context.requestTime"
      httpMethod       = "$context.httpMethod"
      resourcePath     = "$context.resourcePath"
      status           = "$context.status"
      responseLength   = "$context.responseLength"
      integrationError = "$context.integrationErrorMessage"
    })
  }

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_cloudwatch_log_group" "api_gateway_log_group" {
  name              = "/aws/apigateway/${var.env}-${var.app_name}-api-gateway"
  retention_in_days = var.log_retention_days

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

