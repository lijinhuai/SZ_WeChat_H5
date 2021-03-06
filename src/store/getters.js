const getters = {
  hpzlList: state => state.dict.hpzlList,
  dlxzList: state => state.dict.dlxzList,
  ptDldmList: state => state.dict.ptDldmList,
  ptLddmList: state => state.dict.ptLddmList,
  zdDldmList: state => state.dict.zdDldmList,
  zdLddmList: state => state.dict.zdLddmList,
  csysList: state => state.dict.csysList,
  clflList: state => state.dict.clflList,
  cllxList: state => state.dict.cllxList,
  cltyList: state => state.dict.cltyList,

  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters
}

export default getters
