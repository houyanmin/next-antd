import fetch from "@/utils/fetch";

export function getList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/rank/list',
        params
    });
}