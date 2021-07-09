import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { createObjectFromError, ErrorType, InfraSightError, InfraSightPaginationResponse, INFRA_SIGHT_API_URL } from '@infra-sight/sdk'
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import crypto from 'crypto'
import stringify from 'fast-json-stable-stringify'
import 'isomorphic-fetch'
import 'source-map-support/register'
import { stamptime } from './stamptime.js'

const AWS_BUCKET = process.env.AWS_BUCKET

const headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET',
  'strict-transport-security': 'max-age=31536000; includeSubDomains'
}

const s3 = new S3Client({})

const hashMd5 = (json: string): Buffer => {
  return crypto.createHash('md5').update(json).digest()
}

const handleError = (error: unknown): APIGatewayProxyStructuredResultV2 => {
  console.error(error)
  
  let statusCode = 500
  let body = stringify({ message: 'Internal Server Error' })

  if (error instanceof InfraSightError) {
    body = stringify(createObjectFromError(error))

    if (error.type === ErrorType.User) {
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
  cache?: number
}

export const createScraperHandler = (
  handler: (event: APIGatewayProxyEventV2) => Promise<ScrapeResponse>,
): APIGatewayProxyHandlerV2 => async (event) => {
  try {
    const { path, payload, cache = 86400 } = await handler(event)

    const json = stringify(payload)
    const md5 = hashMd5(json)
    const md5hex = md5.toString('hex')
    const md5base64 = md5.toString('base64')
    const prefix = 'v2/cdn' + path
    const key = prefix + stamptime() + '-' + md5hex
    let location: string

    const latest = await s3.send(
      new ListObjectsV2Command({
        Bucket: AWS_BUCKET,
        Delimiter: '/',
        Prefix: prefix,
        MaxKeys: 1,
      })
    )
      .then(response => response.Contents?.[0].Key)
    
    if (!latest || latest.substring(prefix.length).split('-')[1] !== md5hex) {
      await s3.send(
        new PutObjectCommand({
          Bucket: AWS_BUCKET,
          Key: key,
          Body: json,
  
          CacheControl: 'public, max-age=31536000',
          ContentMD5: md5base64,
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
        'location': location,
      },
      body: '',
      isBase64Encoded: false
    } as APIGatewayProxyStructuredResultV2
  } catch (error) {
    return handleError(error)
  }
}

interface ListResponse {
  path: string
}

export const createListHandler = (
  handler: (event: APIGatewayProxyEventV2) => ListResponse
): APIGatewayProxyHandlerV2 => async (event) => {
  try {
    const { path } = handler(event)

    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: AWS_BUCKET,
        Delimiter: '/',
        Prefix: 'v2/cdn' + path,
        ContinuationToken: event.queryStringParameters?.page_token
      })
    )

    const items = response.Contents
      ?.filter(contents => !!contents.Key)
      .map(contents => '/' + contents.Key)
      ?? []

    const body = stringify({
      items,
      page_token: response.IsTruncated ? response.NextContinuationToken : undefined
    } as InfraSightPaginationResponse)

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
      body,
      isBase64Encoded: false
    }
  } catch (error) {
    return handleError(error)
  }
}