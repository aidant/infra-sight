import { SpanKind, SpanStatusCode, trace, type Attributes, type Span } from '@opentelemetry/api'
import { SemanticAttributes } from '@opentelemetry/semantic-conventions'

export interface TraceOptions<Method extends (this: any, ...paramaters: any[]) => any> {
  name: `InfraSight.${'function' | 'utility' | 'parser'}.${string}`
  with?: (
    this: { result?: Readonly<Awaited<ReturnType<Method>>> },
    ...paramaters: Readonly<Parameters<Method>>
  ) => Attributes
}

export const createTraceFunction = (name: `@infra-sight/${string}`) => {
  const tracer = trace.getTracer(name, '2')

  return <Method extends (this: any, ...paramaters: any[]) => any>(
    options: TraceOptions<Method>,
    method: Method
  ): Method => {
    return Object.defineProperties(function (
      this: ThisParameterType<Method>,
      ...paramaters: Parameters<Method>
    ): ReturnType<Method> {
      return tracer.startActiveSpan(
        options.name,
        {
          kind: SpanKind.SERVER,
          attributes: {
            [SemanticAttributes.CODE_FUNCTION]: method.name,
          },
        },
        (span: Span): ReturnType<Method> => {
          let result: ReturnType<Method>

          try {
            result = method.apply(this, paramaters)
          } catch (error) {
            span.recordException(error instanceof Error ? error : String(error))
            span.setStatus({
              code: SpanStatusCode.ERROR,
            })
            if (options.with) span.setAttributes(options.with.apply({}, paramaters))
            span.end()
            throw error
          }

          if (
            result &&
            typeof result === 'object' &&
            'then' in result &&
            typeof result.then === 'function'
          ) {
            return result.then(
              (result: Awaited<ReturnType<Method>>) => {
                span.setStatus({ code: SpanStatusCode.OK })
                if (options.with) span.setAttributes(options.with.apply({ result }, paramaters))
                span.end()
                return result
              },
              (error: unknown) => {
                span.recordException(error instanceof Error ? error : String(error))
                span.setStatus({
                  code: SpanStatusCode.ERROR,
                })
                if (options.with) span.setAttributes(options.with.apply({}, paramaters))
                span.end()
                throw error
              }
            )
          } else {
            span.setStatus({ code: SpanStatusCode.OK })
            if (options.with) span.setAttributes(options.with.apply({ result }, paramaters))
            span.end()
            return result
          }
        }
      )
    },
    Object.getOwnPropertyDescriptors(method)) as Method
  }
}

export const reportError = (error: unknown) => {
  trace.getActiveSpan()?.recordException(error instanceof Error ? error : String(error))
}

export const log = (message: string, attributes: Attributes) => {
  trace.getActiveSpan()?.addEvent(message, attributes)
}

export const flatten = (prefix: string, object: unknown): Attributes => {
  const attributes: Attributes = {}

  if (object && typeof object === 'object') {
    for (const [key, value] of Object.entries(object)) {
      Object.assign(attributes, flatten(`${prefix}.${key}`, value))
    }
  } else if (
    typeof object === 'string' ||
    typeof object === 'number' ||
    typeof object === 'boolean'
  ) {
    attributes[prefix] = object
  }

  return attributes
}
