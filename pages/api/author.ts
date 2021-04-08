import fetch from '../../utils/fetch'

interface ILoginBody {
  name: string
  password: string
  remember?: boolean
  stamp?: string
}

export function fetchLogin(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function postAuthorSearch(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function postAuthorInclude(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function postFavorite(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function delFavorite(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function getCategory(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function getRegion(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}

export function getList(body?: ILoginBody) {
  return fetch({
    url: '/login',
    body
  })
}
