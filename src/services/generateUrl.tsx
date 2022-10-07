import qs from 'qs'

export const generateUrl = (options: Record<string, any>): string => {
  return qs.stringify(options, { arrayFormat: 'repeat' })
}
