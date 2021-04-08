import fetch from '@/utils/fetch';

// export function getCategory(params?: any): Promise<any> {
//     return fetch({
//         method: 'GET',
//         url: '/api/data/category',
//         params
//     });
// }

export function getList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/hotVideo',
        params
    });
}
export function getDetail(params?: any):Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/videoDetail',
        params
    });
}
export function getDetailChart(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/videoDetailGraphic',
        params
    })
}