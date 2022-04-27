sudo yum update -y

# Retrieve new messages from S3 and save to tmpemails/ directory:
sudo mkdir /home/dyson
sudo echo "---Downloading from S3---"
aws s3 cp \
   s3://dysonstack-dysonbucket8c5c77ef-1d6c44rc8m3mw \
   . \
    --recursive \

# Install & start Docker
sudo yum -y install docker

sudo systemctl enable docker.service
sudo systemctl start docker.service

# Start Dyson
sudo docker build .

