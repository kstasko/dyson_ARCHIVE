sudo yum update -y

# Retrieve new messages from S3 and save to tmpemails/ directory:
sudo mkdir /home/dyson
sudo echo "---Downloading from S3---"
aws s3 cp \
   s3://dysonstack-dysonbucket8c5c77ef-1pijkead3929b \
   . \
    --recursive \
sudo ls

# Install & start Docker
sudo yum -y install docker

sudo systemctl enable docker.service
sudo systemctl start docker.service

sudo ls

# Start Dyson
sudo docker build .

