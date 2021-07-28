import request from '@/utils/request'

export function getMeal() {
    return request({
        url: '/mealSet/list',
        method: 'get',
    })
}

export function addMeal(data) {
    return request({
        url: '/mealSet',
        method: 'post',
        data
    })
}

export function updateMeal(data) {
    return request({
        url: '/mealSet',
        method: 'put',
        data
    })
}

export function deleteMeal(id) {
    const pathUrl = '/mealSet/' + id
    return request({
        url: pathUrl,
        method: 'delete',
    })
}




export function getSnacks() {
    return request({
        url: '/mealSnack/list',
        method: 'get',
    })
}

export function addSnacks(data) {
    return request({
        url: '/mealSnack',
        method: 'post',
        data
    })
}

export function updateSnacks(data) {
    return request({
        url: '/mealSnack',
        method: 'put',
        data
    })
}

export function deleteSnacks(id) {
    const pathUrl = '/mealSnack/' + id
    return request({
        url: pathUrl,
        method: 'delete',
    })
}

