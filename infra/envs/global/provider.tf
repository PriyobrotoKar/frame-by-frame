provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Environment = "global"
      Application = var.app_name
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}


terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.97.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.6.0"
    }
  }

  required_version = ">= 1.0.0"
}
