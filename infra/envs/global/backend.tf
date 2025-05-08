terraform {
  backend "s3" {
    bucket = "framebyframe-terraform-state-bucket"
    key    = "global/terraform.tfstate"
    region = "ap-south-1"
  }
}
