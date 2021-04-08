import fetch from '@/utils/fetch';

export function postOrder(params?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/payment/alipay',
        params
    });
}

export function postOrderResult(params?: any): Promise<any> {
    return fetch({
        method: 'POST',
        url: '/api/payment/result',
        params
    });
}

export function getOrderList(params?: any): Promise<any> {
    return fetch({
        method: 'GET',
        url: '/api/data/order',
        params
    });
}