import { ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3'
import {
  INFRA_SIGHT_API_URL,
  InfraSightError,
  type InfraSightPaginationResponse,
} from '@infra-sight/sdk'
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'
import stringify from 'fast-json-stable-stringify'
import crypto from 'node:crypto'
import { AWS_BUCKET, s3 } from './s3.js'
import { stamptime } from './stamptime.js'

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
}

const createHashSHA256 = (json: string): Buffer => {
  return crypto.createHash('sha256').update(json, 'utf-8').digest()
}

const handleError = (error: unknown): APIGatewayProxyStructuredResultV2 => {
  let statusCode = 500
  let body = stringify({ message: 'Internal Server Error' })

  if (error instanceof InfraSightError) {
    body = stringify(InfraSightError.serialize(error))

    if (error.source === 'Consumer') {
      statusCode = 422
    }
  }

  return {
    statusCode,
    body,
    headers: {
      ...headers,
      'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
      'content-type': 'application/json; charset=utf-8',
    },
    isBase64Encoded: false,
  }
}

interface ScrapeResponse {
  path: string
  payload: object
  cache?: number | undefined
}

export const createScraperHandler =
  (handler: (event: APIGatewayProxyEventV2) => Promise<ScrapeResponse>): APIGatewayProxyHandlerV2 =>
  async (event) => {
    try {
      const { path, payload, cache = 86400 } = await handler(event)

      const json = stringify(payload)
      const hash = createHashSHA256(json)
      const hashHex = hash.toString('hex')
      const hashBase64 = hash.toString('base64')
      const prefix = 'v2/cdn' + path
      const key = prefix + stamptime() + '-' + hashHex
      let location: string

      const latest = await s3
        .send(
          new ListObjectsV2Command({
            Bucket: AWS_BUCKET,
            Delimiter: '/',
            Prefix: prefix,
            MaxKeys: 1,
          })
        )
        .then((response) => response.Contents?.[0]?.Key)

      if (!latest || latest.substring(prefix.length).split('-')[1] !== hashHex) {
        await s3.send(
          new PutObjectCommand({
            Bucket: AWS_BUCKET,
            Key: key,
            Body: json,

            CacheControl: 'public, max-age=31536000',
            ChecksumAlgorithm: 'SHA256',
            ChecksumSHA256: hashBase64,
            ContentType: 'application/json; charset=utf8',
          })
        )
        location = INFRA_SIGHT_API_URL + key
      } else {
        location = INFRA_SIGHT_API_URL + latest
      }

      return {
        statusCode: 302,
        headers: {
          ...headers,
          'cache-control': 'public, max-age=' + cache,
          location: location,
        },
        body: '',
        isBase64Encoded: false,
      } as APIGatewayProxyStructuredResultV2
    } catch (error) {
      return handleError(error)
    }
  }

interface ListResponse {
  path: string
}

export const createListHandler =
  (handler: (event: APIGatewayProxyEventV2) => ListResponse): APIGatewayProxyHandlerV2 =>
  async (event) => {
    try {
      const { path } = handler(event)

      const response = await s3.send(
        new ListObjectsV2Command({
          Bucket: AWS_BUCKET,
          Delimiter: '/',
          Prefix: 'v2/cdn' + path,
          ContinuationToken: event.queryStringParameters?.['page_token'] as string,
        })
      )

      const items =
        response.Contents?.filter((contents) => !!contents.Key).map(
          (contents) => '/' + contents.Key
        ) ?? []

      const body = stringify({
        items,
        page_token: response.IsTruncated ? response.NextContinuationToken : undefined,
      } as InfraSightPaginationResponse)

      return {
        statusCode: 200,
        headers: {
          ...headers,
          'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
        },
        body,
        isBase64Encoded: false,
      }
    } catch (error) {
      return handleError(error)
    }
  }
