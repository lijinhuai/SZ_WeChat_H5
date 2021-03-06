import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
// import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/',
  redirect: '/login'
    // hidden: true
},
{
  path: '/login',
  component: _import('login/index')
    // hidden: true
},
{
  path: '/hello',
  component: _import('Hello'),
  meta: {
    role: ['admin']
  }
    // hidden: true
},
{
  path: '/result',
  component: _import('Result'),
  meta: {
    role: ['admin']
  }
    // hidden: true
},
{
  path: '/success',
  component: _import('Success'),
  meta: {
    role: ['admin']
  }
},
{
  path: '/warn',
  component: _import('Warn'),
  meta: {
    role: ['admin']
  }
},
{
  path: '/404',
  component: _import('errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('errorPage/401'),
  hidden: true
}
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]
