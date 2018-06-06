export function getDistConfig(partialConfig: PartialDistConfig) {
  return {
    'DistributionConfig': {
      'Comment': 'Created by Script',
      'CacheBehaviors': {
        'Quantity': 0
      },
      'IsIPV6Enabled': false,
      'Logging': {
        'Bucket': '',
        'Prefix': '',
        'Enabled': false,
        'IncludeCookies': false
      },
      'WebACLId': '',
      'Origins': {
        'Items': [
          {
            'S3OriginConfig': {
              'OriginAccessIdentity': ''
            },
            'OriginPath': '',
            'CustomHeaders': {
              'Quantity': 0
            },
            'Id': 'S3-Bucket',
            'DomainName': partialConfig.domainName
          }
        ],
        'Quantity': 1
      },
      'DefaultRootObject': 'index.html',
      'PriceClass': 'PriceClass_100',
      'Enabled': true,
      'DefaultCacheBehavior': {
        'TrustedSigners': {
          'Enabled': false,
          'Quantity': 0
        },
        'LambdaFunctionAssociations': {
          'Quantity': 0
        },
        'TargetOriginId': 'S3-Bucket',
        'ViewerProtocolPolicy': 'allow-all',
        'ForwardedValues': {
          'Headers': {
            'Quantity': 0
          },
          'Cookies': {
            'Forward': 'none'
          },
          'QueryStringCacheKeys': {
            'Quantity': 0
          },
          'QueryString': false
        },
        'MaxTTL': 0,
        'SmoothStreaming': false,
        'DefaultTTL': 0,
        'AllowedMethods': {
          'Items': [
            'HEAD',
            'GET'
          ],
          'CachedMethods': {
            'Items': [
              'HEAD',
              'GET'
            ],
            'Quantity': 2
          },
          'Quantity': 2
        },
        'MinTTL': 0,
        'Compress': true
      },
      'CallerReference': partialConfig.callerReference,
      'ViewerCertificate': {
        'SSLSupportMethod': 'sni-only',
        'ACMCertificateArn': 'arn:aws:acm:us-east-1:858595127436:certificate/0a4adfed-fd09-4e1b-aa47-07c94477f0c5',
        'MinimumProtocolVersion': 'TLSv1.1_2016',
        'Certificate': 'arn:aws:acm:us-east-1:858595127436:certificate/0a4adfed-fd09-4e1b-aa47-07c94477f0c5',
        'CertificateSource': 'acm'
      },
      'CustomErrorResponses': {
        'Items': [
          {
            'ErrorCode': 403,
            'ResponsePagePath': '/index.html',
            'ResponseCode': '200',
            'ErrorCachingMinTTL': 60
          }
        ],
        'Quantity': 1
      },
      'HttpVersion': 'http1.1',
      'Restrictions': {
        'GeoRestriction': {
          'RestrictionType': 'none',
          'Quantity': 0
        }
      },
      'Aliases': {
        'Items': [
          partialConfig.appUrl
        ],
        'Quantity': 1
      }
    }
  };
}

export interface PartialDistConfig {
  domainName: string;
  callerReference: string;
  appUrl: string;
}
