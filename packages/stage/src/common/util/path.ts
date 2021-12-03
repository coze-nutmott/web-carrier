export function getQueryString(queryObj: Record<string, any>): string {
  return Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`)
    .join('&');
}
