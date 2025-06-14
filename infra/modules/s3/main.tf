resource "aws_s3_bucket" "state_bucket" {
  bucket = "${var.app_name}-terraform-state-bucket"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Environment = "global"
    Application = var.app_name
  }
}

resource "aws_s3_bucket" "primary_dev_bucket" {
  bucket = "${var.app_name}-dev"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Environment = "dev"
    Application = var.app_name
  }
}

resource "aws_s3_bucket_cors_configuration" "primary_dev_bucket_cors" {
  bucket = aws_s3_bucket.primary_dev_bucket.id

  cors_rule {
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = var.allowed_origins
    allowed_headers = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}


resource "aws_s3_bucket" "temp_dev_bucket" {
  bucket = "${var.app_name}-dev-temp"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Environment = "dev"
    Application = var.app_name
  }
}

resource "aws_s3_bucket_cors_configuration" "temp_dev_bucket_cors" {
  bucket = aws_s3_bucket.temp_dev_bucket.id

  cors_rule {
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = var.allowed_origins
    allowed_headers = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_notification" "temp_bucket_notification" {
  bucket = aws_s3_bucket.temp_dev_bucket.id

  queue {
    queue_arn = var.video_transcoding_queue_arn
    events    = ["s3:ObjectCreated:CompleteMultipartUpload"]
  }
}
