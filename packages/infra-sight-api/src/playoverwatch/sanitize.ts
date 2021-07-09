export const sanitize = (name: string): string => name
  .trim()
  .toLowerCase()
  .replace('ú', 'u')
  .replace('ö', 'o')
  .replace(/\s+/g, '_')
  .replace(/_-_/g, '__')
  .replace(/-/g, '_')
  .replace(/[^a-z0-9_]/g, '')