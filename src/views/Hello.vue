
<template>
  <div class="page input js_show">
    <CustomKeyboard :isOpen="isOpen" :defaultValue="hphmDefaultValue" :onChange="onChange" :onBlur="onBlur" :onDone="onDone"></CustomKeyboard>

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
              <label class="weui-label">道路性质</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="dlxzDictPicker" v-model="form.dlxzText" required="" placeholder="选择道路性质" emptytips="请选择道路性质">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">违法地点</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="dldmDictPicker" v-model="form.dldmText" required="" placeholder="选择违法地点" emptytips="请选择违法地点">
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
              <input class="weui-input" type="text" onfocus="this.blur();" @click="lddmDictPicker" v-model="form.lddmText" required="" placeholder="选择路段号码" emptytips="请选择路段号码">
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

      <div id="uploadForm" v-show="showUploadBtn">
        <div class="weui-cells__title">系统检索信息</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">车身颜色</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" onfocus="this.blur();" @click="csysDictPicker" v-model="form.csysText" required="" placeholder="选择车身颜色" emptytips="请选择车身颜色">
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
              <input class="weui-input" type="text" onfocus="this.blur();" @click="cllxDictPicker" v-model="form.cllxText" required="" placeholder="选择车辆类型" emptytips="请选择车辆类型">
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
              <input class="weui-input" type="text" onfocus="this.blur();" @click="clflDictPicker" v-model="form.clflText" required="" placeholder="选择车辆分类" emptytips="请选择车辆分类">
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

    <div v-show="showWarnToast">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-warn weui-icon_msg-primary weui-icon_toast"></i>
        <p class="weui-toast__content">未检索到信息</p>
      </div>
    </div>
  </div>
</template>
<script>
import weui from 'weui.js'
import cusPicker from '@/components/CustomPicker/picker'
import watermark from 'watermarkjs'
import * as imageUtil from '@/utils/image'
import * as dateUtil from '@/utils/date'

import CustomKeyboard from '@/components/CustomKeyboard.vue'

import { fetchVehicleInfo, uploadPecc } from '@/api/pecc'

import { mapGetters, mapActions } from 'vuex'

import {
  getToken
} from '@/utils/auth'

import { BASE_API } from '@/config'
var _loading

