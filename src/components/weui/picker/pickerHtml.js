/*
 * Created by jinhuailee on Thu Oct 19 2017 12:32:25
 *
 * Copyright 2001-2017 Suzhou CyberTech Technology Co., Ltd.
 */
const html = `
<div abc class="<%= className %>">
  <div class="weui-mask"></div>
  <div class="weui-picker">
  <div class="weui-search-bar" id="searchBar"> <form class="weui-search-bar__form"> <div class="weui-search-bar__box"> <i class="weui-icon-search"></i> <input type="search" class="weui-search-bar__input" placeholder="搜索" required=""> <a href="javascript:" class="weui-icon-clear"></a> </div> <label class="weui-search-bar__label"> <i class="weui-icon-search"></i> <span>搜索</span> </label> </form> <a href="javascript:" class="weui-search-bar__cancel-btn">取消</a> </div>
      <div class="weui-picker__hd">
          <a href="javascript:;" data-action="cancel" class="weui-picker__action">取消</a>
          <a href="javascript:;" data-action="select" class="weui-picker__action" id="weui-picker-confirm">确定</a>
      </div>
      <div class="weui-picker__bd"></div>
  </div>
</div>
`
export default html
