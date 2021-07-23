import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/mealUser/regist',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/mealUser/login',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/mealUser/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/mealUser/user/logout',
    method: 'post'
  })
}
