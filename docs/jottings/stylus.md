# Stylus 记录

css规则体中的括号，冒号及分号都是可选的。

#### 选择器(Selectors)

& 可以不放在最前面使用，此时&表示所有的祖先选择器

#### 变量(Variables)

- font-size = 12px
    - 使用=赋值，$加不加都可以
- 可以使用@字符在属性名前来访问该属性名对应的值
    - 属性会“向上冒泡”查找堆栈直到被发现，或者返回null

#### 插值(Interpolation)

支持通过使用\{\}字符包围表达式来插入值，其会变成标识符的一部分。例如，-webkit-\{'border' + '-radius'\}等同于-webkit-border-radius

#### 运算符(Operators)

- 优先级：
    - []
    - ! ~ + -
    - is defined
    - ** * / %
    - + -
    - ... ..
    - \<= >= \< >
    - in
    - == is != is not isnt
    - is a
    - && and || or
    - ?:
    - = := ?= += -= *= /= %=
    - not
    - if unless

()表达式可以充当元组，元组可以使用[]下标运算符取值，元组应该和python中的概念一样。

```stylus
1..5
// => 1 2 3 4 5

1...5
// => 1 2 3 4
```

二元加乘运算其单位会转化，或使用默认字面量值。例如，5s - 2px结果是3s

```stylus
15px - 5px
// => 10px

5s - 1000ms
// => 4s
```

在属性值内使用/(除操作符)时候，你必须用括号包住。

条件赋值：以下写法等价

```stylus
color := white
color ?= white
color = color is defined ? color : white
```

type()内置函数用来查看类型，和python中的概念应该一样。

#### 混合书写(Mixins)

可以使用arguments内置变量传参，类似js中的arguments用法，调用mixin时可以当属性使用或函数调用，如下：

```stylus
border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

form input[type=button]
  border-radius(5px)
  border-radius 5px
```

#### 方法(Functions)

函数和混合的区别在于函数有返回值，函数内部的最后一个表达式就是返回值，如果表达式有多个值需要用()将其转换成元组。

和js一样，函数可以当作另一个函数的参数传入。

arguments在函数中用法和混合中一样。

#### 关键字参数(Keyword Arguments)

可以使用p()方法查看函数或混合书写中接受的参数，如：`p(rgba)`

#### 其余参数(Rest Params)

支持args...形式的其余参数，概念和python中的一样。
和arguments不一样，如果有多个剩余参数，args...形式会忽略逗号。

#### 注释(Comments)

```stylus
// 转换成css后会被删除

/*
 * 压缩后会被删除，也可以写成/* ... */
 */

/*!
 * 压缩后也不会被删除，也可以写成/*! ... */
 */
```

#### 条件(Conditionals)

- if / else if / else
- unless(除非)
- 可以使用后缀条件，类似python中的推导式写法

#### 迭代(Iteration)

- for \<val-name> [, \<key-name>] in \<expression>
- 可以使用后缀迭代，类似python中的推导式写法

#### 导入(@import)

- 当使用@import没有.css扩展，会被认为是Stylus片段（如：@import "mixins/border-radius"）。
- @import工作原理为：遍历目录队列，并检查任意目录中是否有该文件（类似node的require.paths）。该队列默认为单一路径，从filename选项的dirname衍生而来。 因此，如果你的文件名是/tmp/testing/stylus/main.styl，导入将显现为/tmp/testing/stylus/。
- @import也支持索引形式。这意味着当你@import blueprint, 则会理解成blueprint.styl或blueprint/index.styl. 对于库而言，这很有用，既可以展示所有特征与功能，同时又能导入特征子集。

#### 关键帧(@keyframes)

使用@keyframes，可以通过vendors变量来控制自动添加私有前缀(webkit moz official)。

#### 继承(@extend)

和scss的区别：scss不支持继承嵌套选择器，stylus可以，如下：

```stylus
form
  button
    padding: 10px

a.button
  @extend form button
// scss中语法错误：Syntax error: Can't extend form button: can't extend nested selectors
// stylus中正常
```

#### CSS字面量(CSS Literal)

@css \{ ... \}可以将\{\}中的部分解析为css字面量。

#### 字符转码(Char Escaping)

和js一样使用\转义字符。

> [Stylus官网](http://stylus-lang.com)
> [Stylus中文版参考文档 - 张鑫旭](http://www.zhangxinxu.com/jq/stylus)
