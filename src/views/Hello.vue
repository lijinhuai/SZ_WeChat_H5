<template>
  <div class="page input js_show">
    <VueCustomKeyboard :isOpen="isOpen" :defaultValue="hphmDefaultValue" :onChange="onChange" :onBlur="onBlur" :onDone="onDone"></VueCustomKeyboard>

    <div class="page__bd">
      <div id="searchForm">
        <div class="weui-cells__title">手工录入信息</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">号牌号码</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="showKeyboard" v-model="form.hphm" required="" pattern="REG_HPHM" maxlength="7" placeholder="输入号牌号码" emptytips="请输入号牌号码" notmatchtips="请输入正确的号牌号码">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">号牌种类</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="hpzlDictPicker" v-model="form.hpzlText" required="" placeholder="选择号牌种类" emptytips="请选择号牌种类" notmatchtips="请选择正确的号牌种类">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell" v-show="showUploadBtn">
            <div class="weui-cell__hd">
              <label class="weui-label">违法日期</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="modifyWfrq" v-model="form.wfrq" placeholder="选择违法日期">
            </div>
          </div>
          <div class="weui-cell" v-show="showUploadBtn">
            <div class="weui-cell__hd">
              <label class="weui-label">违法时间</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="modifyWfsj" v-model="form.wfsj" placeholder="选择违法时间">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">违法地点</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="dldmDictPicker" v-model="form.dldmText" required="" placeholder="选择违法地点" emptytips="请选择违法地点" notmatchtips="请选择正确的违法地点">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">路段号码</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="lddmDictPicker" v-model="form.lddmText" required="" placeholder="选择路段号码" emptytips="请选择路段号码" notmatchtips="请选择正确的路段号码">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">地点描述</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" v-model="form.ddms" placeholder="请输入地点描述">
            </div>
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
                  <span id="uploadCount">{{form.uploadFileList.length}}</span>/{{maxPicAmounts}}</div>
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

      <div id="uploadForm" v-show="showUploadBtn">
        <div class="weui-cells__title">系统检索信息</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车身颜色</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="csysDictPicker" v-model="form.csysText" required="" placeholder="选择车身颜色" emptytips="请选择车身颜色" notmatchtips="请选择正确的车身颜色">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车辆类型</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="cllxDictPicker" v-model="form.cllxText" required="" placeholder="选择车辆类型" emptytips="请选择车辆类型" notmatchtips="请选择正确的车辆类型">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车辆分类</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="clflDictPicker" v-model="form.clflText" required="" placeholder="选择车辆分类" emptytips="请选择车辆分类" notmatchtips="请选择正确的车辆分类">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车主名称</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" v-model="form.czmc" placeholder="请输入车主名称">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车主地址</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" v-model="form.czdz" placeholder="请输入车主地址">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">联系电话</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="number" v-model="form.lxdh" placeholder="请输入联系电话">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车辆品牌</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" v-model="form.clpp" placeholder="请输入车辆品牌">
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车辆拖移</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="cltyDictPicker" v-model="form.cltyText" required="" placeholder="选择车辆是否拖移" emptytips="请选择车辆是否拖移">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <a id="uploaderBtn" v-show="showSearchBtn" @click="search" class="weui-btn weui-btn_primary" v-bind:class="{'weui-btn_loading': showLoading} ">
          <i v-show="showLoading" class="weui-loading"></i>检索</a>
        <a id="uploaderBtn" v-show="showUploadBtn" @click="upload" class="weui-btn weui-btn_primary" v-bind:class="{'weui-btn_loading': showLoading}">
          <i v-show="showLoading" class="weui-loading"></i>提交</a>
      </div>
    </div>

    <div class="weui-footer">
      <p class="weui-footer__text">Copyright © 2001-2017 苏州广达科技有限公司</p>
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

import {
  fetchHpzlList, fetchDldmList, fetchLddmList,
  fetchCsysList, fetchCllxList, fetchClflList, fetchCltyList,
  uploadPecc
} from '@/api/pecc'

