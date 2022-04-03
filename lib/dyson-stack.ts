import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib'
import { KeyPair } from 'cdk-ec2-key-pair'
import { AmazonLinuxGeneration, AmazonLinuxImage, AmazonLinuxCpuType, Instance, InstanceClass, InstanceSize, InstanceType, Peer, Port, SubnetType, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2'
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Asset } from 'aws-cdk-lib/aws-s3-assets'

interface DysonProps extends StackProps {}

export class DysonStack extends Stack {
  constructor (scope: Construct, id: string, props?: DysonProps) {
    super(scope, id, props)

    const bucket = new Bucket(this, 'dyson-bucket')

    new BucketDeployment(this, 'dyson-deploy', {
      sources: [Source.asset('./appcode')],
      destinationBucket: bucket
    })

    const vpc = new Vpc(this, 'dyson-vpc', {
      cidr: '10.0.0.0/16',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: SubnetType.PUBLIC
        }
      ]
    })

    const ec2Role = new Role(this, 'Role', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      description: 'Dyson Ec2 Role',
    });

    const key = new KeyPair(this, 'dyson-ec2-key-pair', {
      name: 'dyson-ec2',
      description: 'Key Pair for Dyson-EC2',
      storePublicKey: true // by default the public key will not be stored in Secrets Manager
    })

    key.grantReadOnPrivateKey(ec2Role);
    key.grantReadOnPublicKey(ec2Role);

    const securityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow ssh access to ec2 instances',
      allowAllOutbound: true
    })

    securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(22),
      'allow ssh access from the world'
    )

    const ami = new AmazonLinuxImage({
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: AmazonLinuxCpuType.ARM_64
    })

    const instance = new Instance(this, 'dyson-ec2-instance', {
      instanceType: InstanceType.of(InstanceClass.T4G, InstanceSize.MICRO),
      machineImage: ami,
      role: ec2Role,
      keyName: key.keyPairName,
      vpc: vpc,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC
      },
      securityGroup: securityGroup
    })

    bucket.grantRead(instance.role)

    const dysonAsset = new Asset(this, 'dyson-appcode-asset', {
      path: './appcode/'
    })

    instance.userData.addExecuteFileCommand({
      filePath: './appcode/configure.sh'
    })
  }
}
