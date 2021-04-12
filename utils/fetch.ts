import isomorphicFetch from 'isomorphic-fetch'
import { queryParams } from '@/utils/util'
import Cookies from 'js-cookie';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

// ⚠️注意：所有的body必须是json对象
const BASE_URL = '' //"http://localhost:3000";

function initRequest(url: string, params:{ [key: string]: any } | undefined = {}, init?: RequestInit): [string, RequestInit] {
  let headers = {}

  // 判断请求是不是相对路径
  if (!/^http[s]?:|^\/\//.test(url)) {
    url = BASE_URL + url
  }
  // if (init && init.headers) {

    const token = Cookies.get('token');
console.log(token)

    headers = Object.assign(
      token ? {Authorization: `Bearer ${token ? token : ''}`, 'Content-Type': 'application/json;charset=utf-8'} : {},
      headers
    )
  // }

  return [url+queryParams(params), { credentials: 'include', ...init, headers }]
}

export type IFetchRquest = {
  url: string
  method?: Method
  body?: { [key: string]: any } | undefined
  init?: Omit<RequestInit, 'body' | 'method'>
  params?: { [key: string]: any } | undefined
}

/**
 * @description fetch 二次封装
 *
 * @param  {IFetchRquest}
 * {
 *  url:string 请求接口地址, method:Method 请求方式  "GET" | "POST" | "PUT" | "DELETE";
 *  body: BodyInit | null 请求数据;
 *  init: RequestInit 请求配置项
 * }
 *
 * @returns fetch json data
 */
async function fetch(rquest: IFetchRquest): Promise<any> {
  const [url, init] = initRequest(rquest.url, rquest.params,{
    ...rquest.init,
    method: rquest.method || 'GET',
    body: rquest.body ? JSON.stringify(rquest.body) : null
  })

  try {
    const res = await isomorphicFetch(url, init)
    // 判断数据是不是json
    return res.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

export default fetch
