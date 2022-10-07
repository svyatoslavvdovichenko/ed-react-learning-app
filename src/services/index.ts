import axios from 'axios'
import qs from 'qs'

export const API_URL = 'https://api-challenger.fortech.dev/api/'

export const camelCase = (value: string): string =>
  value.replace(/_([a-z])/g, (item) => item[1].toUpperCase()).replace('_', '')

export const isObject = (value: any): boolean => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

export const isString = (value: any): value is string =>
  typeof value === 'string'

export const snakeCase = (value: string): string =>
  value.replace(/([A-Z])/g, (item) => `_${item[0].toLowerCase()}`)

export const transformKeys = (
  data: any,
  transformer: (value: string) => string,
): any => {
  // Transform all values in array
  if (Array.isArray(data)) {
    return data.map((item) => transformKeys(item, transformer))
  }

  // Transform all keys in object
  if (isObject(data)) {
    return Object.fromEntries(
      Object.keys(data).map((key) => [
        transformer(key),
        transformKeys(data[key], transformer),
      ]),
    )
  }

  // If this is not a FormData, nor Array, or Object - return value as is
  return data
}

export const createApi = () => {
  return axios.create({
    baseURL: API_URL,
    paramsSerializer: (params) =>
      qs.stringify(transformKeys(params, snakeCase)),
    responseType: 'json',
    timeout: 30000,
  })
}
