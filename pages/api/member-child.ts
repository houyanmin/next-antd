import fetch from '@/utils/fetch';

// 子账号列表
export function getChildList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/center/manager',
        params
    });
}

// 邀请二维码
export function getInviteCode(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/center/inviteQrcode',
        params
    });
}

// 子账号审核通过
export function postApplyPass(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/center/manager/pass',
        body: data
    });
}

// 子账号审核拒绝
export function postApplyRefuse(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/center/manager/refuse',
        body: data
    });
}

// 子账号审核拒绝
export function postApplyRemove(data?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/center/manager/drop',
        body: data
    });
}