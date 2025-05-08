module "s3" {
  source = "../../modules/s3"

  app_name = var.app_name
  env      = "global"
}
