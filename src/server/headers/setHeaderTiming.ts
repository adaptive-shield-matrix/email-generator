export type ServerTimingValues = {
  name: string
  amount: number
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing
 */
export function setHeaderTiming(r: Response, values: ServerTimingValues[]): Response {
  const headerValue = values.map((v) => v.name + ";dur=" + Math.trunc(v.amount)).join(", ")
  r.headers.set("Server-Timing", headerValue)
  return r
}
