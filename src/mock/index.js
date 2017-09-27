import Mock from 'mockjs'
import peccAPI from '@/mock/pecc'

Mock.setup({
  timeout: '350-600'
})

// 查询号牌种类字典
Mock.mock(/\/peccapi\/hpzl/, 'get', peccAPI.listHpzl)
// 查询道路代码字典
Mock.mock(/\/peccapi\/dldm/, 'get', peccAPI.listDldm)
// 查询路段代码字典
Mock.mock(/\/peccapi\/lddm/, 'get', peccAPI.listLddm)
// 查询车身颜色字典
Mock.mock(/\/peccapi\/csys/, 'get', peccAPI.listCsys)
// 查询车辆类型字典
Mock.mock(/\/peccapi\/cllx/, 'get', peccAPI.listCllx)
// 查询车辆分类字典
Mock.mock(/\/peccapi\/clfl/, 'get', peccAPI.listClfl)
// 查询车辆拖移字典
Mock.mock(/\/peccapi\/clty/, 'get', peccAPI.listClty)
// 上传违停拍照数据
Mock.mock(/\/peccapi\/pecc/, 'post', peccAPI.uploadPecc)

export default Mock
