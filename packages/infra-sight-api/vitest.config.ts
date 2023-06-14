import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: '@infra-sight/api',
    include: ['./src/**/*.test.ts'],
    environment: 'node',
    testTimeout: 28000,
  },
})
