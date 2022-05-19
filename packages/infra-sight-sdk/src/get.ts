import { INFRA_SIGHT_API_URL } from './environment.js'
import { createErrorFromObject } from './errors.js'
import { InfraSightPaginationOptions } from './playoverwatch/types/infra-sight-pagination-options.js'
import { InfraSightPaginationResponse } from './playoverwatch/types/infra-sight-pagination-response.js'

type Params = Record<string, undefined | string | (undefined | string)[]>

export const get = async <T>(path: string, params: Params = {}): Promise<T> => {
  const url = new URL(path, INFRA_SIGHT_API_URL)

  for (const [parameter, value] of Object.entries(params)) {
    const values = Array.isArray(value) ? value : [value]
    for (const value of values) {
      if (value) url.searchParams.append(parameter, value)
    }
  }

  const response = await fetch(url.href)
  if (!response.ok) throw createErrorFromObject(await response.json())
  return response.json()
}

export async function* list(path: string, { page_token }: InfraSightPaginationOptions) {
  do {
    const response = await get<InfraSightPaginationResponse>(path, {
      page_token,
    })
    page_token = response.page_token
    yield* response.items
  } while (page_token)
}
