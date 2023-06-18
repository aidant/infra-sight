import { defineProject } from 'vitest/config'

export default defineProject((config) => {
  const stage =
    /test:(?<stage>production|staging|development)/.exec(config.mode)?.groups?.stage || 'local'

  const env: Record<string, string> = {}
  const globalSetup: string[] = []

  if (stage === 'local') {
    globalSetup.push('./s3.vitest.setup.ts', './serverless-offline.vitest.setup.ts')

    env['AWS_BUCKET'] = 'infra-sight-test-bucket'
    env['INFRA_SIGHT_API_URL'] = 'http://localhost:3000/'
    env['S3_CONFIG'] =
      '{"forcePathStyle":true,"region":"us-east-1","credentials":{"accessKeyId":"S3RVER","secretAccessKey":"S3RVER"},"endpoint":"http://localhost:4568"}'
  }

  if (stage === 'production') {
    env['INFRA_SIGHT_API_URL'] = 'https://infra-sight.api.aidan.pro/'
  }

  if (stage === 'staging') {
    env['INFRA_SIGHT_API_URL'] = 'https://infra-sight.api.staging.aidan.pro/'
  }

  if (stage === 'development') {
    env['INFRA_SIGHT_API_URL'] = 'https://infra-sight.api.development.aidan.pro/'
  }

  return {
    test: {
      name: '@infra-sight/aws',
      include: ['./src/**/*.test.ts'],
      environment: 'node',
      globalSetup,
      testTimeout: 28000,
      env,
    },
  }
})
