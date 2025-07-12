resource "cloudflare_r2_bucket" "private_bucket" {
  account_id = var.cloudflare_account_id
  name       = "${var.app_name}-private-bucket"
  location   = "APAC"
}

resource "cloudflare_r2_bucket_cors" "private_bucket_cors" {
  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.private_bucket.name

  rules = [{
    allowed = {
      methods = ["GET"]
      origins = var.allowed_origins
      headers = ["*"]
    }
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }]
}

