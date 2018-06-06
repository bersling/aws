import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import {getDistConfig} from './dist-config';
import {createBucketForCloudfront} from './bucket';

const APP_URL = 'dev4.demo.taskbase.com';

const BUCKET_NAME = 'test-' + uuid.v4();
const DOMAIN_NAME = `${BUCKET_NAME}.s3.amazonaws.com`;

const CONFIG = getDistConfig({
  appUrl: APP_URL,
  callerReference: (new Date()).getTime().toString(),
  domainName: DOMAIN_NAME
});

async function createCloudfrontDistribution(config) {
  try {
    await createBucketForCloudfront(BUCKET_NAME);
    await new AWS.CloudFront().createDistribution(config).promise();
    console.log('successfully created cloudfront distribution');
    console.log('SUCCESS!');
  } catch(e) {
    console.error(e);
    console.error('ERROR');
  }
}
createCloudfrontDistribution(CONFIG);
