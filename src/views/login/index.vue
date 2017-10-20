<template>
<div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <iForm ref="loginForm" :model="form" :rules="rules">
                        <iFormItem prop="username">
                            <iInput v-model="form.username">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </iInput>
                        </iFormItem>
                        <iFormItem prop="password">
                            <iInput v-model="form.password">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </iInput>
                        </iFormItem>
                        <iFormItem>
                            <iButton @click="handleSubmit" type="primary" long>登录</iButton>
                        </iFormItem>
                    </iForm>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>

</template>

<script>
import weui from 'weui.js'

import Card from 'iview/src/components/card'
import iForm from 'iview/src/components/form'
import iInput from 'iview/src/components/input'
import Icon from 'iview/src/components/icon'
import iButton from 'iview/src/components/button'
import 'iview/dist/styles/iview.css'

export default {
  name: 'login',
  components: {
    Card,
    Icon,
    iForm,
    iFormItem: iForm.Item,
    iInput,
    iButton
  },
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit () {
      const _self = this
      const username = _self.form.username
      const password = _self.form.password
      _self.$refs.loginForm.validate(valid => {
        if (valid) {
          _self.$store
            .dispatch('LoginByUsername', { username, password })
            .then(() => {
              _self.$router.push({ path: '/hello' })
            })
            .catch(() => {
              weui.alert(
                '您没有访问权限!',
                function () {
                  console.log('ok')
                },
                {
                  title: '警告'
                }
              )
            })
        }
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


<style lang="less" scoped>
.login {
  display: block;
  width: 100%;
  height: 100%;
  // background-image: url("https://file.iviewui.com/iview-admin/login_bg.jpg");
  background-color: blue;
  background-size: contain;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    // right: 160px;
    top: 50%;
    // transform: translateY(-60%);
    width: 100%;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>


