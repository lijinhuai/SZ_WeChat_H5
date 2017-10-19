/*
 * Created by jinhuailee on Thu Oct 19 2017 12:33:26
 *
 * Copyright 2001-2017 Suzhou CyberTech Technology Co., Ltd.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './permission' // 权限
import './UI'
// import './mock' // 该项目所有请求使用mockjs模拟

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
