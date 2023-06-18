import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { exec, fork } from 'node:child_process'

export default async () => {
  const child = fork('./s3.js', {
    env: Object.assign(Object.create(null), process.env, {
      NODE_OPTIONS: process.env['NODE_OPTIONS']
        ? process.env['NODE_OPTIONS'] + ' --openssl-legacy-provider'
        : '--openssl-legacy-provider',
    }),
    stdio: 'inherit',
  })

  await {
    then: (resolve: () => void) => {
      const handleMessage = (message: string) => {
        if (message === 'ready') {
          child.off('message', handleMessage)
          resolve()
        }
      }
      child.on('message', handleMessage)
    },
  }

  const client = new S3Client({
    forcePathStyle: true,
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
    },
    endpoint: 'http://localhost:4568',
  })

  await client.send(
    new PutObjectCommand({
      Bucket: 'infra-sight-test-bucket',
      Key: 'metadata.json',
      Body: JSON.stringify({
        name: 'infra-sight',
        version: 2,
        commit: await {
          then: (resolve: (commit: string) => void) => {
            const child = exec('git rev-parse HEAD')
            child.stdout?.on('data', (data) => resolve(data.trim()))
          },
        },
      }),
      ContentType: 'application/json; charset=utf8',
      CacheControl: 'public, max-age=31536000',
    })
  )

  return async () => {
    await {
      then: (resolve: () => void) => {
        child.once('exit', () => resolve())
        child.kill('SIGTERM')
      },
    }
  }
}
