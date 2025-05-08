module "lambda" {
  source = "../../modules/lambda"

  app_name                  = var.app_name
  env                       = "stage"
  aws_region                = var.aws_region
  ecr_repo                  = var.ecr_repo
  image_tag                 = var.image_tag
  log_retention_days        = var.log_retention_days
  env_vars                  = var.env_vars
  backend_api_url           = "https://${module.api-gateway.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/stage"
  api_gateway_execution_arn = module.api-gateway.api_gateway_execution_arn
}

module "api-gateway" {
  source = "../../modules/api-gateway"

  env                   = "stage"
  app_name              = var.app_name
  api_lambda_invoke_arn = module.lambda.api_lambda_invoke_arn
  log_retention_days    = var.log_retention_days
}
