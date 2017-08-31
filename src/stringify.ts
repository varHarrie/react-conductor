import * as qs from 'query-string'

export interface IParams {
  [name: string]: string | number | boolean
}

export default function stringify (path: string, params: IParams = {}, query?: IParams) {
  let url = path.split('/').map((p) => {
    return p && p[0] === ':'
      ? params[p.slice(1)] || 'undefined'
      : p
  }).join('/')

  if (query) {
    url += '?' + qs.stringify(query)
  }

  return url
}
