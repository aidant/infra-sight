import '../instrumentation.js'

import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda'
import { AWS_BUCKET, s3 } from '../s3.js'
import { traceEndpoint } from '../telemetry.js'

export const cdn = traceEndpoint(
  {
    name: 'InfraSight.function.cdn',
    with: (event) => ({
      key: event.pathParameters?.['key'] || 'metadata.json',
    }),
  },
  async (
    event: APIGatewayProxyEventV2,
    context: Context
  ): Promise<APIGatewayProxyStructuredResultV2> => {
    const key = event.pathParameters?.['key'] || 'metadata.json'

    const object = await s3.send(
      new GetObjectCommand({
        Bucket: AWS_BUCKET,
        Key: key,
      })
    )

    const response: APIGatewayProxyStructuredResultV2 = {}

    if (object.Body) {
      response.statusCode = 200
      response.body = await object.Body.transformToString('utf-8')
    } else {
      response.statusCode = 404
    }

    if (object.ContentType) {
      response.headers ??= {}
      response.headers['Content-Type'] = object.ContentType
    }

    if (object.CacheControl) {
      response.headers ??= {}
      response.headers['Cache-Control'] = object.CacheControl
    }

    return response
  }
)
