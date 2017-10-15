import fetch from '@/utils/fetch'

export function loginByUsername (username, password) {
  const params = {
    username,
    password
  }
  return fetch({
    url: '/login',
    method: 'get',
    params: params
  })
}

export function logout () {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
