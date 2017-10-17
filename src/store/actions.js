import * as types from './mutation-types'
import {
  fetchHpzlList,
  fetchDlxzList,
  fetchPtDldmList,
  fetchPtLddmList,
  fetchZdDldmList,
  fetchZdLddmList,
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
    fetchPtDldmList().then(response => {
      const data = response.data
      commit(types.SET_PTDLDM_DICT, {
        dictList: data
      })
    })
  },
  setPtLddmDict: ({
    commit
  }) => {
    fetchPtLddmList().then(response => {
      const data = response.data
      commit(types.SET_PTLDDM_DICT, {
        dictList: data
      })
    })
  },
  setZdDldmDict: ({
    commit
  }) => {
    fetchZdDldmList().then(response => {
      const data = response.data
      commit(types.SET_ZDDLDM_DICT, {
        dictList: data
      })
    })
  },
  setZdLddmDict: ({
    commit
  }) => {
    fetchZdLddmList().then(response => {
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
