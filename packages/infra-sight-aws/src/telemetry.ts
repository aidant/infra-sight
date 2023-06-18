import { INFRA_SIGHT_API_URL } from '@infra-sight/sdk'
import { createTraceFunction, type TraceOptions } from '@infra-sight/telemetry'
import { SemanticAttributes } from '@opentelemetry/semantic-conventions'
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda'

export const trace = createTraceFunction('@infra-sight/aws')

export const traceEndpoint = <
  Handler extends (
    event: APIGatewayProxyEventV2,
    context: Context
  ) => Promise<APIGatewayProxyStructuredResultV2>
>(
  options: TraceOptions<Handler>,
  fn: Handler
): Handler =>
  trace<Handler>(
    {
      name: options.name,
      with: function (event, context) {
        const attributes: Record<string, string | number | boolean> = {}

        if (this.result) {
          Object.assign(attributes, {
            [SemanticAttributes.AWS_LAMBDA_INVOKED_ARN]: context.invokedFunctionArn,

            [SemanticAttributes.HTTP_METHOD]: event.requestContext.http.method,
            [SemanticAttributes.HTTP_URL]: event.rawPath,
            [SemanticAttributes.HTTP_TARGET]: `${event.requestContext.http.method} ${event.rawPath} ${event.requestContext.http.protocol}`,
            [SemanticAttributes.HTTP_HOST]: event.headers['host'],
            [SemanticAttributes.HTTP_SCHEME]: event.headers['x-forwarded-proto'],
            [SemanticAttributes.HTTP_STATUS_CODE]: this.result.statusCode,
            [SemanticAttributes.HTTP_FLAVOR]: event.requestContext.http.protocol
              .replace('HTTP/', '')
              .replace(/^1$/, '1.0')
              .replace(/^2$/, '2.0')
              .replace(/^3$/, '3.0'),
            [SemanticAttributes.HTTP_USER_AGENT]: event.requestContext.http.userAgent,
            [SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH]:
              this.result.headers?.['content-length'] || this.result.body?.length,
            [SemanticAttributes.HTTP_SERVER_NAME]: new URL(INFRA_SIGHT_API_URL).hostname,
            [SemanticAttributes.HTTP_ROUTE]: event.routeKey.replace(
              `${event.requestContext.http.method} `,
              ''
            ),
            [SemanticAttributes.HTTP_CLIENT_IP]: event.requestContext.http.sourceIp,

            [SemanticAttributes.FAAS_TRIGGER]: 'http',
            [SemanticAttributes.FAAS_EXECUTION]: context.awsRequestId,
            [SemanticAttributes.FAAS_COLDSTART]: undefined,
            [SemanticAttributes.FAAS_INVOKED_NAME]: context.functionName,
            [SemanticAttributes.FAAS_INVOKED_PROVIDER]: 'aws',
            [SemanticAttributes.FAAS_INVOKED_REGION]: process.env['AWS_REGION'],
          })
        }

        Object.assign(attributes, options.with?.apply(this, arguments as any))

        return attributes
      },
    },
    fn
  )
