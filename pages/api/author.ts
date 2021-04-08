import fetch from '@/utils/fetch';

export function getCategory(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/category',
        params
    });
}

export function getRegion(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/region',
        params
    });
}

export function getList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/channel',
        params
    });
}


export function postFavorite(data?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/data/favorite',
        body: data
    });
}

export function delFavorite(data?: any): Promise<any> {
    return fetch({
        method: 'DELETE',
        url: '/api/data/favorite',
        body: data
    });
}

export function getChannelDetail(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/channelDetail',
        params
    });
}

// 收录搜索
export function postAuthorSearch(params?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/data/search',
        params
    })
}
// 添加收录
export function postAuthorInclude(params?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/data/channelInclude',
        params
    })
}

// 图表
export function getAuthorData(params?:any):Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/channelDetailGraphic',
        params
    })
}

// 视频
export function getProductionData(params?:any):Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/channelFeedTrends',
        params
    })
}

// 博主信息更新
export function postAuthorRefresh(data?:any):Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/data/refresh',
        body: data
    })
}

// 申请修改分类
export function putAuthorCategory(data?:any):Promise<any> {
    return fetch({
        method: 'PUT',
        url: '/api/data/category',
        body: data
    })
}