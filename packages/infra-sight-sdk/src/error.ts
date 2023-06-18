import type { InfraSightAccountList } from './overwatch/types/infra-sight-account-list.js'
import type { InfraSightAccount } from './overwatch/types/infra-sight-account.js'
import type { InfraSightResolutionStrategies } from './overwatch/types/infra-sight-resolution-strategies.js'

export type InfraSightErrorContextSource = 'Consumer' | 'InfraSight' | 'Overwatch'

export type InfraSightErrorContextCode<Source extends InfraSightErrorContextSource> = {
  Consumer:
    | 'ConsumerInvalidOptions'
    | 'ConsumerPrivateProfile'
    | 'ConsumerUnknownAccount'
    | 'ConsumerUnresolvableAccount'
  InfraSight: 'InfraSightUnknown'
  Overwatch: 'OverwatchInvalidGateway' | 'OverwatchUnparsableContent'
}[Source]

export type InfraSightErrorContextDetail<
  Code extends InfraSightErrorContextCode<InfraSightErrorContextSource>
> = {
  ConsumerInvalidOptions: {
    options: string[]
  }
  ConsumerPrivateProfile: {
    username: string
    resolution_strategy: InfraSightResolutionStrategies
    account: InfraSightAccount
  }
  ConsumerUnknownAccount: {
    username: string
  }
  ConsumerUnresolvableAccount: {
    username: string
    resolution_strategy: InfraSightResolutionStrategies
    accounts: InfraSightAccountList
  }
  InfraSightUnknown: undefined
  OverwatchInvalidGateway: {
    url: string
    status: number
    body: string | null
  }
  OverwatchUnparsableContent: undefined
}[Code]

export interface InfraSightErrorContext<
  Code extends InfraSightErrorContextCode<InfraSightErrorContextSource> = InfraSightErrorContextCode<InfraSightErrorContextSource>
> {
  id: string | null
  source: Code extends `Consumer${string}`
    ? 'Consumer'
    : Code extends `InfraSight${string}`
    ? 'InfraSight'
    : Code extends `Overwatch${string}`
    ? 'Overwatch'
    : never
  code: Code
  message: string
  detail: InfraSightErrorContextDetail<Code>
}

export interface InfraSightErrorObject<
  Code extends InfraSightErrorContextCode<InfraSightErrorContextSource> = InfraSightErrorContextCode<InfraSightErrorContextSource>
> extends InfraSightErrorContext<Code> {
  $$InfraSightError: true
}

export class InfraSightError<
    Code extends InfraSightErrorContextCode<InfraSightErrorContextSource> = InfraSightErrorContextCode<InfraSightErrorContextSource>
  >
  extends Error
  implements InfraSightErrorContext<Code>
{
  static serialize<
    Code extends InfraSightErrorContextCode<InfraSightErrorContextSource> = InfraSightErrorContextCode<InfraSightErrorContextSource>
  >(error: InfraSightError<Code>): InfraSightErrorObject {
    return {
      $$InfraSightError: true,
      id: error.id,
      source: error.source,
      code: error.code,
      message: error.message,
      detail: error.detail,
    }
  }

  static deserialize<
    Code extends InfraSightErrorContextCode<InfraSightErrorContextSource> = InfraSightErrorContextCode<InfraSightErrorContextSource>
  >(error: unknown): InfraSightError<Code | 'InfraSightUnknown'> {
    if (
      error &&
      typeof error === 'object' &&
      '$$InfraSightError' in error &&
      error['$$InfraSightError'] === true
    ) {
      return new InfraSightError(
        (error as InfraSightErrorObject<Code>).source,
        (error as InfraSightErrorObject<Code>).code,
        (error as InfraSightErrorObject<Code>).message,
        (error as InfraSightErrorObject<Code>).detail,
        (error as InfraSightErrorObject<Code>).id
      )
    } else {
      return new InfraSightError('InfraSight', 'InfraSightUnknown', 'Unknown error', undefined)
    }
  }

  constructor(
    public readonly source: InfraSightErrorContext<Code>['source'],
    public readonly code: InfraSightErrorContext<Code>['code'],
    public override readonly message: string,
    public readonly detail: InfraSightErrorContext<Code>['detail'],
    public readonly id: InfraSightErrorContext<Code>['id'] = null
  ) {
    super(message)
  }
}
