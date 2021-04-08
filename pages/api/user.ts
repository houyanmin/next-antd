import fetch from "@/utils/fetch";


/**
 * @link
 *
 * @desc 手机号认证
 *
 * @param {ILoginForm} form 认证参数
 */
export function postAuth(form: any): Promise<any> {
  const formObj = { ...form };

  // eslint-disable-next-line dot-notation

  return fetch({
    url: "/api/auth/bindMobile",
    method: "POST",
    body: {
      ...formObj,
    },
  });
}

/**
 * 获取验证码
 */
export function getVerify(m: string | number): Promise<any> {
  return fetch({
    url: "/api/auth/sendCode",
    method: "POST",
    body: {
      mobile: m,
    },
  });
}

/**
 * 用户信息
 */
export function getUser(): Promise<any> {
  return fetch({
    url: "/api/center/info",
    method: "GET",
  });
}

/**
 * @link
 *
 * @desc 退出登陆
 */
export function postExit(): Promise<any> {
  return fetch({
    url: "/api/auth/logout",
    method: "POST",
  });
}

 
 /**
  * @param params 
  * 
  * @desc 获取二维码
  */
export function getQrcode(params?:any): Promise<any> {
  return fetch({
    method: "GET",
    url: "/api/auth/qrcode",
    params
  });
}
