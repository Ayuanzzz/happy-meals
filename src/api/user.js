import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/mealUser/regist',
    method: 'post',
    data
  })
}

export function login(query) {
  return request({
    url: '/mealUser/login',
    method: 'get',
    params: query
  })
}

export function getInfo() {
  return request({
    url: '/mealUser/userInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/mealUser/logout',
    method: 'post',
  })
}
