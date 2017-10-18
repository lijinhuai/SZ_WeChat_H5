<template>
  <div>
  </div>
</template>

<script>
import weui from 'weui.js'

export default {
  name: 'login',
  mounted () {
    const username = this.$route.query.username
    const password = this.$route.query.password
    if (username && password) {
      this.$store.dispatch('LoginByUsername', { username, password }).then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => {
      })
    } else {
      weui.alert('您没有访问权限!', function () {
        console.log('ok')
      }, {
        title: '警告'
      })
    }
  },
  created () {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>
