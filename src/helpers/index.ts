export const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

export const objectKeysToSnakeCase = (obj: Record<string, any>) => {
  const newObject: Record<string, any> = {}
  for (const camelKeys in obj) {
    newObject[camelToSnakeCase(camelKeys)] = obj[camelKeys]
  }
  return newObject
}
