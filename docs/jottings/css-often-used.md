---
title: CSS常用样式记录
date: 2017-07-27 17:22:29
tags: css
---

#### 单侧边框线（0.5px）

```scss
.border-top-line {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: -1px;
    width: 100%;
    height: 1px;
    background: linear-gradient(180deg, #fff 50%, #ccc);
  }
}
.border-bottom-line {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    background: linear-gradient(0deg, #fff 50%, #ccc);
  }
}
.border-left-line {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -1px;
    width: 1px;
    height: 100%;
    background: linear-gradient(90deg, #fff 50%, #ccc);
  }
}
.border-right-line {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: -1px;
    width: 1px;
    height: 100%;
    background: linear-gradient(-90deg, #fff 50%, #ccc);
  }
}
```