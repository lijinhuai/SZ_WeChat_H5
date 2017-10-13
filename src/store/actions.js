import * as types from './mutation-types'
import {
  fetchHpzlList,
  fetchDlxzList,
  fetchDldmList,
  fetchLddmList,
  fetchCsysList,
  fetchCllxList,
  fetchClflList,
  fetchCltyList
} from '@/api/pecc'

const actions = {
  setHpzlDict: ({
    commit
  }) => {
    fetchHpzlList().then(response => {
      const data = response.data
      commit(types.SET_HPZL_DICT, {
        dictList: data
      })
    })
  },
  setDlxzDict: ({
    commit
  }) => {
    fetchDlxzList().then(response => {
      const data = response.data
      commit(types.SET_DLXZ_DICT, {
        dictList: data
      })
    })
  },
  setPtDldmDict: ({
    commit
  }) => {
    fetchDldmList({
      'dlxz': '1'
    }).then(response => {
      const data = response.data
      commit(types.SET_PTDLDM_DICT, {
        dictList: data
      })
    })
  },
  setPtLddmDict: ({
    commit
  }) => {
    fetchLddmList({
      'dlxz': '1'
    }).then(response => {
      const data = response.data
      commit(types.SET_PTLDDM_DICT, {
        dictList: data
      })
    })
  },
  setZdDldmDict: ({
    commit
  }) => {
    fetchDldmList({
      'dlxz': '2'
    }).then(response => {
      const data = response.data
      commit(types.SET_ZDDLDM_DICT, {
        dictList: data
      })
    })
  },
  setZdLddmDict: ({
    commit
  }) => {
    fetchLddmList({
      'dlxz': '2'
    }).then(response => {
      const data = response.data
      commit(types.SET_ZDLDDM_DICT, {
        dictList: data
      })
    })
  },
  setCsysDict: ({
    commit
  }) => {
    fetchCsysList().then(response => {
      const data = response.data
      commit(types.SET_CSYS_DICT, {
        dictList: data
      })
    })
  },
  setClflDict: ({
    commit
  }) => {
    fetchClflList().then(response => {
      const data = response.data
      commit(types.SET_CLFL_DICT, {
        dictList: data
      })
    })
  },
  setCllxDict: ({
    commit
  }) => {
    fetchCllxList().then(response => {
      const data = response.data
      commit(types.SET_CLLX_DICT, {
        dictList: data
      })
    })
  },
  setCltyDict: ({
    commit
  }) => {
    fetchCltyList().then(response => {
      const data = response.data
      commit(types.SET_CLTY_DICT, {
        dictList: data
      })
    })
  }
}

export default actions
