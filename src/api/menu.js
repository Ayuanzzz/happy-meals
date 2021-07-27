import request from '@/utils/request'

export function addMeal(data) {
    return request({
        url: '/mealSet',
        method: 'post',
        data
    })
}

export function getMeal() {
    return request({
        url: '/mealSet/list',
        method: 'get',
    })
}

