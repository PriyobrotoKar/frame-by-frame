module "s3" {
  source = "../../modules/s3"

  app_name                    = var.app_name
  allowed_origins             = var.allowed_origins
  video_transcoding_queue_arn = module.sqs.video_transcoding_queue_arn
}

data "aws_s3_bucket" "temp_dev_bucket" {
  bucket = "${var.app_name}-dev-temp"
}

module "sqs" {
  source = "../../modules/sqs"

  env             = "global"
  app_name        = var.app_name
  temp_bucket_arn = data.aws_s3_bucket.temp_dev_bucket.arn
}
