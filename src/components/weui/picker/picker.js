/*
 * Created by jinhuailee on Thu Oct 19 2017 12:32:4
 *
 * Copyright 2001-2017 Suzhou CyberTech Technology Co., Ltd.
 */

import $ from '../util'
import './scroll'
import * as util from './util'
import pickerTpl from './pickerHtml'
import groupTpl from './groupHtml'

function Result(item) {
  if (typeof item !== 'object') {
    item = {
      label: item,
      value: item
    }
  }
  $.extend(this, item)
}
Result.prototype.toString = function () {
  return this.value
}
Result.prototype.valueOf = function () {
  return this.value
}

let _sington
let temp = {} // temp 存在上一次滑动的位置
let tempValue = {} // temp 存在上一次滑动的位置的value

/**
 * picker 多列选择器。
 * @param {array} items picker的数据，即用于生成picker的数据，picker的层级可以自己定义，但建议最多三层。数据格式参考example。
 * @param {Object} options 配置项
 * @param {number=} [options.depth] picker深度(也就是picker有多少列) 取值为1-3。如果为空，则取items第一项的深度。
 * @param {string=} [options.id=default] 作为picker的唯一标识，作用是以id缓存当时的选择。（当你想每次传入的defaultValue都是不一样时，可以使用不同的id区分）
 * @param {string=} [options.className] 自定义类名
 * @param {string=} [options.container] 指定容器
 * @param {array=} [options.defaultValue] 默认选项的value数组
 * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
 * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
 *
 * @example
 * // 单列picker
 * weui.picker([
 * {
 *     label: '飞机票',
 *     value: 0,
 *     disabled: true // 不可用
 * },
 * {
 *     label: '火车票',
 *     value: 1
 * },
 * {
 *     label: '汽车票',
 *     value: 3
 * },
 * {
 *     label: '公车票',
 *     value: 4,
 * }
 * ], {
 *    className: 'custom-classname',
 *    container: 'body',
 *    defaultValue: [3],
 *    onChange: function (result) {
 *        console.log(result)
 *    },
 *    onConfirm: function (result) {
 *        console.log(result)
 *    },
 *    id: 'singleLinePicker'
 * });
 *
 * @example
 * // 多列picker
 * weui.picker([
 *     {
 *         label: '1',
 *         value: '1'
 *     }, {
 *         label: '2',
 *         value: '2'
 *     }, {
 *         label: '3',
 *         value: '3'
 *     }
 * ], [
 *     {
 *         label: 'A',
 *         value: 'A'
 *     }, {
 *         label: 'B',
 *         value: 'B'
 *     }, {
 *         label: 'C',
 *         value: 'C'
 *     }
 * ], {
 *     defaultValue: ['3', 'A'],
 *     onChange: function (result) {
 *         console.log(result);
 *     },
 *     onConfirm: function (result) {
 *         console.log(result);
 *     },
 *     id: 'multiPickerBtn'
 * });
 *
 * @example
 * // 级联picker
 * weui.picker([
 * {
 *     label: '飞机票',
 *     value: 0,
 *     children: [
 *         {
 *             label: '经济舱',
 *             value: 1
 *         },
 *         {
 *             label: '商务舱',
 *             value: 2
 *         }
 *     ]
 * },
 * {
 *     label: '火车票',
 *     value: 1,
 *     children: [
 *         {
 *             label: '卧铺',
 *             value: 1,
 *             disabled: true // 不可用
 *         },
 *         {
 *             label: '坐票',
 *             value: 2
 *         },
 *         {
 *             label: '站票',
 *             value: 3
 *         }
 *     ]
 * },
 * {
 *     label: '汽车票',
 *     value: 3,
 *     children: [
 *         {
 *             label: '快班',
 *             value: 1
 *         },
 *         {
 *             label: '普通',
 *             value: 2
 *         }
 *     ]
 * }
 * ], {
 *    className: 'custom-classname',
 *    container: 'body',
 *    defaultValue: [1, 3],
 *    onChange: function (result) {
 *        console.log(result)
 *    },
 *    onConfirm: function (result) {
 *        console.log(result)
 *    },
 *    id: 'doubleLinePicker'
 * });
 */
