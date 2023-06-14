import { S3Client } from '@aws-sdk/client-s3'

export const AWS_BUCKET = process.env['AWS_BUCKET']

const S3_CONFIG = process.env['S3_CONFIG'] ? JSON.parse(process.env['S3_CONFIG']) : undefined

export const s3 = new S3Client(S3_CONFIG)
