import {
  InfraSightError,
  type InfraSightErrorContext,
  type InfraSightErrorContextCode,
  type InfraSightErrorContextSource,
} from '@infra-sight/sdk'
import { trace } from '@opentelemetry/api'

export class InfraSightErrorWithTracing<
  Code extends InfraSightErrorContextCode<InfraSightErrorContextSource> = InfraSightErrorContextCode<InfraSightErrorContextSource>
> extends InfraSightError<Code> {
  constructor(
    public override readonly source: InfraSightErrorContext<Code>['source'],
    public override readonly code: InfraSightErrorContext<Code>['code'],
    public override readonly message: string,
    public override readonly detail: InfraSightErrorContext<Code>['detail']
  ) {
    const context = trace.getActiveSpan()?.spanContext()
    super(source, code, message, detail, context ? `${context.traceId}.${context.spanId}` : null)
  }
}
