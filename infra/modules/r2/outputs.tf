output "private_bucket" {
  value = {
    name = cloudflare_r2_bucket.private_bucket.id
  }
  description = "Name of the private R2 bucket used for video storage"
}
