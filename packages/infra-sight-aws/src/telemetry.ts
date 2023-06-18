import { createTraceFunction, type TraceOptions } from '@infra-sight/telemetry'
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
        return {
          // @ts-expect-error
          ...options.with?.apply(this, arguments),
        }
      },
    },
    fn
  )
