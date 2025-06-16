data "terraform_remote_state" "global" {
  backend = "s3"
  config = {
    bucket = "framebyframe-terraform-state-bucket"
    key    = "global/terraform.tfstate"
    region = "ap-south-1"
  }
}

module "lambda" {
  source = "../../modules/lambda"

  app_name                    = var.app_name
  env                         = "stage"
  aws_region                  = var.aws_region
  ecr_repo                    = var.ecr_repo
  image_tag                   = var.image_tag
  log_retention_days          = var.log_retention_days
  env_vars                    = var.env_vars
  backend_api_url             = "https://${module.api-gateway.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/stage"
  api_gateway_execution_arn   = module.api-gateway.api_gateway_execution_arn
  video_transcoding_queue_arn = data.terraform_remote_state.global.outputs.video_transcoding_queue_arn
  ecs_cluster_arn             = module.ecs.ecs_cluster_arn
  ecs_task_definition_arn     = module.ecs.ecs_task_definition_arn
  ecs_task_role_arn           = module.ecs.ecs_task_role_arn
  ecs_execution_role_arn      = module.ecs.ecs_execution_role_arn
  primary_bucket              = data.terraform_remote_state.global.outputs.primary_bucket_name
}

module "api-gateway" {
  source = "../../modules/api-gateway"

  env                   = "stage"
  app_name              = var.app_name
  api_lambda_invoke_arn = module.lambda.api_lambda_invoke_arn
  log_retention_days    = var.log_retention_days
}

module "ecs" {
  source = "../../modules/ecs"

  app_name           = var.app_name
  env                = "dev"
  temp_bucket_arn    = data.terraform_remote_state.global.outputs.temp_bucket_arn
  primary_bucket_arn = data.terraform_remote_state.global.outputs.primary_bucket_arn
}
