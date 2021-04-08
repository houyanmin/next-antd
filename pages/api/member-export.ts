import fetch from '@/utils/fetch';

// 导出
export function getExportList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/center/export',
        params
    });
}