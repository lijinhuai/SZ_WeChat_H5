<template>
  <div class="page input js_show">
    <VueCustomKeyboard :isOpen="isOpen" :defaultValue="hphmDefaultValue" :onChange="onChange" :onBlur="onBlur" :onDone="onDone"></VueCustomKeyboard>

    <div class="page__bd">

      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">号牌号码</label>
          </div>
          <div class="weui-cell__bd">
            <h1 class="weui-h1" @click="showKeyboard">{{hphm}}</h1>
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label class="weui-label">号牌种类</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="hpzl" class="weui-select" name="select2">
              <option v-for="hpzl in hpzlList" :key="hpzl.id" :value="hpzl.dm">{{hpzl.value}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label for="" class="weui-label">违法地点</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="dldm" class="weui-select" name="select2">
              <option v-for="dldm in dldmList" :key="dldm.id" :value="dldm.dm">{{dldm.value}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
          <div class="weui-cell__hd">
            <label for="" class="weui-label">路段号码</label>
          </div>
          <div class="weui-cell__bd">
            <select v-model="lddm" class="weui-select" name="select2">
              <option v-for="lddm in lddmList" :key="lddm.id" :value="lddm.dm">{{lddm.value}}</option>
            </select>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">地点描述</label>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="ddms" placeholder="请输入地点描述">
          </div>
        </div>
      </div>

      <div class="weui-cells weui-cells_form" id="uploader">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图片上传</p>
                <div class="weui-uploader__info">
                  <span id="uploadCount">{{uploadFileList.length}}</span>/{{maxPicAmounts}}</div>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles"></ul>
                <div class="weui-uploader__input-box">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" capture="camera" multiple="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-btn-area">
        <a id="uploaderBtn" href="javascript:" class="weui-btn weui-btn_primary">上传</a>
      </div>
    </div>
  </div>
</template>
<script>
import 'weui'
import weui from 'weui.js'
import watermark from 'watermarkjs'
import * as imageUtil from '@/utils/image'
import * as dateUtil from '@/utils/date'

import VueCustomKeyboard from '@/components/VueCustomKeyboard.vue'

import { fetchHpzlList, fetchDldmList, fetchLddmList } from '@/api/wtpz'

export default {
  name: 'hello',
  data () {
    return {
      maxPicAmounts: 3,
      uploadFileList: [], // 待上传的图片列表
      isOpen: false,
      hphmDefaultValue: '苏E',
      hphm: '苏E',
      hpzlList: [],
      hpzl: '',
      dldmList: [],
      dldm: '',
      lddmList: [],
      lddm: '',
      ddms: ''
    }
  },
  components: {
    VueCustomKeyboard
  },
  mounted () {
    this.initUploader()
    this.initGallery()
    this.initUploaderBtn()
    fetchHpzlList().then(response => {
      this.hpzlList = response.data
    })
    fetchDldmList().then(response => {
      this.dldmList = response.data
    })
  },
  methods: {
    // 图片手动上传
    initUploader () {
      const self = this
      var uploadCount = 0
      weui.uploader('#uploader', {
        url: 'http://localhost:8080',
        auto: false,
        type: 'file',
        fileVal: 'fileVal',
        compress: {
          width: 1600,
          height: 1600,
          quality: 0.8
        },
        onBeforeQueued: function (files) {
          // `this` 是轮询到的文件, `files` 是所有文件

          if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
            weui.alert('请上传图片')
            return false // 阻止文件添加
          }
          if (this.size > 10 * 1024 * 1024) {
            weui.alert('请上传不超过10M的图片')
            return false
          }
          if (files.length > 3) { // 防止一下子选择过多文件
            weui.alert('最多只能上传3张图片，请重新选择')
            return false
          }
          if (uploadCount + 1 > 3) {
            weui.alert('最多只能上传3张图片')
            return false
          }

          ++uploadCount

          // return true // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function () {
          const that = this
          const dateStr = dateUtil.formatDate(new Date(), 'yyyy/MM/dd HH:mm')
          watermark([this.url])
            .image(watermark.text.lowerRight(dateStr, '28px serif', '#fff', 0.8))
            .then(function (img) {
              that.base64 = img.src
              that.url = imageUtil.dataURItoObjectURL(img.src)
              self.uploadFileList.push(that)
            })
          // self.uploadFileList.push(this)

          // console.log(this.status) // 文件的状态：'ready', 'progress', 'success', 'fail'
          // console.log(this.base64) // 如果是base64上传，file.base64可以获得文件的base64

          // this.upload() // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
          // this.stop() // 中断上传

          // return true // 阻止默认行为，不显示预览图的图像
        },
        onBeforeSend: function (data, headers) {
          console.log(this, data, headers)
          // $.extend(data, { test: 1 }) // 可以扩展此对象来控制上传参数
          // $.extend(headers, { Origin: 'http://127.0.0.1' }) // 可以扩展此对象来控制上传头部

          // return false // 阻止文件上传
        },
        onProgress: function (procent) {
          console.log(this, procent)
          // return true // 阻止默认行为，不使用默认的进度显示
        },
        onSuccess: function (ret) {
          console.log(this, ret)
          // return true // 阻止默认行为，不使用默认的成功态
        },
        onError: function (err) {
          console.log(this, err)
          // return true // 阻止默认行为，不使用默认的失败态
        }
      })
    },
    // 缩略图预览
    initGallery () {
      const self = this
      document.querySelector('#uploaderFiles').addEventListener('click', function (e) {
        var target = e.target

        while (!target.classList.contains('weui-uploader__file') && target) {
          target = target.parentNode
        }
        if (!target) return

        var url = target.getAttribute('style') || ''
        var id = target.getAttribute('data-id')

        if (url) {
          url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '')
        }

        // 将url改成修改添加水印后的base64图片
        var index
        for (var i = 0, len = self.uploadFileList.length; i < len; ++i) {
          var file = self.uploadFileList[i]
          if (file.id === id) {
            index = i
            break
          }
        }
        if (index >= 0) url = self.uploadFileList[index].url

        var gallery = weui.gallery(url, {
          onDelete: function onDelete () {
            weui.confirm('确定删除该图片？', function () {
              var index
              for (var i = 0, len = self.uploadFileList.length; i < len; ++i) {
                var file = self.uploadFileList[i]
                if (file.id === id) {
                  index = i
                  break
                }
              }
              if (index >= 0) self.uploadFileList.splice(index, 1)

              target.remove()
              // gallery.hide()
              gallery.hide(function () {
                weui.toast('操作成功', 1000)
              })
            })
          }
        })
      })
    },
    // 手动上传按钮
    initUploaderBtn () {
      const self = this
      document.getElementById('uploaderBtn').addEventListener('click', function () {
        self.uploadFileList.forEach(function (file) {
          file.upload()
        })
      })
    },
    showKeyboard () {
      this.isOpen = true
    },
    onChange (value) {
      this.hphm = value
    },
    onBlur () {
      this.isOpen = false
    },
    onDone () {
      this.isOpen = false
    },
    queryLddmist () {
      fetchLddmList({ 'dldm': this.dldm }).then(response => {
        this.lddmList = response.data
      })
    }
  },
  watch: {
    dldm: function (value) {
      this.queryLddmist()
      this.lddm = ''
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui-h1 {
  width: 100%;
  border: 0;
  outline: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  height: 1.47058824em;
  line-height: 1.47058824;
  font-weight: normal;
}
</style>
