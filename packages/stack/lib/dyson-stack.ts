import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib'
import { AmazonLinuxGeneration, AmazonLinuxImage, AmazonLinuxCpuType, Instance, InstanceClass, InstanceSize, InstanceType, Peer, Port, SubnetType, SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2'
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Asset } from 'aws-cdk-lib/aws-s3-assets'

export class DysonStack extends Stack {
  constructor(app: App, id: string, stackProps?: StackProps) {
    super(app, id, stackProps);

    const bucket = new Bucket(this, 'dyson-bucket')

    new BucketDeployment(this, 'dyson-deploy', {
      sources: [Source.asset('../../ec2')],
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

    // const lambdas = fs.readdirSync(`${__dirname}/../../lambda`);

    // const lambdaRole = new Role(this, 'lambdaRole',
    //   {
    //     assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    //     managedPolicies: [
    //       ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'), 
    //       ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_FullAccess'), 
    //       ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'),
    //       ManagedPolicy.fromAwsManagedPolicyName('AmazonSNSFullAccess'),
    //     ]
    //   }
    // )
    
    // lambdas.forEach((lambdaId) => {

    //   const dysonLambda = new Function(this, `${lambdaId}-lambda`, {
    //     code: Code.fromAsset(path.join(__dirname, '..', '..', 'lambda', lambdaId)),
    //     handler: lambdaId === 'dyson-message-director' ? 'src/index.handler' : 'index.handler',
    //     runtime: Runtime.NODEJS_12_X,
    //     timeout: Duration.seconds(10),
    //     role: lambdaRole,
    //     functionName: lambdaId
    //   });
    //   if (lambdaId === 'dyson-message-director'){
    //     dysonLambda.addEventSource(new SnsEventSource(new Topic(this, 'dyson-message', {topicName:'dyson-message'})));
    //   } else {
    //     dysonLambda.addEventSource(new SnsEventSource(new Topic(this, lambdaId, {topicName: lambdaId})));
    //   }
    // })

  }
}