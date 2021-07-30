import request from '@/utils/request'

export function addOrder(data) {
    return request({
        url: '/mealOrder',
        method: 'post',
        data
    })
}