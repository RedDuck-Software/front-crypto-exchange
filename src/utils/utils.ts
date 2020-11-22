export function getAfterCommaSigns (x: string) {
  if (x != undefined) {
    // @ts-ignore
    return x.includes('.') ? x.split('.').pop().length : 0
  }
  return 0
}
