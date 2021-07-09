const getEnvironmentVariable = (name: string): string | null => {
  try {
    return process.env[name] ?? null
  } catch {
    try {
      // @ts-ignore
      return import.meta.env[name] ?? null
    } catch {
      return null
    }
  }
}

export const INFRA_SIGHT_API_URL = getEnvironmentVariable('INFRA_SIGHT_API_URL') ?? 'https://infra-sight.api.aidan.pro/'