export default {
  name: 'hello',
  data () {
    return {
      searchText: '1111',
      maxPicAmounts: 3,
      isOpen: false, // 键盘是否打开
      showSearchBtn: true, // 显示查询按钮
      showUploadBtn: false, // 显示提交按钮
      showWarnToast: false,
      hphmDefaultValue: '苏E',
      showLoading: false, // 是否显示检索按钮和提交按钮的loading效果
      uploadedCount: -1, // 已上传成功项目的数量
      wfsj: {
        y: '',
        M: '',
        d: '',
        H: '',
        m: '',
        date: '',
        time: ''
      },
      uploadFileList: [], // 待上传的图片列表
      form: {
        hphm: '苏E',
        hpzl: '',
        hpzlText: '',
        wfrq: '',
        wfsj: '',
        dlxz: '',
        dlxzText: '',
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
      dict: {
        dldmList: [],
        lddmList: []
      },
      uploadDir: '',
      ticketNumber: '',
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
    CustomKeyboard
  },
  computed: {
    ...mapGetters({
      hpzlList: 'hpzlList',
      dlxzList: 'dlxzList',
      ptDldmList: 'ptDldmList',
      ptLddmList: 'ptLddmList',
      zdDldmList: 'zdDldmList',
      zdLddmList: 'zdLddmList',
      csysList: 'csysList',
      clflList: 'clflList',
      cllxList: 'cllxList',
      cltyList: 'cltyList'
    })
  },
  mounted () {
    this.initUploader()
    this.initGallery()
  },
  created () {
    this.setHpzlDict()
    this.setDlxzDict()
    this.setPtDldmDict()
    this.setPtLddmDict()
    this.setZdDldmDict()
    this.setZdLddmDict()
    this.setCsysDict()
    this.setCllxDict()
    this.setClflDict()
    this.setCltyDict()
  },
  methods: {
    ...mapActions({
      setHpzlDict: 'setHpzlDict', // 将 `this.setHpzlDict()` 映射为 `this.$store.dispatch('setHpzlDict')`
      setDlxzDict: 'setDlxzDict',
      setPtDldmDict: 'setPtDldmDict',
      setPtLddmDict: 'setPtLddmDict',
      setZdDldmDict: 'setZdDldmDict',
      setZdLddmDict: 'setZdLddmDict',
      setCsysDict: 'setCsysDict',
      setCllxDict: 'setCllxDict',
      setClflDict: 'setClflDict',
      setCltyDict: 'setCltyDict'
    }),
    // 图片手动上传
    initUploader () {
      const _self = this
      var uploadCount = 0
      weui.uploader('#uploader', {
        url: BASE_API + 'pecc/uploadPeccPhoto',
        auto: false,
        type: 'file',
        fileVal: 'fileVal',
        // compress: false,
        compress: {
          width: 640,
          height: 480,
          quality: 1
        },
        onBeforeQueued: function (files) {
          // `this` 是轮询到的文件, `files` 是所有文件

          uploadCount = _self.uploadFileList.length

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
          if (uploadCount + files.length > 3) {
            weui.alert('最多只能上传3张图片')
            return false
          }

          ++uploadCount

          // return true // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function () {
          const that = this
          const dateStr = dateUtil.formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss')
          // const markStr = dateStr + ' ' + _self.form.dldmText
          const markStr = dateStr
          that.markStr = markStr
          watermark([this.url])
            .image(watermark.text.lowerRight(markStr, '20pt serif', '#FFFF00', 0.8))
            .then(function (img) {
              that.url = imageUtil.dataURItoObjectURL(img.src)
              // that.base64 = img.src
              _self.uploadFileList.push(that)
            })
          // _self.uploadFileList.push(this)

          // console.log(this.status) // 文件的状态：'ready', 'progress', 'success', 'fail'
          // console.log(this.base64) // 如果是base64上传，file.base64可以获得文件的base64

          // this.upload() // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
          // this.stop() // 中断上传

          // return true // 阻止默认行为，不显示预览图的图像
        },
        onBeforeSend: function (data, headers) {
          console.log(this, data, headers)
          headers['Authorization'] = getToken()
          // $.extend(data, { test: 1 }) // 可以扩展此对象来控制上传参数
          // $.extend(headers, { Origin: 'http://127.0.0.1' }) // 可以扩展此对象来控制上传头部
          var index
          for (var i = 0, len = _self.uploadFileList.length; i < len; ++i) {
            var file = _self.uploadFileList[i]
            if (file.id === parseInt(this.id)) {
              index = i + 1
              break
            }
          }
          data.index = index
          data.uploadDir = _self.uploadDir
          data.ticketNumber = _self.ticketNumber
          data.markStr = this.markStr
          // data.base64 = this.base64
          // return false // 阻止文件上传
        },
        onProgress: function (procent) {
          console.log(this, procent)
          // return true // 阻止默认行为，不使用默认的进度显示
        },
        onSuccess: function (ret) {
          _self.uploadedCount++
          console.log(this, ret)
          // return true // 阻止默认行为，不使用默认的成功态
        },
        onError: function (err) {
          _self.uploadedCount = -1
          console.log(this, err)
          // return true // 阻止默认行为，不使用默认的失败态
        }
      })
    },
    // 缩略图预览
    initGallery () {
      const _self = this
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
        for (var i = 0, len = _self.uploadFileList.length; i < len; ++i) {
          var file = _self.uploadFileList[i]
          if (file.id === parseInt(id)) {
            index = i
            break
          }
        }
        if (index >= 0) url = _self.uploadFileList[index].url
        // target.style = 'background-image: url(' + url + ');'

        var gallery = weui.gallery(url, {
          onDelete: function onDelete () {
            weui.confirm('确定删除该图片？', function () {
              var index
              for (var i = 0, len = _self.uploadFileList.length; i < len; ++i) {
                var file = _self.uploadFileList[i]
                if (file.id === parseInt(id)) {
                  index = i
                  break
                }
              }
              if (index >= 0) _self.uploadFileList.splice(index, 1)

              target.remove()
              // gallery.hide()
              gallery.hide(function () {
                weui.toast('操作成功', 500)
              })
            })
          }
        })
      })
    },
    showKeyboard () {
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
    queryDldmist () {
      const _self = this
      _loading = weui.loading('字典加载中')
      if (_self.form.dlxz === '1') {
        _self.dict.dldmList = _self.ptDldmList
        _loading.hide()
      } else if (_self.form.dlxz === '2') {
        _self.dict.dldmList = _self.zdDldmList
        _loading.hide()
      }
    },
    queryLddmist () {
      const _self = this
      _loading = weui.loading('字典加载中')
      if (_self.form.dlxz === '1') {
        let lddmList = _self.ptLddmList.filter(item => {
          if (item.key === _self.form.dldm || item.value === '0000') return true
          else return false
        })
        _self.dict.lddmList = lddmList
        _loading.hide()
      } else if (_self.form.dlxz === '2') {
        let lddmList = _self.zdLddmList.filter(item => {
          if (item.key === _self.form.dldm || item.value === '0000') return true
          else return false
        })
        _self.dict.lddmList = lddmList
        _loading.hide()
      }
    },
    modifyWfrq () {
      const _self = this
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
        defaultValue: [_self.wfsj.y, _self.wfsj.M, _self.wfsj.d],
        onConfirm: function onChange (result) {
          const y = result[0] < 10 ? '0' + result[0] : result[0]
          const M = result[1] < 10 ? '0' + result[1] : result[1]
          const d = result[2] < 10 ? '0' + result[2] : result[2]
          _self.wfsj.date = `${y}-${M}-${d}`
          _self.wfsj.y = y
          _self.wfsj.M = M
          _self.wfsj.d = d
        },
        id: 'datePicker'
      })
    },
    modifyWfsj () {
      const _self = this
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
        defaultValue: [_self.wfsj.H, 0, _self.wfsj.m],
        onConfirm: function (result) {
          var time = result[0].label + ':' + result[2].label
          _self.wfsj.time = time
          _self.wfsj.H = result[0].label
          _self.wfsj.m = result[1].label
        },
        id: 'timePicker'
      })
    },
    search () {
      const _self = this
      /* form */
      // 失去焦点时检测
      weui.form.checkIfBlur('#searchForm', _self.searchRegexp)

      // 表单提交
      weui.form.validate('#searchForm', function (error) {
        console.log(error)
        if (!error) {
          if (_self.uploadFileList.length !== 3) {
            weui.topTips('请上传3张照片', {
              duration: 3000,
              className: 'custom-classname',
              callback: function callback () {
                // console.log('close')
              }
            })
            return
          }
          _loading = weui.loading('数据加载中')
          _self.showLoading = true

          fetchVehicleInfo({ 'hpzl': _self.form.hpzl, 'hphm': _self.form.hphm }).then(response => {
            if (response.data.code === '200') {
              for (var i in _self.csysList) {
                if (_self.csysList[i].value === response.data.data.csys) {
                  _self.form.csys = _self.csysList[i].value
                  _self.form.csysText = _self.csysList[i].label
                }
              }
              for (var j in _self.cllxList) {
                if (_self.cllxList[j].value === response.data.data.cllx) {
                  _self.form.cllx = _self.cllxList[j].value
                  _self.form.cllxText = _self.cllxList[j].label
                }
              }
              _self.form.czmc = response.data.data.czmc
              _self.form.czdz = response.data.data.czdz
              _self.form.lxdh = response.data.data.lxdh
              _self.form.clpp = response.data.data.clpp
            } else {
              _self.showWarnToast = true
              setTimeout(() => {
                _self.showWarnToast = false
              }, 2000)
            }
            _self.searchEnd()
          }).catch(() => {
            _self.showWarnToast = true
            setTimeout(() => {
              _self.showWarnToast = false
            }, 2000)
            _self.searchEnd()
          })
        }
      }, _self.searchRegexp)
    },
    searchEnd () {
      const _self = this
      _self.showLoading = false
      _self.showSearchBtn = false
      _self.showUploadBtn = true
      _loading.hide()
      const now = new Date()
      const y = now.getFullYear()
      const M = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
      const d = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
      const H = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
      const m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
      _self.wfsj.y = y
      _self.wfsj.M = M
      _self.wfsj.d = d
      _self.wfsj.H = H
      _self.wfsj.m = m

      _self.wfsj.date = `${y}-${M}-${d}`
      _self.wfsj.time = `${H}:${m}`
    },
    // 手动上传按钮
    upload () {
      const _self = this

      // 失去焦点时检测
      weui.form.checkIfBlur('#uploadForm', _self.uploadRegexp)

      // 表单提交
      weui.form.validate('#uploadForm', function (error) {
        console.log(error)
        if (!error) {
          _self.uploadedCount = 0
          uploadPecc(_self.form).then(
            (response) => {
              if (response.data.code === '200') {
                _self.uploadedCount++
                _self.uploadDir = response.data.data.uploadDir
                _self.ticketNumber = response.data.data.ticketNumber
                _self.uploadFileList.forEach(function (file) {
                  file.upload()
                })
              } else {
                _self.uploadedCount = -1
              }
            }
          ).catch(() => {
            // weui.toast('提交成功(假的)', {
            //   duration: 3000,
            //   className: 'bears'
            // })
            _self.uploadedCount = -1
          })
        }
      }, _self.uploadRegexp)

      // const _self = this
      // document.getElementById('uploaderBtn').addEventListener('click', function () {
      //   _self.uploadFileList.forEach(function (file) {
      //     file.upload()
      //   })
      // })
    },
    hpzlDictPicker () {
      const _self = this
      cusPicker.picker(_self.hpzlList, {
        // defaultValue: [_self.hpzlList[0].value],
        defaultValue: [_self.form.hpzl],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.hpzl = result[0].value
          _self.form.hpzlText = result[0].label
        },
        id: 'hpzlPicker'
      })
    },
    dlxzDictPicker () {
      const _self = this
      weui.picker(_self.dlxzList, {
        defaultValue: [_self.dlxzList[0].value],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.dlxz = result[0].value
          _self.form.dlxzText = result[0].label
        },
        id: 'dlxzPicker'
      })
    },
    dldmDictPicker () {
      const _self = this
      if (_self.form.dlxz === '') {
        weui.alert('请先选择道路性质', function () {
        }, {
          title: '警告'
        })
        return
      }
      cusPicker.picker(_self.dict.dldmList, {
        defaultValue: [_self.form.dldm],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.dldm = result[0].value
          _self.form.dldmText = result[0].label
        },
        id: 'dldmPicker'
      })
    },
    lddmDictPicker () {
      const _self = this
      if (_self.form.dlxz === '') {
        weui.alert('请先选择道路性质', function () {
        }, {
          title: '警告'
        })
        return
      }
      if (_self.form.dldm === '') {
        weui.alert('请先选择违法地点', function () {
        }, {
          title: '警告'
        })
        return
      }
      cusPicker.picker(_self.dict.lddmList, {
        defaultValue: [_self.form.lddm],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.lddm = result[0].value
          _self.form.lddmText = result[0].label
        },
        id: 'lddmPicker'
      })
    },
    csysDictPicker () {
      const _self = this
      cusPicker.picker(_self.csysList, {
        defaultValue: [_self.form.csys],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.csys = result[0].value
          _self.form.csysText = result[0].label
        },
        id: 'csysPicker'
      })
    },
    clflDictPicker () {
      const _self = this
      cusPicker.picker(_self.clflList, {
        defaultValue: [_self.form.clfl],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.clfl = result[0].value
          _self.form.clflText = result[0].label
        },
        id: 'clflPicker'
      })
    },
    cllxDictPicker () {
      const _self = this
      cusPicker.picker(_self.cllxList, {
        defaultValue: [_self.form.cllx],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.cllx = result[0].value
          _self.form.cllxText = result[0].label
        },
        id: 'cllxPicker'
      })
    },
    cltyDictPicker () {
      const _self = this
      weui.picker(_self.cltyList, {
        defaultValue: [_self.cltyList[0].value],
        className: 'custom-classname',
        onConfirm: function onConfirm (result) {
          _self.form.clty = result[0].value
          _self.form.cltyText = result[0].label
        },
        id: 'cltyPicker'
      })
    }
  },
  watch: {
    'form.dlxz': function (value) {
      this.queryDldmist()
      this.form.dldm = ''
      this.form.dldmText = ''
      this.form.lddm = ''
      this.form.lddmText = ''
    },
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
    },
    uploadedCount: function (value) {
      if (value >= 0 && value <= this.uploadFileList.length) {
        /* loading */
        _loading = weui.loading('正在提交数据')
        this.showLoading = true
      } else if (value === this.uploadFileList.length + 1) {
        _loading.hide()
        this.showLoading = false
        this.$router.push('/success')
      } else if (value === -1) {
        _loading.hide()
        this.showLoading = false
        this.$router.push('/warn')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui-icon_msg-primary {
  font-size: 53px;
}
</style>