export default {
  name: 'hello',
  data () {
    return {
      maxPicAmounts: 3,
      isOpen: false, // 键盘是否打开
      showSearchBtn: true, // 显示查询按钮
      showUploadBtn: false, // 显示提交按钮
      hphmDefaultValue: '苏E',
      showLoading: false,
      wfsj: {
        y: '',
        M: '',
        d: '',
        H: '',
        m: '',
        date: '',
        time: ''
      },
      form: {
        uploadFileList: [], // 待上传的图片列表
        hphm: '苏E',
        hpzl: '',
        hpzlText: '',
        wfrq: '',
        wfsj: '',
        dldm: '',
        dldmText: '',
        lddm: '',
        lddmText: '',
        ddms: '',
        csys: '',
        csysText: '',
        cllx: '',
        cllxText: '',
        clfl: '',
        clflText: '',
        czmc: '',
        czdz: '',
        lxdh: '',
        clpp: '',
        clty: '',
        cltyText: ''
      },
      hpzlList: [],
      dldmList: [],
      lddmList: [],
      csysList: [],
      cllxList: [],
      clflList: [],
      cltyList: [],
      // 约定查询form正则
      searchRegexp: {
        regexp: {
          HPHM: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/
        }
      },
      // 约定上传form正则
      uploadRegexp: {
        regexp: {
        }
      }
    }
  },
  components: {
    VueCustomKeyboard
  },
  mounted () {
    this.initUploader()
    this.initGallery()
    fetchHpzlList().then(response => {
      this.hpzlList = response.data
    })
    fetchDldmList().then(response => {
      this.dldmList = response.data
    })
    fetchCsysList().then(response => {
      this.csysList = response.data
    })
    fetchClflList().then(response => {
      this.clflList = response.data
    })
    fetchCllxList().then(response => {
      this.cllxList = response.data
    })
    fetchCltyList().then(response => {
      this.cltyList = response.data
    })
  },
  methods: {
    // 图片手动上传
    initUploader () {
      const self = this
      var uploadCount = 0
      weui.uploader('#uploader', {
        url: 'http://localhost:8081/api/peccapi/uploadPeccPhoto',
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

          uploadCount = self.form.uploadFileList.length

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
          const markStr = dateStr + ' ' + self.form.dldmText
          watermark([this.url])
            .image(watermark.text.lowerRight(markStr, '48pt serif', '#FFFF00', 0.8))
            .then(function (img) {
              that.url = imageUtil.dataURItoObjectURL(img.src)
              self.form.uploadFileList.push(that)
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
        for (var i = 0, len = self.form.uploadFileList.length; i < len; ++i) {
          var file = self.form.uploadFileList[i]
          if (file.id === parseInt(id)) {
            index = i
            break
          }
        }
        if (index >= 0) url = self.form.uploadFileList[index].url

        var gallery = weui.gallery(url, {
          onDelete: function onDelete () {
            weui.confirm('确定删除该图片？', function () {
              var index
              for (var i = 0, len = self.form.uploadFileList.length; i < len; ++i) {
                var file = self.form.uploadFileList[i]
                if (file.id === parseInt(id)) {
                  index = i
                  break
                }
              }
              if (index >= 0) self.form.uploadFileList.splice(index, 1)

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
    showKeyboard () {
      // document.activeElement.blur()
      this.isOpen = true
    },
    onChange (value) {
      this.form.hphm = value
    },
    onBlur () {
      this.isOpen = false
    },
    onDone () {
      this.isOpen = false
    },
    queryLddmist () {
      fetchLddmList({ 'dldm': this.form.dldm }).then(response => {
        this.lddmList = response.data
      })
    },
    modifyWfrq () {
      const self = this
      weui.datePicker({
        start: new Date(),
        end: '2030-12-29',
        /**
        * https://zh.wikipedia.org/wiki/Cron
        * cron 表达式后三位
        * 示例：
        *  * * *                每天
        *  5 * *                每个月的5日
        *  1-10 * *             每个月的前10日
        *  1,5,10 * *           每个月的1号、5号、10号
        *  *\/2 * *             每个月的 1、3、5、7...日，注意写的时候斜杠“/”前面没有反斜杠“\”，这是因为是注释所以需要转义
        *  * 2 0                2月的每个周日
        *  * * 0,6              每个周末
        *  * * 3                每周三
        */
        cron: '* * *',
        defaultValue: [self.wfsj.y, self.wfsj.M, self.wfsj.d],
        onConfirm: function onChange (result) {
          console.log(result)
          self.wfsj.date = result[0] + '-' + result[1] + '-' + result[2]
          self.wfsj.y = result[0]
          self.wfsj.M = result[1]
          self.wfsj.d = result[2]
        },
        id: 'datePicker'
      })
    },
    modifyWfsj () {
      const self = this
      var hours = []
      var minites = []
      var symbol = [{ label: ':', value: 0 }]
      if (!hours.length) {
        for (var i = 0; i < 24; i++) {
          var hoursItem = {}
          hoursItem.label = ('' + i).length === 1 ? '0' + i : '' + i
          hoursItem.value = i
          hours.push(hoursItem)
        }
      }
      if (!minites.length) {
        for (var j = 0; j < 60; j++) {
          var miniteItem = {}
          miniteItem.label = ('' + j).length === 1 ? '0' + j : '' + j
          miniteItem.value = j
          minites.push(miniteItem)
        }
      }

      weui.picker(hours, symbol, minites, {
        defaultValue: [self.wfsj.H, 0, self.wfsj.m],
        onConfirm: function (result) {
          var time = result[0].label + ':' + result[2].label
          self.wfsj.time = time
          self.wfsj.H = result[0].label
          self.wfsj.m = result[1].label
        },
        id: 'timePicker'
      })
    },
    search () {
      const self = this
      /* form */
      // 失去焦点时检测
      weui.form.checkIfBlur('#searchForm', self.searchRegexp)

      // 表单提交
      weui.form.validate('#searchForm', function (error) {
        console.log(error)
        if (!error) {
          var loading = weui.loading('数据加载中')
          self.showLoading = true
          setTimeout(() => {
            self.showLoading = false
            self.showSearchBtn = false
            self.showUploadBtn = true
            loading.hide()
            const now = new Date()
            const y = now.getFullYear()
            const M = now.getMonth() + 1
            const d = now.getDate()
            const H = now.getHours()
            const m = now.getMinutes()
            self.wfsj.y = y
            self.wfsj.M = M
            self.wfsj.d = d
            self.wfsj.H = H
            self.wfsj.m = m

            self.wfsj.date = `${y}-${M}-${d}`
            self.wfsj.time = `${H}:${m}`
          }, 1000 * 2)
        }
      }, self.searchRegexp)

      // if (self.form.hphm === '' || self.form.hphm.length !== 7 || self.form.hpzl === '' || self.form.dldm === '' || self.form.lddm === '') {
      //   weui.topTips('请输入正确的字段', {
      //     duration: 3000,
      //     className: 'custom-classname',
      //     callback: function callback () {
      //       // console.log('close')
      //     }
      //   })
      //   return
      // }
    },
    // 手动上传按钮
    upload () {
      const self = this

      // 失去焦点时检测
      weui.form.checkIfBlur('#uploadForm', self.uploadRegexp)

      // 表单提交
      weui.form.validate('#uploadForm', function (error) {
        console.log(error)
        if (!error) {
          /* loading */
          var loading = weui.loading('正在提交数据')
          self.showLoading = true
          uploadPecc(self.form).then(
            (response) => {
              setTimeout(() => {
                loading.hide()
                self.showLoading = true
                // weui.toast('提交成功(假的)', {
                //   duration: 3000,
                //   className: 'bears'
                // })
                self.$router.push('/result')
              }, 2000)
              console.log(response)
            }
          )
          // self.form.uploadFileList.forEach(function (file) {
          //   file.upload()
          // })
        }
      }, self.uploadRegexp)

      // const self = this
      // document.getElementById('uploaderBtn').addEventListener('click', function () {
      //   self.form.uploadFileList.forEach(function (file) {
      //     file.upload()
      //   })
      // })
    },
    hpzlDictPicker () {
      const self = this
      weui.picker(self.hpzlList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.hpzl = result[0].value
          self.form.hpzlText = result[0].label
        },
        id: 'picker'
      })
    },
    dldmDictPicker () {
      const self = this
      weui.picker(self.dldmList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.dldm = result[0].value
          self.form.dldmText = result[0].label
        },
        id: 'picker'
      })
    },
    lddmDictPicker () {
      const self = this
      weui.picker(self.lddmList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.lddm = result[0].value
          self.form.lddmText = result[0].label
        },
        id: 'picker'
      })
    },
    csysDictPicker () {
      const self = this
      weui.picker(self.csysList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.csys = result[0].value
          self.form.csysText = result[0].label
        },
        id: 'picker'
      })
    },
    clflDictPicker () {
      const self = this
      weui.picker(self.clflList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.clfl = result[0].value
          self.form.clflText = result[0].label
        },
        id: 'picker'
      })
    },
    cllxDictPicker () {
      const self = this
      weui.picker(self.cllxList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.cllx = result[0].value
          self.form.cllxText = result[0].label
        },
        id: 'picker'
      })
    },
    cltyDictPicker () {
      const self = this
      weui.picker(self.cltyList, {
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          self.form.clty = result[0].value
          self.form.cltyText = result[0].label
        },
        id: 'picker'
      })
    }
  },
  watch: {
    'form.dldm': function (value) {
      this.queryLddmist()
      this.form.lddm = ''
      this.form.lddmText = ''
    },
    'wfsj.date': function (value) {
      this.form.wfrq = value
    },
    'wfsj.time': function (value) {
      this.form.wfsj = value
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
