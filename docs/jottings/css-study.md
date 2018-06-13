---
title: CSS 学习记录
date: 2017-09-11 18:41:53
tags: CSS
---

### 过度受限计算规则

```css
.selector {
  position: absolute;
  top: 0; //值为任意数值或百分数
  bottom: 0; //值为任意数值或百分数
  height: 100%; //值为任意数值或百分数
  margin: auto; //值必须为auto才能触发margin重计算
}
```

- 以上 Css 属性组合使用时(过度受限)有如下结果：
  - margin-top = margin-bottom;
  - margin-top/margin-bottom 值计算公式: (包含块 height - height - top - bottom) / 2;
  - 距离顶边界偏移量计算公式: (包含块 height - height + top - bottom) / 2;

### display & position & float 彼此的交互作用规则

- 如果 display 的值为 none，position 和 float 无效。此时不生成 box。
- 如果 position 的值不为 static 或 relative，box 被绝对定位，float 的计算值为 none，display 的计算值设定规则如下：
  - 当 display: inline-table 时，display 的计算值为 table；
  - 当 display: inline | inline-block | run-in | table-\* 系时，display 的计算值为 block；
  - 当 display: inline-flex 时，display 的计算值为 flex；
  - 其它情况为指定值；
- 如果 float 的值不是 none，box 是浮动的，display 的计算值设定规则如上。
- 如果元素为根元素，display 的计算值设定规则如上。
- 其余情况下 display 的值就是其指定值。

**_总结：绝对定位元素、浮动元素和根元素的 display 属性会被块级化。_**

### 盒子模型

- 盒子模型由外到内结构：position-box > margin-box > border-box > scroll-box[scrollbar(右+下) + client-box(即 padding-box)] > padding-box > content-box
- 盒模型 width/height 使用值计算公式如下：
  - box-sizing: border-box 时：
    - style.width = borderBoxWidth
    - style.height = borderBoxHeight
  - box-sizing: content-box 时：
    - style.width = contentBoxWidth + scrollbarWidth
    - style.height = contentBoxHeight + scrollbarHeight
  - offsetWidth = borderBoxWidth = clientWidth + scrollbarWidth + style.borderLeft + style.borderRight
  - offsetHeight = borderBoxHeight = clientHeight + scrollbarHeight + style.borderTop + style.borderBottom
  - clientWidth = paddingBoxWidth = contentBoxWidth + style.paddingLeft + style.paddingRight
  - clientHeight = paddingBoxHeight = contentBoxHeight + style.paddingTop + style.paddingBottom

### 置换元素

- 置换元素本质上只是一个占位符，是一个 inline 元素，和普通 inline 元素的区别在于其置换后的内容有默认宽高，设置 width/heigth 时，设置的是其置换后内容的 width/height。
- 个人推测：inline 置换元素会自动将 display: inline 转换成 display: inline-block 显示，所以拥有和 inline-block 元素类似的显示特点。
- 推测依据：
  - `<img>` `<textarea>` 元素设置成 display: inline，仍可以设置 width/height，并且 margin 不会折叠，说明有生成新的 BFC，和 inline-block 元素特点一致。
  - `<img>` `<textarea>` 元素设置成 display: block，margin 会发生折叠，说明 block 置换元素不会生成新的 BFC，失去了 inline-block 元素的特点。
- 所以个人推测：行内置换元素的特点是通过 display: inline-block 来实现的。
- 另一种可能：置换元素本质上只是一个占位符，所以本质就是一个 inline 元素，所以只有设置为 display: inline 时才有其特点。
