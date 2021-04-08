import fetch from '@/utils/fetch';

export function getTopicList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/topic/list',
        params
    })
}
export function getTopicDetail(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/topic/detail',
        params
    })
}

export function getCollectTopic(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/center/favoriteTopic',
        params
    })
}