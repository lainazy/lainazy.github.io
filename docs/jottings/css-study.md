---
title: CSS学习记录
date: 2017-09-11 18:41:53
tags: css
---

#### 过度受限计算规则

```css
{
    position: absolute; 
    top: 0; //值为任意数值或百分数
    bottom: 0; //值为任意数值或百分数
    height: 100%; //值为任意数值或百分数
    margin: auto; //值必须为auto才能触发margin重计算
}
```

- 以上Css属性组合使用时(过度受限)有如下结果：
  - margin-top = margin-bottom; 
  - margin-top/margin-bottom值计算公式: (包含块height - height - top - bottom) / 2;
  - 距离顶边界偏移量计算公式: (包含块height - height + top - bottom) / 2;

#### display & position & float 彼此的交互作用规则

- 如果display的值为none，position和float无效。此时不生成box。
- 如果position的值不为static或relative，box被绝对定位，float的计算值为none，display的计算值设定规则如下：
  - 当display: inline-table时，display的计算值为table；
  - 当display: inline | inline-block | run-in | table-* 系时，display的计算值为block；
  - 当display: inline-flex时，display的计算值为flex；
  - 其它情况为指定值；
- 如果float的值不是none，box是浮动的，display的计算值设定规则如上。
- 如果元素为根元素，display的计算值设定规则如上。
- 其余情况下display的值就是其指定值。

***总结：绝对定位元素、浮动元素和根元素的display属性会被块级化。***

#### 盒子模型

- 盒子模型由外到内结构：position-box > margin-box > border-box > scroll-box[scrollbar(右+下) + client-box(即padding-box)] > padding-box > content-box
- 盒模型 width/height 使用值计算公式如下：
  - box-sizing: border-box时：
    - style.width =  borderBoxWidth
    - style.height = borderBoxHeight
  - box-sizing: content-box时：
    - style.width =  contentBoxWidth + scrollbarWidth
    - style.height = contentBoxHeight + scrollbarHeight
  - offsetWidth = borderBoxWidth = clientWidth + scrollbarWidth + style.borderLeft + style.borderRight
  - offsetHeight = borderBoxHeight = clientHeight + scrollbarHeight + style.borderTop + style.borderBottom
  - clientWidth = paddingBoxWidth = contentBoxWidth + style.paddingLeft + style.paddingRight
  - clientHeight = paddingBoxHeight = contentBoxHeight + style.paddingTop + style.paddingBottom

#### 置换元素

- 置换元素本质上只是一个占位符，是一个inline元素，和普通inline元素的区别在于其置换后的内容有默认宽高，设置width/heigth时，设置的是其置换后内容的width/height。
- 个人推测：inline置换元素会自动将display: inline转换成display: inline-block显示，所以拥有和inline-block元素类似的显示特点。
- 推测依据：
  - `<img>` `<textarea>` 元素设置成display: inline，仍可以设置width/height，并且margin不会折叠，说明有生成新的BFC，和inline-block元素特点一致。
  - `<img>` `<textarea>` 元素设置成display: block，margin会发生折叠，说明block置换元素不会生成新的BFC，失去了inline-block元素的特点。
- 所以个人推测：行内置换元素的特点是通过display: inline-block来实现的。
- 另一种可能：置换元素本质上只是一个占位符，所以本质就是一个inline元素，所以只有设置为display: inline时才有其特点。
