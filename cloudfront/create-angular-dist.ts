import * as AWS from 'aws-sdk';
import {Certificate, getDistConfig} from './dist-config';
import {createBucketForCloudfront} from './bucket';

interface Config {
  certificate: Certificate;
  profile: string;
}

const taskbaseConfig: Config = {
  certificate: {
    ACMCertificateArn: 'arn:aws:acm:us-east-1:858595127436:certificate/0a4adfed-fd09-4e1b-aa47-07c94477f0c5'
  },
  profile: 'taskbase-cloudfront-admin'
};

const tsmeanConfig: Config = {
  certificate: {
    ACMCertificateArn: 'arn:aws:acm:us-east-1:890702452394:certificate/2e0c5643-5440-4a9c-b283-be8685a01a7b'
  },
  profile: 'TODO'
};

// ENTER YOUR STUFF HERE
// LOGIN TO THE CORRECT ACCOUNT FIRST
const APP_URL = 'lap.taskbase.com'; // choose lowercased cname without numbers
const usedConfig = taskbaseConfig;
const BUCKET_NAME = 'cf-tb-lap';
// ENTER YOUR STUFF HERE

const DOMAIN_NAME = `${BUCKET_NAME}.s3.amazonaws.com`;

const credentials = new AWS.SharedIniFileCredentials({profile: usedConfig.profile});
AWS.config.credentials = credentials;

const CONFIG = getDistConfig({
  appUrl: APP_URL,
  callerReference: (new Date()).getTime().toString(),
  domainName: DOMAIN_NAME,
  certificate: usedConfig.certificate
});

async function createCloudfrontDistribution(config) {
  try {
    await createBucketForCloudfront(BUCKET_NAME);
    const cloundfrontDist = await new AWS.CloudFront().createDistribution(config).promise();
    console.log(cloundfrontDist);
    console.log('Successfully created distribution!');
    console.log(`Manual steps remaining: add an A-Record ${APP_URL} with the Alias \"${cloundfrontDist.Distribution.DomainName}.\" to Route53.`);
  } catch (e) {
    console.error(e);
    console.error('ERROR');
  }
}

createCloudfrontDistribution(CONFIG);
