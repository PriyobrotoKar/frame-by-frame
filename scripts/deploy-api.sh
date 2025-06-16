#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

DIR="./infra/envs/dev"

if [ $# -ge 1 ]; then
  DIR=$1
fi

if [ ! -d "$DIR" ]; then
  echo "❌ Directory $DIR does not exist."
  exit 1
fi

# Configuration
AWS_REGION="ap-south-1"
ECR_REPOSITORY_NAME="dev-framebyframe/api"
IMAGE_TAG="latest"

# You can override these with command line arguments
if [ $# -ge 2 ]; then
  ECR_REPOSITORY_NAME=$2
fi

if [ $# -ge 3 ]; then
  IMAGE_TAG=$3
fi

if [ $# -ge 4 ]; then
  AWS_REGION=$4
fi

echo "🔍 Using configuration:"
echo "   AWS Region: $AWS_REGION"
echo "   ECR Repository: $ECR_REPOSITORY_NAME"
echo "   Image Tag: $IMAGE_TAG"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI is not installed. Please install it first."
  exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed. Please install it first."
  exit 1
fi

# Get AWS account ID using the specified command
echo "🔑 Getting AWS account ID..."
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

if [ $? -ne 0 ]; then
  echo "❌ Failed to get AWS account ID. Make sure you're authenticated with AWS."
  exit 1
fi

# Define the ECR repository URI
ECR_REPOSITORY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}"

# Check if repository exists, create if it doesn't
echo "🔍 Checking if ECR repository exists..."
aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} &> /dev/null || \
  (echo "📦 Creating ECR repository ${ECR_REPOSITORY_NAME}..." && \
   aws ecr create-repository --repository-name ${ECR_REPOSITORY_NAME} --region ${AWS_REGION})

# Log in to ECR
echo "🔐 Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPOSITORY_URI}

# Build Docker image
echo "🔨 Building Docker image..."
docker build --platform linux/amd64 -f apps/api/Dockerfile -t ${ECR_REPOSITORY_NAME}:${IMAGE_TAG} .

# Tag the image for ECR
echo "🏷️ Tagging image for ECR..."
docker tag ${ECR_REPOSITORY_NAME}:${IMAGE_TAG} ${ECR_REPOSITORY_URI}:${IMAGE_TAG}

# Push to ECR and capture output
echo "⬆️ Pushing image to ECR..."
PUSH_OUTPUT=$(docker push ${ECR_REPOSITORY_URI}:${IMAGE_TAG})
echo "${PUSH_OUTPUT}"

# Extract the SHA256 digest from the push output
SHA_DIGEST=$(echo "${PUSH_OUTPUT}" | grep -o "sha256:[a-f0-9]*" | head -1)

if [ -z "${SHA_DIGEST}" ]; then
  echo "❌ Failed to extract SHA digest from push output."
  exit 1
fi

echo "📋 Extracted image digest: ${SHA_DIGEST}"

# Build the Video Transcoder app
cd apps/video-transcoder
echo "🔨 Building Video Transcoder app..."
pnpm install
pnpm build

cd ../..

# Run terraform apply with the digest as a variable
cd $DIR
echo "🔄 Running terraform apply with image digest..."
terraform init
terraform apply -var="image_tag=@${SHA_DIGEST}" -var="ecr_repo=${ECR_REPOSITORY_NAME}" -auto-approve

echo "✅ Successfully built, pushed, and deployed image with digest: ${SHA_DIGEST}"
