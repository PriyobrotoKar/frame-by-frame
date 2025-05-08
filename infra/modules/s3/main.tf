resource "aws_s3_bucket" "state_bucket" {
  bucket = "${var.app_name}-terraform-state-bucket"

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Environment = var.env
    Application = var.app_name
  }
}
