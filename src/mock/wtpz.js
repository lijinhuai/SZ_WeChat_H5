import { param2Obj } from '@/utils'
export default {
  listHpzl: config => {
    return [{
      dm: '0001',
      value: '小型汽车'
    },
    {
      dm: '0002',
      value: '大型汽车'
    }
    ]
  },
  listDldm: config => {
    return [{
      dm: '0001',
      value: '测试违法地点1'
    },
    {
      dm: '0002',
      value: '测试违法地点2'
    }
    ]
  },
  listLddm: (config) => {
    return [{
      dm: '0001',
      value: '测试道路号码1'
    },
    {
      dm: '0002',
      value: '测试道路号码2'
    }
    ]
  }
}
