---
title: Scss使用指南
date: 2017-07-24 21:50:17
tags: css
---

### 规则嵌套

> 规则嵌套主要用来避免重复写父选择器
> &符号用来表示父选择器的引用，不写&相当于在子选择器前面添加

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }    -- 相当于 & aside { background-color: #EEE }
}
// 编译后
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

```scss
article {
  ~ article { border-top: 1px dashed #ccc }    -- 相当于 & ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }    -- 相当于 & > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
// 编译后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

### 属性嵌套

> 属性嵌套主要用来避免重复写根属性
> 属性嵌套根属性和规则嵌套选择器的书写区别在于属性嵌套根属性后面有个冒号(:)

```scss
nav {
  border: {
     style: solid;
     width: 1px;
     color: #ccc;
  }
}
// 等同于
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

```scss
nav {
  border: 1px solid #ccc {
     left: 0px;
     right: 0px;
  }
}
// 等同于
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

### 变量

> $符号用来标识变量
> 定义的变量用在样式声明的属性值中

```scss
$nav-color: #F90;
nav {
  $width: 100px;    -- 定义在.nav规则内部的$width只能在.nav内部使用
  width: $width;
  color: $nav-color;
}
// 编译后
nav {
  width: 100px;
  color: #F90;
}
```

> 变量默认值：!default
> 如果变量没有赋值或赋值为null，变量值为!default标记的默认值

```scss
$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;
#main {
  content: $content;
  new-content: $new_content;
}
// 编译后
#main {
  content: "First content";
  new-content: "First time reference";
}
```

```scss
$content: null;
$content: "Non-null content" !default;
#main {
  content: $content;
}
// 编译后
#main {
  content: "Non-null content";
}
```

### 函数

> @function用来自定义一个scss函数
> @return用来返回函数的返回值
> @function定义的函数中必须有@return
> 定义的函数用在样式声明的属性值中

```scss
$grid-width: 40px;
$gutter-width: 10px;
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}
#sidebar { width: grid-width(5); }    -- 等同于 #sidebar { width: grid-width($n: 5); }
// 编译后
#sidebar {
  width: 240px;
}
```

### @import

> @import用来导入其它独立的css/scss片段
> 使用@import时，.sass和.scss文件后缀可以省略
> 局部文件(片段)：文件名以下划线(\_)开头，编译时不会生成对应的css文件
> 局部文件(片段)的导入可以省略文件名中的下划线(\_)
> 同一目录下不能同时存在带下划线和不带下划线的同名文件，如_colors.scss不能和colors.scss共存
>
> 原生的CSS @import：会造成浏览器解析css时有额外的下载
> 以下几种情况会使用原生的CSS @import
> - 被导入的文件扩展名是.css，如@import "foo.css";
> - 被导入的文件名是一个url地址，如@import "http://foo.com/bar";
> - 被导入的文件名是css的url()值，如@import url(foo);
> - @import包含了任何媒体查询，如@import "foo" screen;

```scss
// 普通@import
// _example.scss
.example {
  color: red;
}
// main.scss
@import "example";
#main {
  color: blue;
}
// 等同于
// main.scss
.example {
  color: red;
}
#main {
  color: blue;
}
```

```scss
// 嵌套@import
// _example.scss
.example {
  color: red;
}
// main.scss
#main {
  @import "example";
}
// 等同于
// main.scss
#main {
  .example {
    color: red;
  }
}
```

```scss
// 一个@import引入多个文件
@import "example", "colors";
```

### @mixin & @include & @content

> @mixin主要用来将重用的css代码提取出来
> @include用来引入这些被@mixin提取出来的css代码
> @mixin定义中可以@include其它@mixin

```scss
@mixin large-text {
  font: {    -- 注意这是属性嵌套
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
.page-title {
  @include large-text;    -- 注意没有""，和@import不同
  padding: 4px;
  margin-top: 10px;
}
// 编译后
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px;
}
```

```scss
@mixin silly-links {
  a {    -- 注意这是规则嵌套
    color: blue;
    background-color: red;
  }
}
@include silly-links;
// 编译后
a {
  color: blue;
  background-color: red;
}
```

```scss
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
ul.plain {
  color: #444;
  @include no-bullets;
}
// 编译后
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```

```scss
@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }
@mixin compound {
  @include highlighted-background;
  @include header-text;
}
```

> @mixin定义时可以设置参数
> 参数可以设置默认值
> 参数个数不确定时，可以使用列表表示形式(list...)，如$shadows...
> @include传参时也可以使用列表表示形式(list...)
> 列表表示形式只能放在参数最后，表示剩余参数

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue, 1in); }
// 编译后
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed;
}
```

```scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }    -- 等同于 p { @include sexy-border($color: blue); }
h1 { @include sexy-border(blue, 2in); }    -- 等同于 h1 { @include sexy-border($color: blue, $width: 2in); }
// 编译后
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed;
}
h1 {
  border-color: blue;
  border-width: 2in;
  border-style: dashed;
}
```

```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
// 编译后
.shadows {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

```scss
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}
$values: #ff0000, #00ff00, #0000ff;
.primary {
  @include colors($values...);
}
// 编译后
.primary {
  color: #ff0000;
  background-color: #00ff00;
  border-color: #0000ff;
}
```

> @mixin定义时可以在内部设置一个@content
> @include引入@mixin时如果带有css声明块，会将声明块中的css声明放置到@content位置

```scss
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}
// 编译后
.colors {
  background-color: blue;
  color: white;
  border-color: blue;
}
```

### @extend

> @extend生成的代码量比@mixin相对更少
> @extend的原理：如果.seriousError @extend .error，那么样式表中的任何一处.error选择器都用[.error, .seriousError]这一选择器组进行替换

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
// 编译后
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

```scss
.hoverlink {
  @extend a:hover;
}
.comment a.user:hover {
  font-weight: bold;
}
// 编译后
.comment a.user:hover, .comment .user.hoverlink {
  font-weight: bold;
}
```

```scss
// 多继承
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}
// 编译后
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  border-width: 3px;
}
```

```scss
// 链式继承
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
// 编译后
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError, .criticalError {
  border-width: 3px;
}
.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
```

> 两条选择器序列的@entend会生成两个新的选择器
> 一个第一条序列在第二条序列之前，一个第二条序列在第一条序列之前
> 尽量不要使用这种序列间的@entend

```scss
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
// 编译后
#admin .tabbar a,
#admin .tabbar #demo .overview .fakelink,
#demo .overview #admin .tabbar .fakelink {
  font-weight: bold;
}
```

```scss
#admin .tabbar a {
  font-weight: bold;
}
#admin .overview .fakelink {
  @extend a;
}
// 编译后
#admin .tabbar a,
#admin .tabbar .overview .fakelink,
#admin .overview .tabbar .fakelink {
  font-weight: bold;
}
```

> 使用占位选择器(%)来替代具体的选择器
> 使用了占位选择器(%)的规则自身不会被渲染

```scss
// This ruleset won't be rendered on its own.
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
.notice {
  @extend %extreme;
}
// 编译后
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

> 在指令中使用@extend需要使两个选择器处于同一个指令块

```scss
// works fine
@media print {
  .error {
    border: 1px #f00;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
}
```

```scss
// works error
.error {
  border: 1px #f00;
  background-color: #fdd;
}
@media print {
  .seriousError {
    // INVALID EXTEND: .error is used outside of the "@media print" directive
    @extend .error;
    border-width: 3px;
  }
}
```

### 运算

> 具体运算规则参考：[SASS中文文档 - 运算](http://sass.bootcss.com/docs/sass-reference/#yun-suan)

### 插入符

> \#{}用来将变量值插入到指定位置

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
// 编译后
p.foo {
  border-color: blue;
}
```

### 控制指令

> @if & @else if & @else

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
// 编译后
p {
  color: green;
}
```

> @for
> @for $var from &lt;start&gt; through &lt;end&gt;    -- 包含&lt;end&gt;
> @for $var from &lt;start&gt; to &lt;end&gt;    -- 不包含&lt;end&gt;
> $var可以是任意变量名

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
// 编译后
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

```scss
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}
// 编译后
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
```

> @each
> @each $var in &lt;list&gt;
> $var可以是任意变量名

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
// 编译后
.puma-icon {
  background-image: url('/images/puma.png');
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
}
.egret-icon {
  background-image: url('/images/egret.png');
}
.salamander-icon {
  background-image: url('/images/salamander.png');
}
```

> @while

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
// 编译后
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

### 媒体查询

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
// 编译后
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
// 编译后
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

### 注释

> css的标准注释：/* ... */
> scss的静默注释：// ... ，注释内容不会出现在生成的css文件中

```scss
body {
  color: #333;    // 这种注释内容不会出现在生成的css文件中
  padding: 0;    /* 这种注释内容会出现在生成的css文件中 */
}
```

### 相关链接

> [SASS中文文档](http://sass.bootcss.com/docs/sass-reference/)
> [SASS基础教程](http://www.sasschina.com/guide/)
