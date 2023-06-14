export const InfraSightRank = {
  Bronze: 'bronze',
  Silver: 'silver',
  Gold: 'gold',
  Platinum: 'platinum',
  Diamond: 'diamond',
  Master: 'master',
  Grandmaster: 'grandmaster',
  Top500: 'top500',
} as const
export type InfraSightRank = (typeof InfraSightRank)[keyof typeof InfraSightRank]
