var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.3.23:8081/api/"'
  BASE_API: '"http://172.17.122.3:8081/api/"'
})
