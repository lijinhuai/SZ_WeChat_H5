import Mock from 'mockjs'
import wtpzAPI from '@/mock/wtpz'

Mock.setup({
  timeout: '350-600'
})

// 查询号牌种类字典
Mock.mock(/\/hpzl/, 'get', wtpzAPI.listHpzl)
// 查询道路代码字典
Mock.mock(/\/dldm/, 'get', wtpzAPI.listDldm)
// 查询路段代码字典
Mock.mock(/\/lddm/, 'get', wtpzAPI.listLddm)

export default Mock