function picker() {
  if (_sington) return _sington

  // 配置项
  const options = arguments[arguments.length - 1]
  const defaults = $.extend({
    id: 'default',
    className: '',
    container: 'body',
    onChange: $.noop,
    onConfirm: $.noop
  }, options)

  // 数据处理
  let items
  let isMulti = false // 是否多列的类型
  if (arguments.length > 2) {
    let i = 0
    items = []
    while (i < arguments.length - 1) {
      items.push(arguments[i++])
    }
    isMulti = true
  } else {
    items = arguments[0]
  }
  let _items = items

  // 获取缓存
  temp[defaults.id] = temp[defaults.id] || []
  const result = []
  const lineTemp = temp[defaults.id]
  const $picker = $($.render(pickerTpl, defaults))
  let depth = options.depth || (isMulti ? items.length : util.depthOf(items[0])),
    groups = ''

  /**
   * 初始化搜索框
   * @param {*} selector
   */
  function searchBar(selector) {
    const $eles = $picker.find(selector)

    $eles.forEach((ele) => {
      const $searchBar = $(ele)
      const $searchLabel = $searchBar.find('.weui-search-bar__label')
      const $searchInput = $searchBar.find('.weui-search-bar__input')
      const $searchClear = $searchBar.find('.weui-icon-clear')
      const $searchCancel = $searchBar.find('.weui-search-bar__cancel-btn')

      function cancelSearch() {
        $searchInput.val('')
        $searchBar.removeClass('weui-search-bar_focusing')
      }

      $searchLabel.on('click', function () {
        $searchBar.addClass('weui-search-bar_focusing')
        $searchInput[0].focus()
      })
      $searchInput.on('blur', function () {
        if (!this.value.length) cancelSearch()
      })
      $searchClear.on('click', function () {
        $searchInput.val('')
        $searchInput[0].focus()
      })
      $searchCancel.on('click', function () {
        cancelSearch()
        $searchInput[0].blur()
        items = _items
        reloadPicker()
      })

      $searchInput.on('input', function () {
        if ($searchInput.val() === '') {
          items = _items
        } else {
          let itemFilter = _items.filter(item => {
            if (item.label.indexOf($searchInput.val()) !== -1 || item.value.indexOf($searchInput.val()) !== -1) return true
            else return false
          })
          items = itemFilter
        }
        reloadPicker()
      })
    })

    return $eles
  }

  function reloadPicker() {
    $picker.find('.weui-picker__bd').html(groups)
    if (isMulti) {
      items.forEach((item, index) => {
        scroll(item, index)
      })
    } else {
      scroll(items, 0)
    }
  }

  // 显示与隐藏的方法
  function show() {
    searchBar('#searchBar')
    $(defaults.container).append($picker)

    // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
    $.getStyle($picker[0], 'transform')

    $picker.find('.weui-mask').addClass('weui-animate-fade-in')
    $picker.find('.weui-picker').addClass('weui-animate-slide-up')
  }

  function _hide(callback) {
    _hide = $.noop // 防止二次调用导致报错

    $picker.find('.weui-mask').addClass('weui-animate-fade-out')
    $picker.find('.weui-picker')
      .addClass('weui-animate-slide-down')
      .on('animationend webkitAnimationEnd', function () {
        $picker.remove()
        _sington = false
        callback && callback()
      })
  }

  function hide(callback) {
    _hide(callback)
  }

  // 初始化滚动的方法
  function scroll(items, level) {
    if (tempValue[defaults.id] !== undefined || !defaults.defaultValue || defaults.defaultValue[level] !== undefined) {
      let defaultVal
      if (lineTemp[level] === undefined && defaults.defaultValue && defaults.defaultValue[level] !== undefined) {
        // 没有缓存选项，而且存在defaultValue
        defaultVal = defaults.defaultValue[level]
      } else {
        defaultVal = tempValue[defaults.id]
      }
      let index = 0,
        len = items.length

      if (typeof items[index] === 'object') {
        for (; index < len; ++index) {
          if (defaultVal == items[index].value) break
        }
      } else {
        for (; index < len; ++index) {
          if (defaultVal == items[index]) break
        }
      }
      if (index < len) {
        lineTemp[level] = index
      } else {
        console.warn('Picker has not match defaultValue: ' + defaultVal)
      }
    }

    // debugger
    $picker.find('.weui-picker__group').eq(level).scroll({
      items: items,
      temp: lineTemp[level],
      onChange: function (item, index) {
        // 为当前的result赋值。
        if (item) {
          result[level] = new Result(item)
        } else {
          result[level] = null
        }
        lineTemp[level] = index

        if (isMulti) {
          if (result.length == depth) {
            defaults.onChange(result)
          }
        } else {
          /**
           * @子列表处理
           * 1. 在没有子列表，或者值列表的数组长度为0时，隐藏掉子列表。
           * 2. 滑动之后发现重新有子列表时，再次显示子列表。
           *
           * @回调处理
           * 1. 因为滑动实际上是一层一层传递的：父列表滚动完成之后，会call子列表的onChange，从而带动子列表的滑动。
           * 2. 所以，使用者的传进来onChange回调应该在最后一个子列表滑动时再call
           */
          if (item.children && item.children.length > 0) {
            // $picker.find('.weui-picker__group').eq(level + 1).show() !isMulti && scroll(item.children, level + 1) // 不是多列的情况下才继续处理children
          } else {
            // 如果子列表test不通过，子孙列表都隐藏。
            const $items = $picker.find('.weui-picker__group')
            $items.forEach((ele, index) => {
              if (index > level) {
                $(ele).hide()
              }
            })

            result.splice(level + 1)

            defaults.onChange(result)
          }
        }
      },
      onConfirm: defaults.onConfirm
    })
  }

  let _depth = depth
  while (_depth--) {
    groups += groupTpl
  }
  $picker.find('.weui-picker__bd').html(groups)
  show()

  if (isMulti) {
    items.forEach((item, index) => {
      scroll(item, index)
    })
  } else {
    scroll(items, 0)
  }

  $picker
    .on('click', '.weui-mask', function () {
      hide()
    })
    .on('click', '.weui-picker__action', function () {
      hide()
    })
    .on('click', '#weui-picker-confirm', function () {
      tempValue[defaults.id] = result[0].value
      defaults.onConfirm(result)
    })

  _sington = $picker[0]
  _sington.hide = hide
  return _sington
}
export default {
  picker
}
