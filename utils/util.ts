import Cookies from 'js-cookie';
// import { useStore } from '@/stores';

import { getUser } from "@/pages/api/user";


const tranNumber = (num: number, point: number, type: number) => {
  let numStr = num.toString();
  // 十万以内直接返回
  if (numStr.length < 6) {
    return numStr;
  }
  //大于8位数是亿
  else if (numStr.length > 8) {
    let a = (num / 100000000).toFixed(point);
    if (type === 1) {
      return a + "亿";
    } else {
      return "10万+";
    }
  }
  //大于6位数是十万 (以10W分割 10W以下全部显示)
  else if (numStr.length > 5) {
    let a = (num / 10000).toFixed(point);
    if (type === 1) {
      return a + "万";
    } else {
      return "10万+";
    }
  }
};

/**
 * 判断环境
 *
 * @return {boolean} true 开发环境
 */
function isDev(): boolean {
  return process.env.REACT_APP_ENV === "development";
}

/**
 * 根据当前环境获取COS配置
 */
function getCosConfig() {
  return {
    bucket: process.env.REACT_APP_COS_BUCKET,
    domain: process.env.REACT_APP_COS_DOMAIN
  }
}

/**
 * 根据当前环境获取socket地址
 */
function getSocketUrl() {
  return process.env.REACT_APP_BASE_SOCKET;
}

/**
 * 根据当前环境获取地址
 */
function getBaseUrl() {
  return process.env.REACT_APP_BASE_API;
}

/**
 * 根据当前是否登录
 */
function isLogined() {
  return new Promise((resolve, reject) => {
    getUser()
      .then((res) => {
        if (res.code === 401) {
          // 未登录
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        resolve(false);
      });
  });
}

/**
 * 获取url中的参数
 *
 * @param {string} url url
 * @param {string} name 参数名
 *
 * @return {string | null}  如果url存在name参数返回对应值，否则返回null
 *
 */
const getUrlParam = (url: string, name: string) => {
  if (!name) {
    return null;
  }
  name = name.replace(/(?=[\\^$*+?.():|{}])/, "\\");
  const reg = new RegExp("(?:[?&]|^)" + name + "=([^?&#]*)", "i");
  const match = url.match(reg);
  return !match ? null : match[1];
};

const isLogin = () => {
  let cookie = Cookies.get('token');
  if(cookie) 
    return true;
  else 
    return false;
}

/**
 * @param {string} x
 */
const setTrim = (x:any) => {
  return x.replace(/^\s+|\s+$/gm,'');
}

/**
 * get对象转化为url参数
 * @param {*} data
 * @param {*} isPrefix
 */
 const queryParams = (data: any, isPrefix: boolean = true) => {
  let prefix = isPrefix ? '?' : ''
  let _result = []
  // if (JSON.stringify(data) === '{}') return
  for (let key in data) {
    let value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value.forEach((_value: any) => {
        _result.push(
          encodeURIComponent(key) + '[]=' + encodeURIComponent(_value)
        )
      })
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }
  }

  return _result.length ? prefix + _result.join('&') : ''
}

export {
  tranNumber,
  isDev,
  getCosConfig,
  getSocketUrl,
  getBaseUrl,
  isLogined,
  getUrlParam,
  isLogin,
  setTrim,
  queryParams
};
