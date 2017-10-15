<template>

</template>

<script>

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
