import axios from '@/utils/axios';

export function getLevelPrice(): Promise<any> {
    return axios({
        method: 'GET',
        url: '/api/center/levelPrice'
    });
}
export function postCheckInviteCode(params?:any): Promise<any> {
    return axios({
        method: 'POST',
        url: '/api/distributor/checkCode',
        params
    })
}
export function getInviteCode(): Promise<any> {
    return axios({
        method: 'GET',
        url: '/api/distributor/inviteCode'
    })
}