import request from '@/utils/request'

export function addOrder(data) {
    return request({
        url: '/mealOrder',
        method: 'post',
        data
    })
}

export function getOrder(query) {
    return request({
        url: '/mealOrder/page',
        method: 'get',
        params: query
    })
}