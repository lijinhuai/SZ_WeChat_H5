import store from '../store'

const initDict = () => {
  return new Promise((resolve, reject) => {
    if (store.getters.hpzlList.length === 0) {
      store.dispatch('setHpzlDict')
    }
    if (store.getters.dlxzList.length === 0) {
      store.dispatch('setDlxzDict')
    }
    if (store.getters.ptDldmList.length === 0) {
      store.dispatch('setPtDldmDict')
    }
    if (store.getters.ptLddmList.length === 0) {
      store.dispatch('setPtLddmDict')
    }
    if (store.getters.zdDldmList.length === 0) {
      store.dispatch('setZdDldmDict')
    }
    if (store.getters.zdLddmList.length === 0) {
      store.dispatch('setZdLddmDict')
    }
    if (store.getters.csysList.length === 0) {
      store.dispatch('setCsysDict')
    }
    if (store.getters.clflList.length === 0) {
      store.dispatch('setClflDict')
    }
    if (store.getters.cllxList.length === 0) {
      store.dispatch('setCllxDict')
    }
    if (store.getters.cltyList.length === 0) {
      store.dispatch('setCltyDict')
    }
  })
}

export {
  initDict
}
