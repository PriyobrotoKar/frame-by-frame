module "lambda" {
  source = "../../modules/lambda"

  app_name                  = var.app_name
  env                       = "dev"
  image_tag                 = var.image_tag
  log_retention_days        = var.log_retention_days
  env_vars                  = var.env_vars
  api_gateway_execution_arn = module.api-gateway.api_gateway_execution_arn
}

module "api-gateway" {
  source = "../../modules/api-gateway"

  env                   = "dev"
  app_name              = var.app_name
  api_lambda_invoke_arn = module.lambda.api_lambda_invoke_arn
  log_retention_days    = var.log_retention_days
}
