module "s3" {
  source = "../../modules/s3"

  app_name        = var.app_name
  allowed_origins = var.allowed_origins
}
