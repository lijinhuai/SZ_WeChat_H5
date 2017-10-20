import * as types from '../mutation-types'

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

const dict = {
  // initial state
  state: {
    hpzlList: [],
    dlxzList: [],
    ptDldmList: [],
    ptLddmList: [],
    zdDldmList: [],
    zdLddmList: [],
    csysList: [],
    clflList: [],
    cllxList: [],
    cltyList: []
  },

  // getters
  getters: {
    // allProducts: state => state.all
  },

  // mutations
  mutations: {
    [types.SET_HPZL_DICT]: (state, {
      dictList
    }) => {
      state.hpzlList = dictList
    },
    [types.SET_DLXZ_DICT]: (state, {
      dictList
    }) => {
      state.dlxzList = dictList
    },
    [types.SET_PTDLDM_DICT]: (state, {
      dictList
    }) => {
      state.ptDldmList = dictList
    },
    [types.SET_PTLDDM_DICT]: (state, {
      dictList
    }) => {
      state.ptLddmList = dictList
    },
    [types.SET_ZDDLDM_DICT]: (state, {
      dictList
    }) => {
      state.zdDldmList = dictList
    },
    [types.SET_ZDLDDM_DICT]: (state, {
      dictList
    }) => {
      state.zdLddmList = dictList
    },
    [types.SET_CSYS_DICT]: (state, {
      dictList
    }) => {
      state.csysList = dictList
    },
    [types.SET_CLLX_DICT]: (state, {
      dictList
    }) => {
      state.cllxList = dictList
    },
    [types.SET_CLFL_DICT]: (state, {
      dictList
    }) => {
      state.clflList = dictList
    },
    [types.SET_CLTY_DICT]: (state, {
      dictList
    }) => {
      state.cltyList = dictList
    }
  },
  // actions
  actions: {
    setHpzlDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchHpzlList().then(response => {
          const data = response.data
          commit(types.SET_HPZL_DICT, {
            dictList: data
          })
        })
      })
    },
    setDlxzDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchDlxzList().then(response => {
          const data = response.data
          commit(types.SET_DLXZ_DICT, {
            dictList: data
          })
        })
      })
    },
    setPtDldmDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchPtDldmList().then(response => {
          const data = response.data
          commit(types.SET_PTDLDM_DICT, {
            dictList: data
          })
        })
      })
    },
    setPtLddmDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchPtLddmList().then(response => {
          const data = response.data
          commit(types.SET_PTLDDM_DICT, {
            dictList: data
          })
        })
      })
    },
    setZdDldmDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchZdDldmList().then(response => {
          const data = response.data
          commit(types.SET_ZDDLDM_DICT, {
            dictList: data
          })
        })
      })
    },
    setZdLddmDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchZdLddmList().then(response => {
          const data = response.data
          commit(types.SET_ZDLDDM_DICT, {
            dictList: data
          })
        })
      })
    },
    setCsysDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchCsysList().then(response => {
          const data = response.data
          commit(types.SET_CSYS_DICT, {
            dictList: data
          })
        })
      })
    },
    setCllxDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchCllxList().then(response => {
          const data = response.data
          commit(types.SET_CLLX_DICT, {
            dictList: data
          })
        })
      })
    },
    setClflDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchClflList().then(response => {
          const data = response.data
          commit(types.SET_CLFL_DICT, {
            dictList: data
          })
        })
      })
    },
    setCltyDict ({
      commit
    }) {
      return new Promise((resolve) => {
        fetchCltyList().then(response => {
          const data = response.data
          commit(types.SET_CLTY_DICT, {
            dictList: data
          })
        })
      })
    }
  }
}

export default dict
