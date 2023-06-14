import { vi } from 'vitest'

vi.stubEnv('AWS_BUCKET', 'infra-sight-test-bucket')
vi.stubEnv('INFRA_SIGHT_API_URL', 'http://localhost:3000/')
vi.stubEnv(
  'S3_CONFIG',
  '{"forcePathStyle":true,"credentials":{"accessKeyId":"S3RVER","secretAccessKey":"S3RVER"},"endpoint":"http://localhost:4568"}'
)
