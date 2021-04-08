import fetch from '@/utils/fetch';

// 分组
export function getCollectGroup(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/group',
        params
    });
}
export function addCollectGroup(params?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/data/group',
        params
    });
}
export function putCollectGroup(params?: any): Promise<any> {
    return fetch({
        method: 'PUT',
        url: '/api/data/group',
        params
    });
}
export function delCollectGroup(params?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/data/group',
        params
    });
}
// 移动收藏到分组
export function moveCollectGroup(params?: any): Promise<any> {
    return fetch({
        method: 'PUT',
        url: '/api/data/channelGroup',
        params
    });
}

// 收藏分类
export function getCollectCate(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/favoriteCategory',
        params
    });
}
// 添加到收藏
export function postCollect(params?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/data/favorite',
        params
    });
}
// 取消收藏
export function delCollect(params?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/data/favorite',
        params
    });
}

// 视频号收藏列表
export function getAuthorList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/favoriteChannel',
        params
    });
}
// 视频收藏列表
export function getVideoList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/favoriteFeed',
        params
    });
}