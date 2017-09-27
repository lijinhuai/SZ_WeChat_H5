import {
  hpzlDictList
} from './data/hpzl'
import {
  dldmDictList
} from './data/dldm'
import {
  lddmDictList
} from './data/lddm'
import {
  csysDictList
} from './data/csys'
import {
  clflDictList
} from './data/clfl'
import {
  cllxDictList
} from './data/cllx'
import {
  cltyDictList
} from './data/clty'

export default {
  listHpzl: config => {
    return hpzlDictList
  },
  listDldm: config => {
    return dldmDictList
  },
  listLddm: (config) => {
    return lddmDictList
  },
  listCsys: (config) => {
    return csysDictList
  },
  listClfl: (config) => {
    return clflDictList
  },
  listCllx: (config) => {
    return cllxDictList
  },
  listClty: (config) => {
    return cltyDictList
  },
  uploadPecc: (config) => {
    return 'success'
  }
}
