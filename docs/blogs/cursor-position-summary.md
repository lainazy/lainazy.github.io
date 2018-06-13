---
title: DOM 中的 Selection & Range 对象使用总结（光标定位控制）
date: 2018-06-12 09:51:51
tags: DOM Selection Range
---

# DOM 中的 Selection & Range 对象使用总结（光标定位控制）

项目中使用 div + contenteditable="true" 模拟输入框时，遇到一个问题：<br>
当 div 中有文本内容，通过 js 代码将焦点聚焦到该 div 时，光标总是定位在文本内容前面。<br>
想要的效果是，光标定位在文本内容后面，为了解决该问题做了一些探索，记录一下。<br>
（网上搜索到的别人的很多方法，发现很多都是浏览器不支持的，MDN 中也查不到，不知道是不是被废弃了）

首先我们要知道一点：**光标位置是由 Selection 对象控制的**。<br>
_如果 Selection 对象的起始点和终止点重合，则显示效果为一个闪烁的光标，否则显示效果是一段高亮的区域。_

直接上一段有效的 code：

```js
// demo1
const range = document.createRange() // 创建一个范围，IE可能需要使用createTextRange及其对应方法，此处只记录标准方法
const node = document.getElementById('xxx').childNodes[0] // childNodes[0]通常为文本节点
range.selectNodeContents(node) // 将文本节点的内容添加到范围(Range)中
range.collapse(false) // 清除范围中包含的内容，并把范围的起始点设置为原内容的结尾
const selection = window.getSelection() // 获取当前的选区(Selection)，即焦点聚焦的元素
selection.removeAllRanges() // 删除选区中原有的所有范围，通常一个选区中只有一个范围
selection.addRange(range) // 将新创建的范围添加到选区中
```

以上代码就是设置光标到文本内容末尾的一种方式。<br>
其实该代码部分内容稍微修改下也可以达到同样效果：

```js
// demo2
const range = document.createRange() // 创建一个范围，IE可能需要使用createTextRange及其对应方法，此处只记录标准方法
const node = document.getElementById('xxx').childNodes[0] // childNodes[0]通常为文本节点
range.selectNodeContents(node) // 将文本节点的内容添加到范围(Range)中
// range.collapse(false) // 清除范围中包含的内容，并把范围的起始点设置为原内容的结尾
const selection = window.getSelection() // 获取当前的选区(Selection)，即焦点聚焦的元素
selection.removeAllRanges() // 删除选区中原有的所有范围，通常一个选区中只有一个范围
selection.addRange(range) // 将新创建的范围添加到选区中
selection.collapseToEnd() // 清除选区中的内容，并把选区的起始点设置为原内容的结尾
```

上述代码和之前代码看起来区别不大，但其实原理不同。

- demo1 中是使用 Range 对象的 collapse 方法来实现光标的定位，此时 Range 对象中就已经不包含文本内容了，使用 Range.toString() 方法可以发现内容为空，并且 Range 对象的起始点和终止点位置都是在文本内容末尾，所以将该 Range 对象添加到 Selection 对象中时，Selection 对象中包含的是一个没有内容的 Range 对象。由于 Selection 对象中只包含一个 Range 对象，所以 Selection 对象的起始点和终止点分别为 Range 对象的起始点和终止点，也就是文本内容的末尾。
- demo2 中是使用 Selection 对象的 collapseToEnd 方法来实现光标的定位，此时 Range 对象中其实是有文本内容的，Range 对象的起始点在文本内容的开头，终止点在文本内容的末尾，所以将该 Range 对象添加到 Selection 对象中时，Selection 对象的起始点和终止点也分别位于文本内容的开头和末尾。如果此时不调用 Selection.collapseToEnd() 方法，我们会发现显示效果为文本内容的全选高亮效果(就和我们自己选中一段文字的效果一样)，调用 Selection.collapseToEnd() 方法会使 Selection 对象的起始点折叠到终止点的位置，起始点和终止点重合，所以会变成光标闪烁的效果，但此时 Range 对象的起始点和终止点不会改变。

测试发现：

- safari 和 chrome 中，一个 Selection 对象中貌似只能包含一个 Range 对象，如果 Selection 对象中已经包含了一个 Range 对象，后续添加的 Range 对象无效。
  - 如依次执行 selection.addRange(range1) 和 selection.addRange(range2)，selection 中只会包含 range1。
- firefox 中，一个 Selection 对象中可以包含多个 Range 对象，但 Selection 对象的起始点(anchorOffset)和终止点(focusOffset)貌似不是包含所有 Range 对象的值，而是设置为最后一个添加的 Range 对象的起始点和终止点。

## Selection 对象

[Selection - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)

## Range 对象

[Range - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)
