export const InfraSightResolutionStrategy = {
  CaseSensitive: 'case_sensitive',
  LastUpdated: 'last_updated',
  Public: 'public',
} as const
export type InfraSightResolutionStrategy =
  (typeof InfraSightResolutionStrategy)[keyof typeof InfraSightResolutionStrategy]
