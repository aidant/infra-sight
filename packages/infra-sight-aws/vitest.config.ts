import { defineProject } from 'vitest/config'

export default defineProject((env) => ({
  test: {
    name: '@infra-sight/aws',
    include: ['./src/**/*.test.ts'],
    environment: 'node',
    setupFiles: env.mode === 'test:live' ? [] : ['./test-env.vitest.setup.ts'],
    globalSetup:
      env.mode === 'test:live'
        ? []
        : ['./s3.vitest.setup.ts', './serverless-offline.vitest.setup.ts'],
    testTimeout: 28000,
  },
}))
