import * as AWS from 'aws-sdk';
import {Policy} from 'aws-sdk/clients/s3';

function getPublicBucketPolicy(bucketName: string): Policy {
  return JSON.stringify({
    'Version': '2012-10-17',
    'Statement': [
      {
        'Sid': 'AddPerm',
        'Effect': 'Allow',
        'Principal': '*',
        'Action': 's3:GetObject',
        'Resource': `arn:aws:s3:::${bucketName}/*`
      }
    ]
  });
}

function getBucketWebsiteConfig() {
  return {
    'IndexDocument': {
      'Suffix': 'index.html'
    }
  };
}

export function createBucketForCloudfront(bucketName: string) {
  return new Promise(async (resolve, reject) => {
    try {
      await new AWS.S3().createBucket({Bucket: bucketName}).promise();
      await new AWS.S3().putBucketPolicy({Bucket: bucketName, Policy: getPublicBucketPolicy(bucketName)}).promise();
      await new AWS.S3().putBucketWebsite({Bucket: bucketName, WebsiteConfiguration: getBucketWebsiteConfig()});
      console.log('Successfully created bucket with website settings');
      resolve();
    } catch(e) {
      console.log(e);
      console.log('ERROR in creating bucket with settings');
      reject();
    }
  });
}
