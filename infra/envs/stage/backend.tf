terraform {
  backend "s3" {
    bucket = "framebyframe-terraform-state-bucket"
    key    = "stage/terraform.tfstate"
    region = "ap-south-1"
  }
}
