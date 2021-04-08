import fetch from '@/utils/fetch';

export function getHotList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/hotVideos',
        params
    });
}

export function getCateList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/categories',
        params
    });
}

export function getTalentList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/authors',
        params
    });
}
export function getTalentDetail(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/authorDetail',
        params
    });
}
export function getTalentInfo(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/authorInfo',
        params
    });
}