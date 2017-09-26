import fetch from '@/utils/fetch'
// 查询号牌种类字典
export function fetchHpzlList () {
  return fetch({
    url: '/peccapi/hpzl',
    method: 'get'
  })
}
// 查询道路代码字典
export function fetchDldmList () {
  return fetch({
    url: '/peccapi/dldm',
    method: 'get'
  })
}

// 查询路段代码字典
export function fetchLddmList (params) {
  return fetch({
    url: '/peccapi/lddm',
    method: 'get',
    params: params
  })
}

// 查询路段代码字典
export function fetchCsysList () {
  return fetch({
    url: '/peccapi/csys',
    method: 'get'
  })
}

// 查询车辆分类字典
export function fetchClflList () {
  return fetch({
    url: '/peccapi/clfl',
    method: 'get'
  })
}

// 查询车辆分类字典
export function fetchCllxList () {
  return fetch({
    url: '/peccapi/cllx',
    method: 'get'
  })
}

// 查询车辆拖移字典
export function fetchCltyList () {
  return fetch({
    url: '/peccapi/clty',
    method: 'get'
  })
}

// 查询车辆拖移字典
export function uploadPecc (data) {
  return fetch({
    url: '/peccapi/pecc',
    method: 'post',
    data: data
  })
}
