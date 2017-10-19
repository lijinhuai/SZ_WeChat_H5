/*
 * Created by jinhuailee on Thu Oct 19 2017 12:32:53
 *
 * Copyright 2001-2017 Suzhou CyberTech Technology Co., Ltd.
 */
export const depthOf = (object) => {
  let depth = 1
  if (object.children && object.children[0]) {
    depth = depthOf(object.children[0]) + 1
  }
  return depth
}
