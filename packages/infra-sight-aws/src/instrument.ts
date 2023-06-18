import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { AwsLambdaInstrumentation } from '@opentelemetry/instrumentation-aws-lambda'
import { AwsInstrumentation } from '@opentelemetry/instrumentation-aws-sdk'
import { Resource } from '@opentelemetry/resources'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node'
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'rey-app-otlp-dev-node',
  }),
})

provider.addSpanProcessor(
  new SimpleSpanProcessor(new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' }))
)
provider.register()

registerInstrumentations({
  instrumentations: [
    new AwsInstrumentation({
      suppressInternalInstrumentation: true,
    }),
    new AwsLambdaInstrumentation({
      disableAwsContextPropagation: true,
    }),
  ],
})
