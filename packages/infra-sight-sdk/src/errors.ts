import { GetOverwatchAccountOptions } from './playoverwatch/functions/get-overwatch-account.js'
import { InfraSightAccountList } from './playoverwatch/types/infra-sight-account-list.js'
import { InfraSightAccount } from './playoverwatch/types/infra-sight-account.js'

export enum ErrorType {
  Application = 'Application',
  User = 'User',
}

export enum ErrorCode {
  PlayOverwatchInvalidGateway = 'PlayOverwatchInvalidGateway',
  PlayOverwatchUnparsableContent = 'PlayOverwatchUnparsableContent',
  PlayOverwatchPrivateProfile = 'PlayOverwatchPrivateProfile',
  PlayOverwatchUnknownAccount = 'PlayOverwatchUnknownAccount',
  PlayOverwatchUnresolvableAccount = 'PlayOverwatchUnresolvableAccount',
  InfraSightInvalidOptions = 'InfraSightInvalidOptions',
}

interface ErrorDetail extends Record<ErrorCode, object> {
  PlayOverwatchUnresolvableAccount: {
    options: GetOverwatchAccountOptions
    accounts: InfraSightAccountList
  },
  PlayOverwatchPrivateProfile: {
    account: InfraSightAccount
  },
  InfraSightInvalidOptions: {
    options: string[]
  },
}

const Errors: Record<ErrorCode, { type: ErrorType, message: string }> = {
  PlayOverwatchInvalidGateway: {
    type: ErrorType.Application,
    message: 'Unable to load data from playoverwatch.com at the moment, please try again later.'
  },
  PlayOverwatchUnparsableContent: {
    type: ErrorType.Application,
    message: 'Unable to load data from playoverwatch.com at the moment, please try again later.'
  },
  PlayOverwatchPrivateProfile: {
    type: ErrorType.User,
    message: 'Sorry, the requested profile is private.'
  },
  PlayOverwatchUnknownAccount: {
    type: ErrorType.User,
    message: 'We could not find the account you requested, please ensure you have spelt everything correctly.'
  },
  PlayOverwatchUnresolvableAccount: {
    type: ErrorType.User,
    message: 'We found several accounts that match your request, try including platform or specifying the full account name.'
  },
  InfraSightInvalidOptions: {
    type: ErrorType.User,
    message: 'Invalid request options.'
  }
}

export class InfraSightError<T extends ErrorCode> extends Error {
  type: typeof Errors[T]['type']

  constructor (
    public code: T,
    public detail: ErrorDetail[T]
  ) {
    super(Errors[code].message)
    this.type = Errors[code].type
  }
}

interface InfraSightErrorObject<T extends ErrorCode = ErrorCode> {
  $$InfraSightError: true
  code: T
  type: typeof Errors[T]['type']
  message: string
  detail: ErrorDetail[T]
}

export const createErrorFromObject = (error: object): Error => {
  if ((error as any)?.$$InfraSightError) {
    return new InfraSightError((error as InfraSightErrorObject).code, (error as InfraSightErrorObject).detail)
  } else {
    return Object.assign(new Error('Unable to identify error.'), error)
  }
}

export const createObjectFromError = <T extends ErrorCode>(error: InfraSightError<T>): InfraSightErrorObject<T> => {
  return {
    $$InfraSightError: true,
    code: error.code,
    type: error.type,
    message: error.message,
    detail: error.detail,
  }
}
