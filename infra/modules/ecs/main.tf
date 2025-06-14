data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.app_name}-${var.env}-cluster"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "ecs_task_execution_policy" {
  name = "ecsTaskExecutionLoggingPolicy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      Resource = "arn:aws:logs:ap-south-1:${local.account_id}:log-group:/ecs/*"
      },
      {
        Effect = "Allow",
        Action = [
          "ecr:GetAuthorizationToken"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ],
        Resource = "arn:aws:ecr:ap-south-1:${local.account_id}:repository/framebyframe/transcoder"
      },
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = [
          var.primary_bucket_arn,
          var.temp_bucket_arn
        ]
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "ecs_task_execution_attach" {
  name       = "ecsTaskExecutionAttach"
  roles      = [aws_iam_role.ecs_task_execution_role.name]
  policy_arn = aws_iam_policy.ecs_task_execution_policy.arn
}

resource "aws_iam_role" "ecs_task_role" {
  name = "ecsTaskRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_policy" "ecs_task_policy" {
  name = "ecsTaskS3Policy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource = [
          "${var.primary_bucket_arn}/*",
          "${var.temp_bucket_arn}/*"
        ]
      },
      {
        Effect = "Allow",
        Action = [
          "s3:ListBucket"
        ],
        Resource = [
          var.primary_bucket_arn,
          var.temp_bucket_arn
        ]
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "ecs_task_attach" {
  name       = "ecsTaskAttach"
  roles      = [aws_iam_role.ecs_task_role.name]
  policy_arn = aws_iam_policy.ecs_task_policy.arn
}


resource "aws_ecs_task_definition" "video_transcoder_task" {
  family = "${var.app_name}-${var.env}-video-transcoder"

  container_definitions = jsonencode([
    {
      name      = "${var.app_name}-${var.env}-video-transcoder"
      image     = "${local.account_id}.dkr.ecr.ap-south-1.amazonaws.com/framebyframe/transcoder:latest"
      cpu       = 2048
      memory    = 4096
      essential = true
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-create-group"  = "true"
          "awslogs-group"         = "/ecs/${var.app_name}-video-transcoder"
          "awslogs-region"        = "ap-south-1"
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  requires_compatibilities = ["FARGATE"]
  runtime_platform {
    cpu_architecture = "ARM64"
  }
  network_mode       = "awsvpc"
  cpu                = "2048"
  memory             = "4096"
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn      = aws_iam_role.ecs_task_role.arn
}


