import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import {Certificate, getDistConfig} from './dist-config';
import {createBucketForCloudfront} from './bucket';

const APP_URL = 'demo.taskbase.com';

const CERTIFICATE: Certificate = {
  ACMCertificateArn: 'arn:aws:acm:us-east-1:858595127436:certificate/0a4adfed-fd09-4e1b-aa47-07c94477f0c5',
  Certificate: 'arn:aws:acm:us-east-1:858595127436:certificate/0a4adfed-fd09-4e1b-aa47-07c94477f0c5'
};

const BUCKET_NAME = 'cf-' + uuid.v4();
const DOMAIN_NAME = `${BUCKET_NAME}.s3.amazonaws.com`;

const CONFIG = getDistConfig({
  appUrl: APP_URL,
  callerReference: (new Date()).getTime().toString(),
  domainName: DOMAIN_NAME,
  certificate: CERTIFICATE
});

async function createCloudfrontDistribution(config) {
  try {
    await createBucketForCloudfront(BUCKET_NAME);
    const cloundfrontDist = await new AWS.CloudFront().createDistribution(config).promise();
    console.log(cloundfrontDist);
    console.log('Successfully created distribution!');
  } catch(e) {
    console.error(e);
    console.error('ERROR');
  }
}
createCloudfrontDistribution(CONFIG);
