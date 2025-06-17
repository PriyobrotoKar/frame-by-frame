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
      },
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ],
        Resource = [
          "${var.primary_bucket.arn}/*",
          "${var.temp_bucket.arn}/*"
        ]
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


resource "aws_iam_role" "video_transcoding_consumer_role" {
  name = "${var.env}-${var.app_name}-video-transcoding-consumer-role"

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

resource "aws_iam_policy" "video_transcoding_consumer_policy" {
  name        = "${var.env}-${var.app_name}-video-transcoding-consumer-policy"
  description = "IAM policy for video transcoding consumer Lambda function"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ]
        Effect   = "Allow"
        Resource = var.video_transcoding_queue_arn
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "${aws_cloudwatch_log_group.video_transcoding_consumer_logs.arn}:*"
      },
      {
        Effect = "Allow",
        Action = [
          "ecs:RunTask",
          "ecs:DescribeTasks",
          "ecs:StopTask",
        ],
        Resource = [
          var.ecs_cluster_arn,
          var.ecs_task_definition_arn
        ]
      },
      {
        Effect = "Allow",
        Action = [
          "iam:PassRole"
        ],
        Resource = [var.ecs_execution_role_arn, var.ecs_task_role_arn],
        Condition = {
          StringEquals = {
            "iam:PassedToService" = "ecs-tasks.amazonaws.com"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "video_transcoding_consumer_policy_attachment" {
  role       = aws_iam_role.video_transcoding_consumer_role.name
  policy_arn = aws_iam_policy.video_transcoding_consumer_policy.arn
}

data "archive_file" "video_transcoding_consumer_zip" {
  type        = "zip"
  source_dir  = "../../../apps/video-transcoder/dist"
  output_path = "../../../apps/video-transcoder/video-transcoder.zip"
}

resource "aws_lambda_function" "video_transcoding_consumer" {
  function_name = "${var.env}-${var.app_name}-video-transcoding-consumer"
  role          = aws_iam_role.video_transcoding_consumer_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  timeout       = 30
  memory_size   = 128

  filename         = data.archive_file.video_transcoding_consumer_zip.output_path
  source_code_hash = data.archive_file.video_transcoding_consumer_zip.output_base64sha256

  environment {
    variables = merge({
      BACKEND_URL         = var.backend_api_url
      BUCKET              = var.primary_bucket.name
      ECS_CLUSTER         = var.ecs_cluster_arn
      ECS_TASK_DEFINITION = var.ecs_task_definition_arn
      ECS_CONTAINER_NAME  = "${var.app_name}-${var.env}-video-transcoder",
      SUBNETS             = "subnet-0d639d1cb06a3302c,subnet-0439194c6426f11db,subnet-0e2b4103cc9c48e68"
      REGION              = var.aws_region
      },
      var.env_vars,
    )
  }

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}

resource "aws_cloudwatch_log_group" "video_transcoding_consumer_logs" {
  name              = "/aws/lambda/${var.env}-${var.app_name}-video-transcoding-consumer"
  retention_in_days = var.log_retention_days
}

resource "aws_lambda_event_source_mapping" "video_transcoding_consumer_event_source" {
  event_source_arn = var.video_transcoding_queue_arn
  function_name    = aws_lambda_function.video_transcoding_consumer.arn
}
