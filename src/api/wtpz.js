import fetch from '@/utils/fetch'
// 查询号牌种类字典
export function fetchHpzlList () {
  return fetch({
    url: '/hpzl',
    method: 'get'
  })
}
// 查询道路代码字典
export function fetchDldmList () {
  return fetch({
    url: '/dldm',
    method: 'get'
  })
}

// 查询路段代码字典
export function fetchLddmList (query) {
  return fetch({
    url: '/lddm',
    method: 'get',
    params: query
  })
}
