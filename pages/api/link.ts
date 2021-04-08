import fetch from '@/utils/fetch';

// 创建链接
export function postCreateLink(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/link/extendLink',
        body: data
    });
}

// 删除扩展链接

export function delLink(params?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/link/extendLink',
        params: params
    });
}


// 扩展链接列表
export function getLink(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/link/extendLink',
        params: params
    });
}

// 创建扩展链接轮询
export function getLinkDetail(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/link/extendLinkDetail',
        params: params
    });
}

// 查询商店 & 小程序
export function getStore(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/link/searchWxapp',
        params: data
    });
}

// 微信小程序列表
export function getMiniProList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/link/wxapp',
        params: params
    });
}

// 添加小程序

export function postMiniPro(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/link/wxapp',
        params: data
    });
}


// 删除小程序

export function delMiniPro(params?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/link/wxapp',
        params: params
    });
}

// 我的公众号

export function getWechat(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/link/wechat',
        params: params
    });
}

// 添加公众号

export function postWechat(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/link/wechat',
        params: data
    });
}

// 删除公众号

export function delWechat(params?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/link/wechat',
        params: params
    });
}

// 切换公众号
export function putWechat(params?: any): Promise<any> {
    return fetch({
        method: 'PUT',
        url: '/api/link/wechat',
        params: params
    });
}


// 获取公众号授权链接

export function getWechatAuth(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/link/wechatRedirectUrl',
        params: params
    });
}