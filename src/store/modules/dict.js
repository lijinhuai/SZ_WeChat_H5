import * as types from '../mutation-types'

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
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_HPZL_DICT, {
          dictList
        })
      })
    },
    setPtDldmDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_PTDLDM_DICT, {
          dictList
        })
      })
    },
    setPtLddmDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_PTLDDM_DICT, {
          dictList
        })
      })
    },
    setZdDldmDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_ZDDLDM_DICT, {
          dictList
        })
      })
    },
    setZdLddmDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_ZDLDDM_DICT, {
          dictList
        })
      })
    },
    setCllxDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_CLLX_DICT, {
          dictList
        })
      })
    },
    setClflDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_CLFL_DICT, {
          dictList
        })
      })
    },
    setCltyDict ({
      commit
    }, dictList) {
      return new Promise((resolve) => {
        commit(types.SET_CLTY_DICT, {
          dictList
        })
      })
    }
  }
}

export default dict
