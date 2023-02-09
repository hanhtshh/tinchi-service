#!/bin/bash
set -xe
# declare environment
export AWS_REGION="ap-southeast-1"
export REGISTRY_URL=""
export BITBUCKET_COMMIT_SHORT=${BITBUCKET_COMMIT::7}
export IMAGE=""
export BUILD_AWS_ACCESS_KEY=""
export BUILD_AWS_SECRET_KEY=""
export SSH_PRIVATE_KEY=""

# Install aws cli
pip3 install awscli

# Build and push image
if [[ ${BITBUCKET_BRANCH} = "dev" ]]
then
  REGISTRY_URL=${DEV_REGISTRY_URL}
  BUILD_AWS_ACCESS_KEY=${DEV_ECR_ACCESS_KEY}
  BUILD_AWS_SECRET_KEY=${DEV_ECR_SECRET_KEY}
  elif [[ ${BITBUCKET_BRANCH} = "stg" ]]
  then
    REGISTRY_URL=${STG_REGISTRY_URL}
    BUILD_AWS_ACCESS_KEY=${STG_ECR_ACCESS_KEY}
    BUILD_AWS_SECRET_KEY=${STG_ECR_SECRET_KEY}
  elif [[ ${BITBUCKET_BRANCH} = "master" ]]
  then
    REGISTRY_URL=${PRD_REGISTRY_URL}
    BUILD_AWS_ACCESS_KEY=${PRD_ECR_ACCESS_KEY}
    BUILD_AWS_SECRET_KEY=${PRD_ECR_SECRET_KEY}
fi

# Configure AWS credentials
aws configure set aws_access_key_id "${BUILD_AWS_ACCESS_KEY}"
aws configure set aws_secret_access_key "${BUILD_AWS_SECRET_KEY}"

# Get AWS SSM key for authentication
SSH_PRIVATE_KEY=`aws ssm get-parameter --name 'system-user-build-key'  --region ap-southeast-1 --with-decryption --output=text --query 'Parameter.Value'`

# export IMAGE=$REGISTRY_URL/$BITBUCKET_REPO_SLUG:$BITBUCKET_BRANCH-$BITBUCKET_BUILD_NUMBER-$BITBUCKET_COMMIT_SHORT
IMAGE=$REGISTRY_URL/$BITBUCKET_REPO_SLUG:$BITBUCKET_BRANCH-$BITBUCKET_COMMIT_SHORT-$(date +%s)
echo "${IMAGE}"
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin "${REGISTRY_URL}"

docker build --build-arg SSH_PRIVATE_KEY="${SSH_PRIVATE_KEY}" -t "${IMAGE}" -f Dockerfile .
docker push "${IMAGE}"