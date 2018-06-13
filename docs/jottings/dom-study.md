---
title: DOM 笔记
date: 2018-06-01 13:28:34
tags: DOM
---

# DOM 笔记

[文档对象模型(DOM) - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)<br>
[XML DOM 参考手册 - W3school](http://www.w3school.com.cn/xmldom/xmldom_reference.asp)<br>
[JavaScript 和 HTML DOM 参考手册 - W3school](http://www.w3school.com.cn/jsref/index.asp)<br>
[JavaScript 和 HTML DOM 参考手册 - 菜鸟教程](http://www.runoob.com/jsref/jsref-tutorial.html)

- 继承关系
  - window -> Window -> WindowProperties -> EventTarget -> Object
  - document -> HTMLDocument -> Document -> Node -> EventTarget -> Object
  - body -> HTMLBodyElement -> HTMLElement - Element -> Node -> EventTarget -> Object
  - click(Event) -> MouseEvent -> UIEvent -> Event -> Object
- 测试发现，chrome 浏览器中，貌似每个后代原型对象中会包含所有的祖先原型对象中的非方法属性。
- 测试发现，原型链上的所有非方法属性都会包含在实例对象中。

## Window 对象

[Window - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)

Window 对象的属性和方法：

- **navigator**: 包含有关浏览器的信息。
  - appCodeName: 返回浏览器的代码名。
    - 在所有以 Netscape 代码为基础的浏览器中，它的值是 "Mozilla"。为了兼容起见，在 Microsoft 的浏览器中，它的值也是 "Mozilla"。
  - appName: 返回浏览器的名称（只读）。
    - 在基于 Netscape 的浏览器中，这个属性的值是 "Netscape"。在 IE 中，这个属性的值是 "Microsoft Internet Explorer"。其他浏览器可以正确地表示自己或者伪装成其他的浏览器以达到兼容性。
  - appVersion: 返回浏览器的平台和版本信息（只读）。
    - 该字符串的第一部分是版本号。把该字符串传递给 parseInt() 只能获取主版本号（如：5）。该属性的其余部分提供了有关浏览器版本的其他细节，包括运行它的操作系统的信息。
  - userAgent: 返回浏览器用于 HTTP 请求的用户代理头的值（只读）。
    - 通常是在 navigator.appCodeName 的值之后加上斜线和 navigator.appVersion 的值构成的。
  - cookieEnabled: 返回浏览器是否启用了 cookie 的布尔值（只读）。
  - onLine: 返回当前是否联网的布尔值（只读）。
  - javaEnabled(): 返回浏览器是否支持并启用了 Java 的布尔值。
- **history**: 包含用户（在浏览器窗口中）访问过的 URL。
  - length: history 列表中 URL 数量。
  - back(): history 列表中的前一个 URL。
  - forward(): history 列表中的下一个 URL。
  - go(number|URL): history 列表中具体某个 URL。
    - URL 参数使用的是要访问的 URL，或 URL 的子串。而 number 参数使用的是要访问的 URL 在 History 的 URL 列表中的相对位置。
- **location**: 包含有关当前 URL 的信息。
  - href: 设置或返回当前显示的文档的完整 URL。
  - protocol: 设置或返回当前 URL 的协议。
  - host: 设置或返回当前 URL 的主机名称和端口号。
  - hostname: 设置或返回当前 URL 的主机名。
  - port: 设置或返回当前 URL 的端口部分。
  - pathname: 设置或返回当前 URL 的路径部分。
  - search: 设置或返回当前 URL 的查询部分（?之后的部分）。
  - hash: 设置或返回当前 URL 的锚部分（#号开始的部分）。
  - reload(force): 重新加载当前文档。
    - 如果该方法没有规定参数，或者参数是 false，它就会用 HTTP 头 If-Modified-Since 来检测服务器上的文档是否已改变。如果文档已改变，reload() 会再次下载该文档。如果文档未改变，则该方法将从缓存中装载文档。这与用户单击浏览器的刷新按钮的效果是完全一样的。
    - 如果把该方法的参数设置为 true，那么无论文档的最后修改日期是什么，它都会绕过缓存，从服务器上重新下载该文档。这与用户在单击浏览器的刷新按钮时按住 Shift 健的效果是完全一样。
  - assign(URL): 加载一个新的文档。
  - replace(newURL): 加载一个新的文档替代当前文档。
    - 不会在 History 对象中生成一个新的记录。当使用该方法时，新的 URL 将覆盖 History 对象中的当前记录。
- **screen**: 包含有关客户端显示屏幕的信息。
  - width/height: 返回显示浏览器的屏幕的宽度/高度，以像素计（只读）。包含任务栏的宽度/高度。
  - availWidth/availHeight: 返回显示浏览器的屏幕的可用宽度/可用高度，以像素计（只读）。不包含任务栏的宽度/高度。
- innerWidth/innerHeight: 返回可视区宽度/高度（只读）。不包含菜单栏、工具栏、滚动条等宽度/高度。
  - IE 不支持这些属性。它用 document.documentElement 或 document.body（IE8 及之前版本）的 clientWidth 和 clientHeight 属性作为替代。
- outerWidth/outerHeight: 返回整个窗口的宽度/高度（只读）。包含菜单栏、工具栏、滚动条等宽度/高度。
  - IE 不支持这些属性，且没有提供替代的属性。
- pageXOffset/pageYOffset: 设置或返回当前页面相对于窗口显示区左上角的 X/Y 位置。
- scrollX/scrollY: pageXOffset 和 pageYOffset 的别名。
- screenLeft/screenTop: 返回窗口的左上角在屏幕上的 X/Y 坐标。
  - Firefox 不支持这些属性。它使用 screenX 和 screenY 替代。
- self: 返回指向当前 window 对象的引用。window、self、window.self 是等价的。
- parent: 返回指向当前窗口的父窗口的 window 对象的引用。
  - 如果当前窗口没有父窗口，则返回指向自身窗口的 window 对象的引用。
- top: 返回指向当前窗口的最顶层窗口的 window 对象的引用。
  - 如果当前窗口就是最顶层窗口，则返回指向自身窗口的 window 对象的引用。
- name: 设置或返回存放窗口的名称的一个字符串。
  - 该名称是在 open() 方法创建窗口时指定的或者使用一个 `<frame>` 标记的 name 属性指定的。
  - 窗口的名称可以用作一个 `<a>` 或者 `<form>` 标记的 target 属性的值。以这种方式使用 target 属性声明了超链接文档或表单提交结果应该显示于指定的窗口或框架中。
- opener: 设置或返回对创建该窗口的 Window 对象的引用。
  - 即在 window.open() 打开的子窗口中设置或获取父窗口的 Window 对象。
  - 只有表示顶层窗口的 Window 对象的 opener 属性才有效，表示框架的 Window 对象的 operner 属性无效。
- closed: 返回指定  窗口是否已经关闭的布尔值（只读）。
- alert(message): 警示框
- confirm(message): 确认框
- prompt(text, defaultText): 可输入的对话框
- print(): 用打印机打印当前窗口的内容。
- focus(): 把键盘焦点给予一个窗口。
- blur(): 把键盘焦点从窗口移开。
  - Opera 不支持该方法。
- open(URL, name, specs, replace): 打开一个新的浏览器窗口或查找一个已命名的窗口。
  - [具体参数说明](http://www.runoob.com/jsref/met-win-open.html)
- close(): 关闭浏览器窗口。
- resizeBy(width, height): 根据指定的像素来调整窗口的大小，以像素为单位。
  - 指定窗口的右下角移动的像素，左上角将不会被移动。
  - Chrome 和 Opera 不支持该方法。
- resizeTo(width, height): 把窗口大小调整为指定的宽度和高度，以像素为单位。
  - 从 Firefox 7 开始，不能改变浏览器窗口的大小了，要依据下面的规则：
    - 不能设置那些不是通过 window.open 创建的窗口或 Tab 的大小。
    - 当一个窗口里面含有一个以上的 Tab 时，无法设置窗口的大小。
- moveBy(x, y): 相对窗口的当前坐标把它移动指定的像素。
- moveTo(x, y): 把窗口的左上角移动到一个指定的坐标。
- scrollBy(xnum, ynum): 把内容滚动指定的像素数。
- scrollTo(xpos, ypos): 把内容滚动到指定的坐标。
- scroll(xpos, ypos): 把内容滚动到指定的坐标。效果和 scrollTo 方法一样。
- getSelection(): 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。
  - 关于 Selection 对象，具体查看[Selection - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)。

## Document 对象

[Document - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)

> 每个载入浏览器的 HTML 文档都会成为 Document 对象。<br>
> Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。<br>
> DOM 中常见的几种节点类型：`元素节点`、`属性节点`、`文本节点`、`注释节点`。

Document 对象的属性和方法：

- all: 返回文档中所有 HTML 元素的引用（只包含元素节点）。(HTMLAllCollection 对象)
  - 注意：使用 document.all 做条件判断时，IE 返回 true，其他浏览器做了一些处理，返回 false。
- anchors: 返回文档中所有 Anchor 对象的引用。(HTMLCollection 对象)
  - 在 HTML 文档中 `<a>` 标签每出现一次，就会创建一个 Anchor(锚) 对象。（来自 w3school 的描述）
  - 锚可用于创建指向另一个文档的链接（通过 href 属性），或者创建文档内的书签（通过 name 属性）。
  - 实际测试发现只有 `<a>` 标签有 name 属性时，才会创建一个 Anchor 对象。
- forms: 返回文档中所有 From 对象的引用。(HTMLCollection 对象)
  - 在 HTML 文档中 `<form>` 标签每出现一次，就会创建一个 Form 对象。
- images: 返回文档中所有 Image 对象的引用。(HTMLCollection 对象)
  - 在 HTML 文档中，`<img>` 标签每出现一次，就会创建一个 Image 对象。
  - 为了与 0 级 DOM 兼容，该集合不包括由 `<object>` 标记定义的图像。
- links: 返回文档中所有 Area 和 Link 对象的引用。(HTMLCollection 对象)
  - 在 HTML 文档中 `<area>` 标签每出现一次，就会创建一个 Area 对象。
  - 实际测试发现每个有 href 属性的 `<a>` 标签，都会创建一个 Link 对象。Link 对象由带 href 属性的 `<a>` 标签创建，而不是 `<link>` 标签。
- children: 返回直接子元素对象的引用集合。(HTMLCollection 对象)
  - 只包含直接子元素中的元素节点。
  - Document 对象的 children 不推荐使用，因为通常返回的都是只包含一个 html 元素的集合，没有什么意义。
- childElementCount: 返回直接子元素的元素个数。
  - 效果和 children.length 相同，因早期 children 未加入标准而存在，现属于冗余属性。
- firstElementChild/lastElementChild: 返回首个/最后一个元素类型的子节点。
  - 与 firstChild/lastChild 区别：
    - firstChild/lastChild：返回的节点可以是任意节点类型。
    - firstElementChild/lastElementChild: 返回的节点是元素类型。
  - 不推荐对 Document 对象使用该属性，因为返回值通常就是 html 元素，没有什么意义。
- compatMode: 返回当前浏览器采用的渲染模式（只读）。
  - 返回值介绍：
    - BackCompat：怪异模式。浏览器客户区宽度是 document.body.clientWidth。
    - CSS1Compat：标准兼容模式。浏览器客户区宽度是 document.documentElement.clientWidth。
- defaultView: 返回关联当前 document 的 window 对象，如果没有则返回 null。
- readyState: 返回当前文档的加载状态（载入中...）。
  - 该属性返回以下值：
    - uninitialized - 还未开始载入
    - loading - 载入中
    - interactive - 已加载，文档与用户可以开始交互，此时会触发 DOMContentLoaded 事件。
    - complete - 载入完成，此时会触发 load 事件。
- inputEncoding: 返回文档的编码（在解析时）。如 "UTF-8"。
  - IE8 及其之前版本和 Opera 不支持该属性。
- charset: 设置或返回文档的字符集编码。通常值为 "UTF-8"。
- characterSet: 返回文档的字符集编码（只读）。
- doctype: 返回与文档相关的文档类型声明（Document Type Declaration）。
  - 该属性是对 DocumentType 对象（Document 的一个子节点）的引用。
  - 对于没有 DTD 的 XML 文档，返回 null。
  - IE8 及其之前版本显示 HTML 和 XHTML 文档时该属性返回 null，但是支持 XML 文档。
- title: 设置或返回当前文档的标题(title 标签中的内容)。
- domain: 返回当前文档的服务器域名（只读）。
- cookie: 设置或查询与当前文档相关的所有 cookie。
- origin: 返回文档的来源（只读）。
  - 该属性通常与 document.defaultView.location.origin 相等。
- contentType: 返回当前文档的内容类型（只读）。
  - IE 貌似不支持该属性。
- referrer: 返回载入当前文档的文档的 URL。
  - 如果当前文档不是通过超级链接访问的，则为 null。
  - 这个属性允许客户端 JavaScript 访问 HTTP 引用头部。
- lastModified: 返回文档最后被修改的日期和时间。
  - 该值来自 http 头部。
- URL: 返回当前文档的 URL（只读）。
  - 一般情况下，该属性的值与包含文档的 Window 的 location.href 属性相同。
  - 不过，在 URL 重定向发生的时候，这个 URL 属性保存了文档的实际 URL，而 location.href 保存了请求的 URL。
- documentURI: 设置或返回文档的位置。
  - IE 不支持该属性。
- documentElement: 返回一个文档的根(html)元素。
- activeElement: 返回文档中当前获得焦点的元素（只读）。
- hasFocus(): 检查当前文档(或文档内的任一元素)是否获取焦点。
- open(mimetype, replace): 打开一个新文档，并擦除当前文档的内容。
  - mimetype 参数可选。规定正在写的文档的类型。默认值是 "text/html"。
  - replace 参数可选。当此参数设置后，可引起新文档从父文档继承历史条目(相当于 history.replace)。
  - 调用 open 方法打开一个新文档并且用 write 方法设置文档内容后，必须记住用 close 方法关闭文档，并迫使其内容显示出来。
- close(): 关闭一个由 document.open 方法打开的输出流，并显示选定的数据。
  - 关闭 open 方法打开的文档流，并强制地显示出所有缓存的输出内容。
  - 如果您使用 write 方法动态地输出一个文档，必须记住当你这么做的时候要调用 close 方法，以确保所有文档内容都能显示。
  - 一旦调用了 close，就不应该再次调用 write，因为这会隐式地调用 open 来擦除当前文档并开始一个新的文档。
- write(exp1, exp2, exp3, ...): 向文档写入 HTML 表达式或 JavaScript 代码。
  - 虽然根据 DOM 标准，该方法只接受单个字符串作为参数。不过根据经验，write 可接受任意多个参数(exp1, exp2, exp3, ...)，它们将按顺序被追加到文档中。
- writeln(exp1, exp2, exp3, ...): 与 write 方法作用相同，外加可在每个表达式后写一个换行符。
- createDocumentFragment(): 创建一个空的 DocumentFragment(文档片段) 节点。
  - DocumentFragment 节点不属于文档树，继承的 parentNode 属性总是 null。
  - 一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点。
- createElement(elementname): 创建一个指定的元素节点。
- createAttribute(attributename): 创建新的 Attr 节点。
- createTextNode(text): 创建文本节点。
- createComment(comment): 创建注释节点。
- createRange: 创建 Range 对象。
  - 可以使用 Range 构造函数，如 new Range()，但该构造函数目前还属于实验阶段。
  - 关于 Range 对象，具体查看[Range - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)。
- createEvent(eventType): 创建新的 Event 对象。
  - 推荐直接使用 Event 构造函数来创建并初始化 Event 对象，如 new Event(eventType, eventInit)。
    - new Event(eventType, eventInit) 相当于是 Document.createEvent() 和 Event.initEvent() 两步的组合。
    - 具体查看[Event 构造函数 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event)。
- getElementById(id): 返回文档中带有指定 id 的第一个对象的引用。
- getElementsByName(name): 返回文档中带有指定 name 的对象的引用集合。
- getElementsByTagName(tagname): 返回文档中带有指定标签名的对象的引用集合。
  - 返回元素的顺序是它们在文档中的顺序。
  - 如果传入特殊字符 "\*"，它将返回文档中所有元素的列表。
  - 传入的字符串可以不区分大小写。
- getElementsByClassName(classname): 返回文档中所有指定类名的元素集合(HTMLCollection)。
  - HTMLCollection 对象是有序的集合。我们可通过节点列表中的节点索引号来访问列表中的节点(索引号由 0 开始)。
- importNode(node, deep): 将一个节点从另一个文档复制到当前文档以便使用。
  - deep 参数可选。如果传入 true，将递归复制其所有子孙节点。
- querySelector(selectors): 返回文档中匹配指定 CSS 选择器的第一个元素。
- querySelectorAll(selectors): 返回文档中匹配指定 CSS 选择器的所有元素，以 NodeList 返回。

### HTMLDocument 对象

- 不同浏览器实现方式存在差异
  - safari 浏览器控制台查看，发现 HTMLDocument 原型对象中没有任何属性。所有 document 相关属性都定义在 Document 原型对象中。
  - chrome 浏览器控制台查看，发现 HTMLDocument 原型对象中包含 Document 原型对象和 Node 原型对象中的所有非方法属性，不包含任何方法属性。
    - open、close、write、writeln 等方法定义在 Document 原型对象中。
    - all、ahchors、forms、images、links、domain、cookie 等非方法属性在 HTMLDocument 原型对象和 Document 原型对象中都有。
  - firefox 浏览器控制台查看，发现 all、ahchors、forms、images、links、domain、cookie、open、close、write、writeln 等属性是在 HTMLDocument 原型对象中定义的，而不是 Document 原型对象中。

## Element 对象

[Element - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

Element 对象的属性和方法：

- id: 设置或返回元素的标识符(id 属性)。
- attributes: 返回元素所有属性节点的一个实时集合（只读）。该集合是一个 NamedNodeMap 对象。
- classList: 返回元素的类属性的实时集合（只读）。该集合是一个 [DOMTokenList](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList) 对象。
  - 具体查看[Element.classList - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)
- className: 设置或返回元素的 class 属性的值。
  - 和 classList 属性区别在于该属性是一个字符串。多个 class 由空格隔开。
- clientWidth/clientHeight: 返回元素的 padding-box 的宽度/高度（只读）。即包含内边距，但不包含滚动条、边框和外边距。
- clientLeft/clientTop: 返回元素的 border-left/border-top 的宽度（只读）。相当于样式 border-left-width/border-top-width 的值。
- scrollWidth/scrollHeight: 返回元素滚动区域的宽度/高度，通常为元素内容的宽度/高度。
  - 元素内容的 margin 部分也会影响该值。例如，垂直滚动时，元素内容的 margin-top 如果和元素自身的 margin-top 发生折叠，该 margin-top 部分通常不会包含，如果没发生折叠，则会包含。因为发生折叠时，折叠的部分不会出现在滚动区域内。
- scrollLeft/scrollTop: 设置或返回元素内容相对于元素自身的水平/垂直滚动距离(元素滚动条移动的距离)。
  - 通常需要给元素设置 overflow 为 auto 或 scroll 才有效，否则返回 0。
- innerHTML: 设置或返回 HTML 语法表示的元素的后代。
  - 该属性会解析后代内容：
    - 返回时，内容包含描述所有元素后代的序列化 HTML 代码。如 `&`、`<`、`>`，会分别返回为 `&amp;`、`&lt;`、`&gt;`。
    - 设置时，删除元素原有的子节点，解析内容字符串，并将生成的节点分配给元素的子元素。
- outerHTML: 设置或返回 HTML 语法表示的元素及其后代。
  - 与 innerHTML 的区别是它包含元素自身。
- tagName: 返回元素的标签名（只读）。
  - 在 XML(或者其他基于 XML 的语言，比如 XHTML、xul) 文档中，tagName 的值会保留原始的大小写。
  - 在 HTML 文档中，tagName 会返回其大写形式。
  - 对于元素节点，tagName 属性的值和 Node.nodeName 属性的值是相同的。
- localName: 返回元素的本地名称。
  - DOM4 之前该属性定义在 Node 接口中。
- namespaceURI: 返回元素的命名空间 URI，若该元素不在命名空间中则返回 null。
  - DOM4 之前该属性定义在 Node 接口中。
- shadowRoot: 返回一个 Shadow DOM 中的元素挂载的 ShadowRoot 节点。
- children: 返回直接子元素对象的引用集合。(HTMLCollection 对象)
  - 只包含直接子元素中的元素节点。
- childElementCount: 返回直接子元素的元素个数。
  - 效果和 children.length 相同，因早期 children 未加入标准而存在，现属于冗余属性。
- firstElementChild/lastElementChild: 返回元素的首个/最后一个直接子元素，如果没有子元素，则返回 null。
- previousElementSibling/nextElementSibling: 返回当前元素之前/之后的元素（处于同一树层级中）。如果无此元素，则返回 null。
  - 与 Node 对象中的 previousSibling/nextSibling 属性的区别在于该属性返回的必须是元素节点。
- hasAttributes(): 判断某节点是否存在任意属性，存在时返回 true，否则返回 false。
- hasAttribute(attributename): 判断指定的属性是否存在，如果存在返回 true，否则返回 false。
- getAttributeNames(): 返回一个数组。包含元素上所有的属性名。如果该元素不包含任何属性，则返回一个空数组。
- getAttribute(attributename): 返回元素上指定的属性值。如果指定的属性不存在，则返回 null 或 ""。
- getAttributeNode(attributename): 返回元素上指定的属性节点。
- setAttribute(name, value): 设置元素上的一个指定属性的值。
- setAttributeNode(attributenode): 给元素设置一个指定的属性节点。
  - 如果元素上已经存在该属性名的属性，则使用新的属性节点替换掉原有的属性节点并将原有属性节点作为返回值返回。
- getBoundingClientRect(): 返回一个 [DOMRect](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMRect) 对象。
  - 具体查看[Element.getBoundingClientRect() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
- getClientRects(): 返回一个 DOMRect 对象的集合。
  - 具体查看[Element.getClientRects() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects)
- getElementsByClassName(classnames): 返回一个 HTMLCollection 对象，包含所有拥有指定 class 的子元素。
- getElementsByTagName(tagname): 返回一个 HTMLCollection 对象，包含所有指定标签名的子元素，不包含自身元素。
- insertAdjacentHTML(position, text): 将指定的文本解析为 HTML 或 XML，并将结果节点插入到 DOM 树中相对于当前元素的指定位置。
  - 它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接 innerHTML 操作更快。
  - position 取值范围：
    - beforebegin: 插入到开始标签之前。(只有在当前元素拥有父元素时有效)
    - afterbegin: 插入到开始标签之后。
    - beforeend: 插入到结束标签之前。
    - afterend: 插入到结束标签之后。(只有在当前元素拥有父元素时有效)
  - text: 需要被解析为 HTML 或 XML，并插入到 DOM 树中的字符串。
- insertAdjacentElement(position, element): 将给定的元素节点插入到 DOM 树中相对于当前元素的指定位置。
  - 参数和 insertAdjacentHTML 方法类似，区别在于该方法直接给定元素节点，不需要解析。
- insertAdjacentText(position, textnode): 将给定的文本节点插入到 DOM 树中相对于当前元素的指定位置。
  - 参数和 insertAdjacentHTML 方法类似，区别在于该方法直接给定文本节点，不需要解析。
- attachShadow(shadowRootInit): 给元素挂载一个 Shadow DOM，并且返回它的 ShadowRoot。
  - 具体查看[Element.attachShadow() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow)
- replaceWith(node|string): 用一系列节点对象或者字符串，替换当前元素节点。字符串被当做等效的 Text 节点插入(不会被解析)。
- before(): 将一系列节点对象或者字符串插入到当前元素之前。字符串被当做等效的 Text 节点插入(不会被解析)。
- after(): 将一系列节点对象或者字符串插入到当前元素之后。字符串被当做等效的 Text 节点插入(不会被解析)。
- prepend(node|string): 将一系列节点对象或者字符串插入到当前元素的第一个子节点之前。字符串被当做等效的 Text 节点插入(不会被解析)。
- append(node|string): 将一系列节点对象或者字符串插入到当前元素的最后一个子节点之后。字符串被当做等效的 Text 节点插入(不会被解析)。
  - 与 Node.appendChild() 方法的差异：
    - Node.appendChild() 方法只接受 Node 对象，该方法允许追加字符串。
    - Node.appendChild() 方法返回追加的 Node 对象，该方法没有返回值。
    - Node.appendChild() 方法只能追加一个节点，该方法可以追加多个节点和字符串。
- closest(selectors): 返回匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 null。
- matches(selectors): 返回一个布尔值。如果元素被指定的 CSS 选择器选择，返回 true，否则返回 false。
- querySelector(selectors): 返回匹配指定 CSS 选择器的第一个子元素。
- querySelectorAll(selectors): 返回所有匹配指定 CSS 选择器的子元素，以 NodeList 返回。
- remove(): 删除指定元素。将指定元素从其父元素的 children 属性中删除。
- removeAttribute(attributename): 删除元素的指定属性。
- removeAttributeNode(attributenode): 删除元素的指定属性节点。
  - 和 removeAttribute 功能一样，区别是该方法是通过指定属性节点来删除。
- scrollIntoView(options): 将当前元素滚动到浏览器窗口的可视区域内。
  - options 参数是一个布尔值或者对象：
    - true(默认值): 元素的顶端将和其所在滚动区的可视区域的顶端对齐。
    - false: 元素的底端将和其所在滚动区的可视区域的底端对齐。
    - 参数为对象时，具体查看[Element.scrollIntoView() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)
- scrollIntoViewIfNeeded(options): 将当前元素滚动到浏览器窗口的可视区域内。
  - 如果当前元素已经在浏览器窗口的可见区域内，则不会发生滚动。
  - options 参数是一个布尔值：
    - true(默认值): 元素将在其所在滚动区的可视区域中居中对齐。
    - false: 元素将与其所在滚动区的可视区域最近的边缘对齐。
      - 根据可见区域最靠近元素的哪个边缘，元素的顶部将与可见区域的顶部边缘对齐，或者元素的底部边缘将与可见区域的底部边缘对齐。
  - 该方法不是标准方法。为 Webkit 浏览器专有。
- requestPointerLock(): 发出异步请求使指针锁定在指定的元素上。
  - 跟踪异步请求的结果，document 对象会收到对应的 pointerlockchange 和 pointerlockerror 事件。
- requestFullscreen(): 发出异步请求使元素进入全屏模式。
  - 调用此 API 并不能保证元素一定能够进入全屏模式。
    - 如果元素被允许进入全屏幕模式，document 对象会收到一个 fullscreenchange 事件，通知调用者当前元素已经进入全屏模式。
    - 如果全屏请求不被许可，则会收到一个 fullscreenerror 事件。
  - 测试发现，当前浏览器都还未支持该方法。需要添加兼容前缀：webkit、moz 等。

### HTMLElement 对象

[HTMLElement - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)

HTMLElement 对象的属性和方法：

- accessKey: 设置或返回元素的快捷键。
- contentEditable: 设置或返回元素内容是否可编辑。
  - inherit(默认值): 继承父元素的可编辑状态。如果父元素可编辑，则元素内容可编辑。
  - true: 内容可编辑。
  - false: 内容不可编辑。
- isContentEditable: 返回元素内容是否可编辑（只读）。
- draggable: 设置或返回元素是否可拖拽。
- dataset: 返回元素上设置的所有自定义数据属性(data-\*)集合（只读）。
- dir: 设置或返回元素内容的文本书写方向。
- hidden: 设置或返回元素是否隐藏。
  - 隐藏的效果类似 css 属性 display: none。
- lang: 设置或返回元素属性值或文本内容的基语言(base language)。
  - 语言代码如：默认值未知(unknown)、简体中文(zh-cn)、英语(en)、日语(ja)。
- innerText: 设置或返回节点及其后代节点的文本内容。
  - **MDN 文档中该属性是定义在 Node 对象中的，而实际在浏览器中测试发现该属性都是放在 HTMLElement 对象中实现的。**
  - 与 Element.innerHTML 属性的区别：
    - Element.innerHTML 会解析内容，而 innerText 不会。
  - 与 Node.textContent 属性的区别：
    - Node.textContent 会返回所有元素的内容，包括 `<style>` 和 `<script>` 这种天生隐藏的元素中的内容和样式为 display: none 的元素中的内容。
    - innerText 受显示效果的影响，不会返回 `<style>` 和 `<script>` 这种天生隐藏的元素中的内容和样式为 display: none 的元素中的内容。
    - innerText 受 CSS 样式的影响，所以它会触发重排(reflow)，而 Node.textContent 不会。
- outerText: 设置或返回节点及其后代节点的文本内容。
  - 返回值时，该属性和 innerText 属性返回结果相同。
  - 设置值时，该属性会将自身元素也删除并替换成指定文本内容。
- offsetParent: 返回一个最近的祖先定位元素（只读）。
  - 如果没有定位元素，则返回最近的 table，table cell 元素或“根元素”(标准模式下为 html，怪异(quirks)模式下为 body)。
    - 实际测试发现：
      - 标准模式下返回的“根元素”也是 body。
      - 当前元素 position: static 时，如果定位元素内包含 table/table cell 元素，会优先返回内层的 table/table cell 元素。
      - 当前元素 position: relative/absolute 时，如果定位元素内包含 table/table cell 元素，仍会返回外层的定位元素。
      - 当前元素 position: fixed 时，safari、chrome 中会返回 null，firefox 中会返回“根元素”(即 body)。
  - 当前元素 display: none 时，offsetParent 返回 null。
  - offsetLeft 和 offsetTop 都是相对于该属性返回元素的内边距边界(padding-box)的。
- offsetLeft/offsetTop: 返回当前元素左上角(border 外边界)相对于 offsetParent 对应节点内边距边界的水平/垂直偏移量。
- offsetWidth/offsetHeight: 返回元素的布局宽度/高度（只读）。对应 border-box 的宽度/高度。
- spellcheck: 设置或返回是否对元素内容进行拼写检查。
- style: 返回一个 CSSStyleDeclaration 对象，表示元素的内联 style 属性，但忽略任何样式表应用的属性。
- tabIndex: 设置或返回一个数字，表示当前元素的 tab 键激活顺序。
  - 顺序为由小到大，具体查看[HTMLElement.tabIndex - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/tabIndex)
- title: 设置或返回元素的 title。
  - 当鼠标移到节点上时，会以“工具提示”（tool tip）的弹出形式显示该属性的属性值文本。
  - 如果一个节点没有 title 属性，默认继承其父节点的相应属性，父节点可能是从父节点的父节点继承，依此类推。
- translate: 设置或返回元素是否可以被翻译。
- click(): 模拟鼠标左键单击当前元素，触发该元素的 click 事件。
- focus(): 设置当前元素获取键盘焦点。
- blur(): 设置当前元素失去键盘焦点。

## Node 对象

[Node - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)

> Node 对象是整个 DOM 的主要数据类型。<br>
> Node 节点对象代表文档树中的一个单独的节点。<br>
> Node 节点可以是元素节点、属性节点、文本节点，或者也可以是[节点类型](http://www.w3school.com.cn/xmldom/dom_nodetype.asp)中所介绍的任何一种节点。注意，虽然所有的对象均能继承用于处理父节点和子节点的属性和方法，但是并不是所有的对象都拥有父节点或子节点。例如，文本节点不能拥有子节点，所以向类似的节点添加子节点就会导致 DOM 错误。

Node 对象的属性和方法：

- baseURI: 返回某个节点的绝对基准 URI。
  - IE 不支持该属性。
- namespaceURI: 返回某个节点的命名空间 URI。
- ownerDocument: 返回某元素的根元素(document)。
- parentElement: 返回某节点的父元素节点。
  - document.documentElement.parentElement 返回 null，因为根节点(#document)不是元素节点。
- parentNode: 返回某节点的父节点。
  - document.documentElement.parentNode 返回根节点(#document)。
- childNodes: 返回指定节点的子节点的节点列表。
  - 与 Document 和 Element 对象中的 children 的区别：
    - children 只包含直接子元素中的元素节点。返回的是一个 HTMLCollection 对象。
    - childNodes 包含直接子元素中的所有类型的节点，比如注释节点和文本节点等。返回的是一个 NodeList 对象。
- firstChild/lastChild: 返回指定节点的首个/最后一个子节点。
  - IE 会忽略节点间生成的空白文本节点（例如，换行符号），而 Mozilla 不会这样做。所以通常需要使用 nodeType 来判断当前节点是否为元素节点。
- previousSibling/nextSibling: 返回某个节点之前/之后紧跟的节点（处于同一树层级中）。如果无此节点，则返回 null。
  - IE 会忽略节点间生成的空白文本节点（例如，换行符号），而 Mozilla 不会这样做。所以通常需要使用 nodeType 来判断当前节点的类型。
- localName: 返回某个节点名称的本地部分。(貌似就是标签名?)
- nodeType: 返回节点的节点类型。(共 12 种)
- nodeName: 返回节点的名称，根据其类型。
  - 如果节点是一个元素节点，返回标签名（大写）。
  - 如果节点是一个属性节点，返回属性名。
  - 其他节点类型，根据不同的[节点类型](http://www.w3school.com.cn/xmldom/dom_nodetype.asp)返回不同的节点名称。
- nodeValue: 设置或返回某节点的值，根据其类型。
  - 如果想返回元素的文本，文本通常是插入到文本节点中，所以返回的是文本节点的节点值(element.childNodes[0].nodeValue)。
- innerText: 设置或返回节点及其后代节点的文本内容。
  - **MDN 文档中该属性是定义在 Node 对象中的，而实际在浏览器中测试发现该属性都是放在 HTMLElement 对象中实现的。**
  - 与 Element.innerHTML 属性的区别：
    - Element.innerHTML 会解析内容，而 innerText 不会。
  - 与 textContent 属性的区别：
    - textContent 会返回所有元素的内容，包括 `<style>` 和 `<script>` 这种天生隐藏的元素中的内容和样式为 display: none 的元素中的内容。
    - innerText 受显示效果的影响，不会返回 `<style>` 和 `<script>` 这种天生隐藏的元素中的内容和样式为 display: none 的元素中的内容。
    - innerText 受 CSS 样式的影响，所以它会触发重排(reflow)，而 textContent 不会。
- textContent: 设置或返回节点及其后代节点的文本内容。
  - 关于设置，任何子节点可被删除，并被一个单独的文本节点所替换，所替换的内容是此属性所设置的字符串。
  - 与 Node.innerText 和 Element.innerHTML 的区别，具体查看[Node.textContent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)
- cloneNode(deep): 创建指定的节点的精确拷贝。
  - deep 参数可选。如果参数是 true，将递归复制当前节点的所有子孙节点。否则，只复制当前节点。
  - 返回的节点不属于文档树，它的 parentNode 属性为 null。
  - 当复制的是 Element 节点时，它的所有属性都将被复制。但要注意，当前节点上注册的事件监听器函数不会被复制。
- appendChild(newchild): 向节点的子节点列表的末尾添加新的子节点。
  - 如果文档树中已经存在了 newchild，它将从文档树中删除，然后重新插入它的新位置。
  - 如果 newchild 是 DocumentFragment 节点，则不会直接插入它，而是把它的子节点按序插入当前节点的 childNodes[] 数组的末尾。
  - 注意，来自一个文档的节点（或由一个文档创建的节点）不能插入另一个文档。也就是说，newchild 的 ownerDocument 属性必须与当前节点的 ownerDocument 属性相同。
- insertBefore(newchild, refchild): 在已有的子节点前插入一个新的子节点。
  - 应该与 appendChild 方法具有同样特性。
  - 如果 refchild 传入 undefined 或 null，就会将 newchild 插入到当前节点的 childNodes[] 数组的末尾。
- removeChild(node): 从子节点列表中删除某个节点。
  - 如果删除成功，返回被删除的节点，否则返回 null。
- replaceChild(newnode, oldnode): 将某个子节点替换为另一个。
  - 新节点可以是文档中已存在的，或者是你新创建的。
  - 如果替换成功，返回被替换的节点，否则返回 null。
- getRootNode(): 返回当前上下文的根节点(#document)，对 Shadow DOM 同样适用。
- hasChildNodes(): 判断某节点是否存在任意子节点，存在时返回 true，否则返回 false。
- contains(node): 判断传入的节点是否为某节点的后代节点，返回一个布尔值。
- compareDocumentPosition(node): 根据文档顺序使用指定的节点比较当前节点的文档位置。
  - P1.compareDocumentPosition(P2)，返回值(Number)可能如下：
    - 1：没有关系，这两个节点不属于同一个文档。
    - 2：第一节点（P1）位于第二个节点后（P2）。
    - 4：第一节点（P1）定位在第二节点（P2）前。
    - 8：第一节点（P1）位于第二节点内（P2）。
    - 16：第二节点（P2）位于第一节点内（P1）。
    - 32：没有关系，或两个节点是同一元素的两个属性。
  - 返回值可以是值的组合。例如，返回 20 意味着在 P2 在 P1 内部（16），并且 P1 在 P2 之前（4）。
  - IE8 及其之前版本不支持该方法。
- isEqualNode(node): 检查两个节点是否相等。
  - 如果满足下列条件，两个节点就相等，并返回 true：
    - 有相同节点类型
    - 相同的节点名，节点值，本地名，命名空间 URI 和前缀。
    - 有相同的属性和属性值(属性没有相同的排序方式)
    - 他们与所有的后代都有相同的子节点
  - IE8 及其之前版本不支持该方法。
- isSameNode(node): 检查两个节点是否是同一个节点。
  - DOM4 后已经废弃该方法，推荐使用 `===` 来比较。
  - Firefox10 之后不再支持该方法。
  - IE8 及其之前版本不支持该方法。
- normalize(): 合并相邻的文本节点并删除空的文本节点。

## Event 对象

[Event - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
[HTML DOM 事件对象 - 具体事件类型参考 - 菜鸟教程](http://www.runoob.com/jsref/dom-obj-event.html)

> 在标准事件模型中，Event 对象传递给事件句柄函数；但是在 IE 事件模型中，它被存储在 Window 对象的 event 属性中。<br>
> 在标准事件模型中，Event 的各种子接口定义了额外的属性，它们提供了和特定事件类型相关的细节。在 IE 事件模型中，只有一种类型的 Event 对象，它用于所有类型的事件。

Event 对象属性和方法：

- type: 返回事件对象的事件类型（只读）。如 “click”。
- bubbles: 返回一个布尔值（只读），如果事件是冒泡类型，则返回 true，否则返回 fasle。
  - 事件冒泡分为三个阶段:
    - 捕获阶段。事件从 Window 开始经过根节点(#document)沿着文档树向下传递给目标节点的父元素。如果目标的任何一个先辈专门注册了捕获事件句柄，那么在事件传播过程中运行这些句柄。
    - 第二个阶段发生在目标节点自身。直接注册在目标上的适合的事件句柄将运行。这与 0 级事件模型提供的事件处理方法相似。
    - 冒泡阶段。事件将从目标节点的父元素开始向上冒泡回 Window。
- defaultPrevented: 返回一个布尔值（只读），表明当前事件的默认动作是否被取消，也就是是否执行了 preventDefault 方法。
- cancelable: 返回一个布尔值（只读）。如果用 preventDefault 方法可以取消与事件关联的默认动作，则返回 true，否则返回 fasle。
- cancelBubble: 设置取消冒泡。
  - 原为 IE 中的属性，现在貌似已经被其他浏览器支持。
  - 设置为 true 时，效果和 stopPropagation 方法相同。
- isTrusted: 返回一个布尔值，表明当前事件是由用户行为触发，还是由一个脚本生成。
  - true: 表明当前事件是由用户行为触发(比如真实的鼠标点击触发一个 click 事件)。
  - false: 表明事件由一个脚本生成的(使用事件构造方法，比如 event.initEvent)。
  - **测试发现，chrome、safari、firefox 浏览器中(其他浏览器未测试)，该属性都不是放在 Event 原型对象上，而是直接放在生成的事件实例对象中的。**
- srcElement: 这是标准的 target 属性的一个别名。
  - 只有在老版本的 IE 中不支持 target 属性时才会使用它。
  - firefox 不支持该属性。
- target: 返回事件的目标节点（触发该事件的节点），即生成事件的元素、文档或窗口。
- currentTarget: 返回事件监听器触发时当前监听器所在的节点，即当前处理该事件的元素、文档或窗口。
  - 返回绑定了事件监听器的节点，比如一个 click 事件监听器绑定在 body 元素上，返回的就是 body 元素。
  - 在捕获和冒泡阶段，该属性是非常有用的，因为在这两个阶段，它不同于 target 属性。
- eventPhase: 返回一个整数值，表示事件流当前处于哪一个阶段。
  - 返回值介绍（返回值是 0|1|2|3）：
    - NONE (0): 此时没有事件正在被处理。
    - CAPTURING_PHASE (1): 捕获阶段。在该阶段注册的事件监听器从上往下被依次触发。
    - AT_TARGET (2): 事件到达目标节点，在目标节点上注册的事件监听器将被触发。
    - BUBBLING_PHASE (3): 冒泡阶段。在该阶段注册的事件监听器从下往上被依次触发。
- returnValue: 设置或返回一个布尔值，表示是否阻止该事件的默认操作。
  - 默认情况下，它被设置为 true，允许发生默认操作。将该属性设置为 false，可以防止默认操作。
  - **这是一个非标准的属性，推荐使用 preventDefault 方法替代它。**
- timeStamp: 返回事件发生时的时间戳（只读）。
  - 此属性仅适用于事件系统支持该属性的特定事件类型。
- composed: 返回一个布尔值（只读），表示给定的事件是否会通过 Shadow DOM 进入到标准的 DOM 中。
- composedPath(): 返回事件路径。如果影子根节点被创建并且 ShadowRoot.mode 是关闭的，那么该路径不包括影子树中的节点。
- initEvent(type, bubbles, cancelable): 用来初始化由 Document.createEvent() 创建的 event 实例。
  - 参数介绍：
    - type: 事件的类型。
    - bubbles: 布尔值，决定事件是否应该向上冒泡。一旦设置了这个值，只读属性 Event.bubbles 也会获取相应的值。
    - cancelable: 布尔值，决定事件的默认行为是否可以被取消。一旦设置了这个值，只读属性 Event.cancelable 也会获取相应的值。
  - 该方法已经被 Web 标准废弃，不推荐使用。
  - 该方法必须在事件被触发之前调用（触发事件使用 EventTarget.dispatchEvent 方法）。
  - 推荐直接使用 Event 构造函数来创建并初始化 Event 对象，如 new Event(type, eventInit)。
    - new Event(type, eventInit) 相当于是 Document.createEvent() 和 Event.initEvent() 两步的组合。
    - type: 事件的类型。
    - eventInit: 可选。一个对象类型的参数，对象属性如下：
      - bubbles: 可选。布尔值，默认值为 false，表示该事件是否冒泡。
      - cancelable: 可选。布尔值，默认值为 false，表示该事件能否被取消。
      - composed: 可选。布尔值，默认值为 false，表示事件是否会在 Shadow DOM 根节点之外触发监听器。
- preventDefault(): 阻止事件的所有默认行为。
- stopPropagation(): 阻止事件流继续传播。
  - 通常我们是在冒泡阶段触发的事件监听器函数中调用该方法，所以只是阻止事件继续冒泡。
  - 如果我们是在捕获阶段触发的事件监听器函数中调用该方法，则后续的捕获和冒泡都会被阻止。
  - 如果某个元素有多个相同类型事件的事件监听函数，则当该类型的事件触发时，多个事件监听函数将按照顺序依次执行。
  - 如果某个监听函数执行了 stopPropagation 方法，该元素绑定的后序相同类型事件的监听函数的执行不会被阻止。
- stopImmediatePropagation(): 阻止事件流继续传播和后序相同类型事件的监听函数的执行。
  - 在 stopPropagation 方法的基础上，增加了阻止后序相同类型事件的监听函数的执行。

### UIEvent 对象

[UIEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent)

> UIEvent 的直接或间接后代：MouseEvent、TouchEvent、FocusEvent、KeyboardEvent、WheelEvent、InputEvent、CompositionEvent。

UIEvent 对象的属性和方法：

- detail: 返回一个整数值（只读），表示事件的明细信息(和事件类型有关)。
  - click 或 dblclick 事件，返回当前点击数。
  - mousedown 或 mouseup 事件，返回当前点击数加 1。
  - 其它 UIEvent 对象，返回 0。
- view: 返回生成该事件的窗口代理对象。在浏览器中，就是 Window 对象。
- which: 返回值取决于实际触发的事件类型。
  - 如果触发的事件是鼠标事件，返回值是 MouseEvent.which 属性值。
  - 如果触发的事件是键盘事件，返回值是 KeyboardEvent.which 属性值。
  - 其他事件貌似返回值都是 0。
  - 该属性已废弃。
- initUIEvent(type, canBubble, cancelable, view, detail): 初始化新创建的 UIEvent 对象。
  - 该方法已废弃。具体查看[UIEvent.initUIEvent() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent/initUIEvent)
  - 推荐使用 UIEvent 构造函数来创建 UIEvent 对象。具体查看[UIEvent() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent/UIEvent)

还有一些非标准的属性，如 layerX/layerY、pageX/pageY 没太搞懂它们之间的区别，具体查看[UIEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent)<br>
另外测试发现，layerX/layerY、pageX/pageY 这几个属性 chrome 不是放在 UIEvent 原型对象上的，而是放在 MouseEvent 原型对象上。

### MouseEvent 对象

[MouseEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)

> 常见事件类型：click、dblclick、mouseup、mousedown。<br>
> MouseEvent 派生的事件：WheelEvent、DragEvent。

MouseEvent 对象的属性和方法：

- button: 返回一个数值（只读），表示用户按下并触发了事件的鼠标按键。
  - 0: 主按键被按下，通常指鼠标左键。
  - 1: 辅助按键被按下，通常指鼠标滚轮或中键。
  - 2: 次按键被按下，通常指鼠标右键。
  - 3: 第四个按钮被按下，通常指浏览器后退按钮。
  - 4: 第五个按钮被按下，通常指浏览器的前进按钮。
- buttons: 返回一个数值（只读），表示事件触发时哪些鼠标按键被按下。
  - 0: 没有按键或者是没有初始化。
  - 1: 鼠标左键。
  - 2: 鼠标右键。
  - 4: 鼠标滚轮或者是中键。
  - 8: 第四按键(通常是“浏览器后退”按钮)。
  - 16: 第五按键(通常是“浏览器前进”按钮)。
  - 如果按下的键为多个，则返回值等于所有按键对应数值进行或(|)运算的结果。
- which: 返回一个数值（只读），表示鼠标事件是由哪个鼠标按键被按下所触发的。
  - 0: 没有按键。
  - 1: 主按键被按下，通常指鼠标左键。
  - 2: 辅助按键被按下，通常指鼠标滚轮或中键。
  - 3: 次按键被按下，通常指鼠标右键。
  - 该属性是非标准属性，推荐使用 button 或 buttons 属性替代。
- altKey: 返回一个布尔值（只读）。鼠标事件触发时，如果 alt 键被按下，则返回 true，否则返回 false。
- ctrlKey: 返回一个布尔值（只读）。鼠标事件触发时，如果 ctrl 键被按下，则返回 true，否则返回 false。
- shiftKey: 返回一个布尔值（只读）。鼠标事件触发时，如果 shift 键被按下，则返回 true，否则返回 false。
- metaKey: 返回一个布尔值（只读）。鼠标事件触发时，如果 meta 键被按下，则返回 true，否则返回 false。
  - 在 Mac 键盘上，表示 Command 键，在 Windows 键盘上，表示 Windows 键。
- offsetX/offsetY: 返回触发事件时，鼠标指针与目标节点的内填充边(padding edge)在水平/垂直方向上的偏移量（只读）。
  - 注意是与目标节点的偏移量，即 Event.target 属性对应的节点，而不是 Event.currentTarget 属性对应的节点。
  - 偏移量相对于 padding-box 的边来计算，即如果目标节点有 border 宽度，相对于 border 内侧计算。
- clientX/clientY: 返回触发事件时，鼠标指针相对于客户端区域的水平/垂直坐标（只读）。
  - 客户端区域(可视区)指的是文档显示的区域，不包含菜单栏这些。
  - 该属性值不受水平/垂直滚动影响。
- pageX/pageY: 返回触发事件时，鼠标指针相对于整个文档的水平/垂直坐标（只读）。
  - 该属性值受水平/垂直滚动影响。
- screenX/screenY: 返回触发事件时，鼠标指针相对于屏幕的水平/垂直坐标（只读）。
- movementX/movementY: 返回当前事件和上一个 mousemove 事件之间鼠标在水平/垂直方向上的移动值。
  - 这个值是这样计算的：
    - currentEvent.movementX = currentEvent.screenX - previousEvent.screenX
    - currentEvent.movementY = currentEvent.screenY - previousEvent.screenY
- x/y: clientX/clientY 属性的别名。
- relatedTarget: 返回鼠标事件的相关节点(次要目标)，没有的话返回 null。
  - 具体查看[MouseEvent.relatedTarget - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/relatedTarget)
  - IE 不支持该属性时，对应的替代属性是 fromElement 和 toElement。
- initMouseEvent(type, canBubble, cancelable, ...): 初始化新创建的 MouseEvent 对象。
  - 该方法已废弃。具体查看[MouseEvent.initMouseEvent() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/initMouseEvent)
  - 推荐使用 MouseEvent 构造函数来创建 MouseEvent 对象。具体查看[MouseEvent() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/MouseEvent)

### TouchEvent 对象

[TouchEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)<br>
[关于 touches、targetTouches、changedTouches 的解释](https://www.cnblogs.com/zsxblog/p/5951833.html)

> 事件类型：touchstart、touchend、touchmove、touchcancel。

可以使用 TouchEvent 构造函数创建新的 TouchEvent 对象。具体查看[TouchEvent() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/TouchEvent)

TouchEvent 对象的属性和方法：

- altKey: 返回一个布尔值（只读）。触摸事件触发时，如果 alt 键被按下，则返回 true，否则返回 false。
- ctrlKey: 返回一个布尔值（只读）。触摸事件触发时，如果 ctrl 键被按下，则返回 true，否则返回 false。
- shiftKey: 返回一个布尔值（只读）。触摸事件触发时，如果 shift 键被按下，则返回 true，否则返回 false。
- metaKey: 返回一个布尔值（只读）。触摸事件触发时，如果 meta 键被按下，则返回 true，否则返回 false。
  - 在 Mac 键盘上，表示 Command 键，在 Windows 键盘上，表示 Windows 键。
- touches: 返回一个 TouchList 对象（只读），包含了所有当前仍然与触摸平面接触的触点的 Touch 对象，无论 touchstart 事件发生在哪个元素上，也无论它们状态是否发生了变化。
- targetTouches: 返回一个 TouchList 对象（只读），包含了当前仍然与触摸平面接触，并且 touchstart 事件发生在 Event.currentTarget 属性对应的节点内部的触点的 Touch 对象。
- changedTouches: 返回一个 TouchList 对象（只读），包含了所有从上一次触摸事件到此次事件过程中，状态发生了改变的触点的 Touch 对象。
  - 对于不同的触摸事件类型，处理的方式不同：
    - touchstart 事件，TouchList 对象中包含在此次事件中新增加的触点的 Touch 对象。
    - touchmove 事件，TouchList 对象中包含和上一次事件相比较，发生了变化的触点的 Touch 对象。
    - touchend 事件，TouchList 对象中包含不再接触触摸平面的触点的 Touch 对象。

#### Touch 对象

[Touch - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch)

> Touch 对象表示在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。<br>
> Touch 对象属性 radiusX、radiusY、rotationAngle 表示用户触摸操作所作用的区域，即触摸区域。这些属性可以表示出一个尽可能匹配触控区域的椭圆形（例如用户的指尖触控）。<br>
> Touch 对象很多属性的值需要依赖硬件设备去获取，例如，如果设备本身不支持侦测压感，那么 force 属性的值将始终是 0，对于 radiusX 和 radiusY 来说同样可能有这种情况，如果设备认为触点只是一个点而不是一个面，它们始终为 1。

可以使用 Touch 构造函数创建新的 Touch 对象。具体查看[Touch() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch/Touch)

Touch 对象的属性和方法：

- identifier: 返回此 Touch 对象的唯一标识符（只读）。这个值在一次触摸动作触发的所有事件(touchstart、touchmove、touchend)中保持一致。
- clientX/clientY: 返回触点相对于客户端区域的水平/垂直坐标（只读）。
  - 客户端区域(可视区)指的是文档显示的区域，不包含菜单栏这些。
  - 该属性值不受水平/垂直滚动影响。
- pageX/pageY: 返回触点相对于整个文档的水平/垂直坐标（只读）。
  - 该属性值受水平/垂直滚动影响。
- screenX/screenY: 返回触点相对于屏幕的水平/垂直坐标（只读）。
- radiusX/radiusY: 返回能够包围用户和触摸平面的接触面的最小椭圆的水平/垂直半径（只读）。
  - 如果设备认为触点只是一个点而不是一个面，返回值将始终是 1。
- rotationAngle: 返回一个以度为单位的旋转角（只读）。由 radiusX 和 radiusY 描述的正方向的椭圆，通过顺时针旋转这个角度后，能最精确地覆盖住用户和触摸平面的接触面。
  - 这个值的范围为 0 ~ 90。 radiusX、radiusY、rotationAngle 这三个值一起描述了用户和触摸平面的接触面的形状的大小。
- force: 返回此 Touch 对象对应的触压大小（只读）。取值范围为 0.0(没有压力) ~ 1.0(最大压力) 之间的浮点数。
  - 如果设备本身不支持侦测压感，那么返回值将始终是 0。
- target: 返回 touchstart 事件触发时，触点所在的元素（只读）。哪怕在触点移动过程中，触点的位置已经离开了这个元素的有效交互区域，或者这个元素已经被从文档中移除。
  - 和 MouseEvent.target 对应。
  - 注意，如果这个元素在触摸过程中被移除，这个事件仍然会指向它，但是不会再冒泡这个事件到 window 或 document 对象。

### KeyboardEvent 对象

[KeyboardEvent - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)

> 事件类型：keydown、keypress、keyup。<br>
> KeyboardEvent 表示发生在按键上的事情。当你需要处理文本输入的时候，推荐使用 input 事件代替。例如，用户使用手持系统如平板电脑输入时，键盘事件可能不会触发。

可以使用 KeyboardEvent 构造函数创建新的 KeyboardEvent 对象。具体查看[KeyboardEvent() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent)

KeyboardEvent 对象的属性和方法：

- altKey: 返回一个布尔值（只读）。键盘事件触发时，如果 alt 键被按下，则返回 true，否则返回 false。
- ctrlKey: 返回一个布尔值（只读）。键盘事件触发时，如果 ctrl 键被按下，则返回 true，否则返回 false。
- shiftKey: 返回一个布尔值（只读）。键盘事件触发时，如果 shift 键被按下，则返回 true，否则返回 false。
- metaKey: 返回一个布尔值（只读）。键盘事件触发时，如果 meta 键被按下，则返回 true，否则返回 false。
  - 在 Mac 键盘上，表示 Command 键，在 Windows 键盘上，表示 Windows 键。
- code: 返回用户按下的键盘物理按键字符串（只读）。如按下 “q” 键，返回 “KeyQ”。
- key: 返回用户按下的键盘物理按键的值（只读）。
  - 值的决定方式：
    - 如果按下的是一个可打印字符键，则返回这个键对应的字符。
    - 如果按下的是特殊键（如 control 或特殊字符），则返回值为 [预定义 Key Values 列表](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values) 中列出的对应按下键的 keyValue 值。
    - 如果 KeyboardEvent 显示是一个死键（dead key），返回值是 “dead”。
    - 如果多个键一起按下，这些键里包含可打印的字符，则只会返回这个可打印的字符。如组合键是 Control + a，返回的值就是 “a“。
    - 有些特殊的键（比如扩展的多媒体键）在 Windows 上不会产生键值；但是会触发 WM_APPCOMMAND 事件，Windows 把这些虚拟按键的事件映射到 DOM 的键盘事件中，尽管他们没有 keycode。
    - 如果无法识别，返回 “Unidentified”。
- keyCode: 返回按键对应的 ASCII 值（只读）。
  - keyCode 和 charCode 属性通常貌似只会设置一个，未设置的那个返回 0。具体设置规则没太搞清楚。
  - 测试发现，通常 keypress 事件触发会使用 charCode，keydown/keyup 事件触发会使用 keyCode。
  - 该属性已废弃。推荐使用 key 属性替代。
- charCode: 返回 keypress 事件触发时按下的字符键的字符 Unicode 值（只读）。
  - 该属性非标准并且已废弃。推荐使用 key 属性替代。
- witch: 返回触发 keypress 事件的键的 charCode，或者触发 keydown/keyup 事件的键的 keyCode（只读）。
  - 该属性已废弃。
- isComposing: 返回一个布尔值（只读），表示该事件是否在 [compositionstart](https://developer.mozilla.org/zh-CN/docs/Web/Events/compositionstart) 之后和 [compositionend](https://developer.mozilla.org/zh-CN/docs/Web/Events/compositionend) 之前被触发。
- location: 返回一个表示键盘或其他输入设备上按键位置的数值（只读）。具体查看[KeyboardEvent.location - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location)
- repeat: 返回一个布尔值（只读），如果按键被一直按住，则返回 true。
- getModifierState(key): 返回一个布尔值，表示在事件触发时，修饰键(Alt、Shift、Ctrl、Meta)是否按下。
  - key 参数必须是 KeyboardEvent.key 属性的返回值之一或者是字符串 “Accel”。
  - 具体查看[KeyboardEvent.getModifierState() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/getModifierState)

### EventTarget 对象

[EventTarget - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)

EventTarget 对象的方法：

- addEventListener(event, function, useCapture): 向指定元素添加事件句柄。
  - event 参数必须。字符串，指定事件名。
  - function 参数必须。指定在事件触发时执行的函数。
    - Event 对象会作为第一个参数传入函数。事件对象的类型取决于特定的事件。例如 "click" 事件属于 MouseEvent(鼠标事件) 对象。
  - useCapture 参数可选。布尔值，指定事件是否在捕获阶段执行。
    - true: 事件句柄在捕获阶段执行
    - false(默认): 事件句柄在冒泡阶段执行。
  - IE8 及其之前版本和 Opera7.0 及其之前版本不支持 addEventListener 方法，对于这些不支持该函数的浏览器，可以使用 attachEvent 方法来添加事件句柄。
- removeEventListener(event, function, useCapture): 移除由 addEventListener 方法添加的事件句柄。
  - event 参数必须。要移除的事件名称。
  - function 参数必须。指定要移除的函数。
    - Event 对象会作为第一个参数传入函数。事件对象的类型取决于特定的事件。例如 "click" 事件属于 MouseEvent(鼠标事件) 对象。
  - useCapture 参数可选。布尔值，指定要移除事件句柄的阶段。
    - true: 在捕获阶段移除事件句柄。
    - false(默认): 在冒泡阶段移除事件句柄。
    - 如果添加两次事件句柄，一次在捕获阶段，一次在冒泡阶段，你必须单独移除该事件。
  - IE8 及其之前版本和 Opera7.0 及其之前版本不支持 addEventListener 方法，对于这些不支持该函数的浏览器，可以使用 detachEvent 方法来移除由 attachEvent 方法添加的事件句柄。
- dispatchEvent(event): 给节点分派一个合成事件。
  - 返回值：如果在事件传播过程中调用了 event 的 preventDefault 方法，则返回 false，否则返回 true。
  - 调用该方法的节点将成为事件的目标节点，分派的事件在捕获阶段中从 Window 开始经过根节点(#document)沿着文档树向下传播到目标节点。
  - 如果该事件的 bubbles 属性为 true，那么在事件的目标节点自身处理事件后，它将沿着文档树向上冒泡。

## Attr 对象

[Attr - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr)

> Attr 对象表示 Element 对象的属性。属性的容许值通常定义在 DTD 中。<br>
> 属性无法拥有父节点，同时属性也不被认为是元素的子节点，对于许多 Node 对象的属性来说都将返回 null。<br>
> 由于 Attr 对象也是一种节点，因此它继承 Node 对象的属性和方法。<br> > **在 DOM4 中, Attr 对象不再从 Node 对象中继承。**

Attr 对象的属性：

- isId: 判断属性是否是 ID 类型。
  - IE 和 Opera 不支持该属性。
- name: 返回属性的名称。
- value: 设置或返回属性的值。
- specified: 如果在文档中设置了属性值，返回 true，如果是 DTD/Schema 中的默认值，返回 false。

## Text 对象

[Text - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Text)

> Text 节点表示 HTML 或 XML 文档中的一系列纯文本。<br>
> 因为纯文本出现在 HTML 和 XML 的元素和属性中，所以 Text 节点通常作为 Element 节点和 Attr 节点的子节点出现。<br>
> Text 节点继承了 CharacterData 接口，通过从 CharacterData 接口继承的 data 属性或从 Node 接口继承的 nodeValue 属性，可以访问 Text 节点的文本内容。<br>
> 使用 document.createTextNode() 来创建一个新的 Text 节点。<br>
> Text 节点没有子节点。

Text 对象的方法：

- splitText(index): 根据指定的 index 把文本节点分割为两个节点。
  - 该方法将在指定的 index 处把 Text 节点分割成两个节点。
  - 原始的 Text 节点将被修改，使它包含 index 位置之前的文本内容（但不包括 index 位置的字符）。
  - 新的 Text 节点将被创建，用于存放从 index 位置（包括该位置上的字符）到原字符结尾的所有字符。
  - 新的 Text 节点是该方法的返回值。
  - 此外，如果原始的 Text 节点具有 parentNode，新的 Text 节点将插入这个父节点，紧邻在原始节点之后。

### CharacterData 对象

[CharacterData - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData)

> CharacterData 是 Text 和 Comment 节点的父接口。<br>
> 文档中不会包含 CharacterData 节点，它们只包含 Text 节点和 Comment 节点。<br>
> 但由于这两种节点具有相似的功能，因此此处定义了这些函数，以便 Text 和 Comment 可以继承它。<br>
> data 属性是一个普通的 JavaScript 字符串，可以使用 + 运算符来操作它进行字符串连接，而且可以对它使用各种 String 和 RegExp 对象的方法。

CharacterData 对象的属性和方法：

- data: 设置或返回元素或属性的文本。
- length: 返回元素或属性的文本长度。
- appendData(string): 在文本节点的末尾添加一个字符串。
- insertData(start, string): 在文本节点的指定位置添加一个字符串。
- deleteData(start, length): 删除文本节点中指定位置开始的指定长度的数据。
- replaceData(start, length, string): 用指定字符串替换文本节点中指定位置开始的指定长度的数据。
- substringData(start, length): 在文本节点中截取指定位置开始的指定长度的数据。

## HTMLCollection 对象

[HTMLCollection - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)

> HTMLCollection 是一个接口，表示 HTML 元素的集合，它提供了可以遍历列表的方法和属性。<br>
> HTML DOM 中的 HTMLCollection 是 “活” 的；如果基本的文档改变时，那些改变通过所有 HTMLCollection 对象会立即显示出来。<br>
> 在 JavaScript 中，HTMLCollection 对象的行为和只读数组一样，可以使用 JavaScript 的方括号，通过编号或名称索引一个 HTMLCollection 对象，而不必调用 item 方法和 namedItem 方法。<br>
> HTMLCollection 对象是只读的，不能给它添加新元素，即使采用 JavaScript 数组语法也是如此。<br>
> HTMLCollection 对象和 NodeList 对象很相似，但前者可能既能用名称索引也能用数字索引。

下面的每个项目（以及它们指定的属性）都返回 HTMLCollection：

- Document (images, applets, links, forms, anchors)
- form (elements)
- map (areas)
- select (options)
- table (rows, tBodies)
- tableSection (rows)
- row (cells)

HTMLCollection 对象的属性和方法：

- length: 返回集合中元素或节点的个数。
- item(index): 返回集合中指定位置的元素或节点。
- namedItem(name): 返回集合中具有指定 id 或 name 属性的元素或节点。如果 HTMLCollection 对象中没有这样的节点，则返回 null。

## NodeList 对象

[NodeList - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)

> NodeList 对象代表一个有顺序的节点列表。<br>
> 节点列表可保持其自身的更新。如果节点列表或 XML 文档中的某个元素被删除或添加，列表也会被自动更新。<br>
> 在一个节点列表中，节点被返回的顺序与它们在 XML 被规定的顺序相同。<br>
> 也可以像 HTMLCollection 一样使用 JavaScript 数组语法，而不必调用 item 方法。

NodeList 对象的属性和方法：

- length: 返回节点列表中的节点个数。
- item(index): 返回节点列表中处于指定索引号的节点。

## NamedNodeMap 对象

[NamedNodeMap - MDN](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)
[NamedNodeMap - W3school](http://www.w3school.com.cn/xmldom/dom_namednodemap.asp)

> NamedNodeMap 对象表示一个无顺序的节点列表。<br>
> NamedNodeMap 可保持其自身的更新。假如节点列表或 XML 文档中的某元素被删除或添加，节点也会被自动更新。<br>
> Element 对象的 Attr 对象都被放置在 NamedNodeMap 对象中。<br>
> 可以使用 JavaScript 数组语法，而不必调用 item 方法。

NamedNodeMap 对象的属性和方法：

- length: 返回节点列表中节点的个数。
- item(index): 返回节点列表中处于指定索引号的节点。
- setNamedItem(node): 设置指定的节点。
  - node 包含 nodeName 和 nodeValue 两部分。
- getNamedItem(nodename): 返回节点列表中指定属性名的值。
- removeNamedItem(nodename): 删除指定的节点。

## DOMTokenList 对象

[DOMTokenList - MDN](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList)

## XMLHttpRequest 对象

[XMLHttpRequest - MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
[XMLHttpRequest - W3school](http://www.w3school.com.cn/xmldom/dom_http.asp)
