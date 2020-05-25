---
title: Javascript 学习记录
date: 2017-09-11 18:42:19
tags: Javascript
---

### 作用域、执行上下文、作用域链、闭包

- 作用域(静态)：标识符(变量名和函数名)的作用范围在代码编译阶段通过词法分析就已经确定
- 执行上下文：
  - 创建阶段：生成变量对象(arguments，函数声明，变量声明)、维护作用域链(执行上下文作用域链)、确定 this
  - 执行阶段：变量对象转换为活动对象、执行可执行代码
- 作用域链：
  - 函数作用域链：函数创建时保存在函数对象内部属性[[Scopes]]中，由不包含函数自身作用域对象的所有上级作用域对象形成的集合
  - 执行上下文作用域链：函数执行时，创建自身作用域对象(活动对象)，并将其加入到函数作用域链顶端形成的集合
- 变量对象与活动对象的关系：this + 变量对象(创建阶段) = 活动对象(执行阶段)
- 闭包与变量对象的关系：闭包的本质就是变量对象
- 作用域与变量对象的关系：变量对象就是函数执行时生成的函数作用域对象
- 作用域链与变量对象的关系：作用域链就是由变量对象(闭包、全局作用域对象)构成的单向链表，实际上是一个指向变量对象的指针列表
- 作用域链与原型链的关系：
  - 作用域链：针对函数中的变量及函数
  - 原型链：针对对象中的成员变量

### this

- 如果函数被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。
  -- obj.fn() => fn()中的 this 指向 obj(调用者对象)
- 如果函数存在一个数组中，那么通过数组索引调用该函数时，函数内部的 this 指向该数组。
  -- arr: [fn(){}], arr[0]() => fn()中的 this 指向 arr(调用者对象)，可以把 arr[0]()看成 arr.fn()
- 如果函数独立调用，那么该函数内部的 this，则指向 undefined。
  -- fn() => fn()中的 this 指向 undefined(没有调用者对象)
- 但是在非严格模式中，当 this 指向 undefined 时，它会被自动指向全局对象。
  -- fn() => fn()中的 this 指向 window
- 使用 call/apply 方法显示指定调用者对象。
  -- fn.call(obj) => fn()中的 this 指向 obj(调用者对象)，本质上其实应该是通过 call()中的 this 指向 fn 函数对象实现的

**结论：函数调用时，内部的 this 永远指向调用者对象。**
_this 的含义不是作用域，不指向作用域对象(变量对象)_

### prototype、\_\_proto\_\_

- 所有对象(对象、数组、函数等)都具有内置属性\_\_proto\_\_，\_\_proto\_\_指向该对象的构造函数的原型(prototype)对象，原型链就是通过\_\_proto\_\_确定
- 函数才具有 prototype 属性，prototype 指向函数的原型对象，普通对象和数组没有 prototype 属性
- 函数的原型(prototype)对象上才有 constructor 属性，constructor 指向函数自身，普通对象和数组没有 constructor 属性
- 对象获取某个属性时，先在对象自身范围内查找，自身范围内没有找到该属性时，再通过\_\_proto\_\_属性一级一级地向上在其构造函数的原型(prototype)对象上查找

### {}，new Object()，Object.create(null) 及 new func()，Object.create(func.prototype) 的区别

- `var a = {};` -- {}创建方式的速度比 new Object()快，因为 new 方式要做额外的处理
- `var b = new Object();` -- a == b // false，a 和 b 是两个对象，但其内部是一样的，b.constructor === b.\_\_proto\_\_.constructor === Object // true
- `var c = Object.create(null);` -- 创建的对象中没有任何属性，\_\_proto\_\_属性也没有
- `var d = new Object(a);` -- a === d // true，new Object() 如果传入的参数是对象，返回的就是它自身，如果传入的参数是数字或字符串，返回的是 Number 或 String 对象(与传入参数==而不===)
- `var e = Object.create(a);` -- e.\_\_proto\_\_ === a // true，Object.create(prototype[, descriptors]) 函数用来创建一个具有指定原型且可选择性地包含指定属性的对象

      var func = function (name, option) {
          this.name = name;
          this.option = option;
      };
      var obj = new func('abc', {x:1, y:2});

- -- 实际的创建过程：先创建一个空对象，将其\_\_proto\_\_属性指向函数的原型，将 this 指向这个空对象并运行这个函数
  -- 实际的创建过程代码：var obj = new Object(); obj.\_\_proto\_\_ = func.prototype; func.apply(obj, ['abc', {x:1, y:2}]);
  -- obj 对象自身中含有 name 和 option 属性

      func.prototype.name = 'abc';
      func.prototype.option = {x:1, y:2};
      var obj = Object.create(func.prototype);

- -- obj 对象自身中不含 name 和 option 属性，但可以通过访问其原型获取到 name 和 option 的值
  -- 修改属性时会在自身添加该属性，如修改 name 会在 obj 中添加 name 字段，不会修改原型中的 name 属性
  -- 修改对象的属性时，会先在原型链中查询是否存在该对象，若存在则修改原型链中已经存在的该对象的属性，若原型链中不存在该对象，则报错

### ES6 Promise vs JQuery Promise

- ES6 中引入了一个 microtask(job) queue 概念，ES6 Promise 通过 microtask queue 实现，resolve()执行时依次将 then()中的回调函数加入 microtask queue
- JQuery Promise 的 then()中回调函数的执行并不保证是异步的，resolve()/reject()的执行方式(sync/async)决定了 then()中回调函数的执行方式
- JQuery Promise 的实现原理：
  - JQuery 内部会维护一个用来存放 then()中回调函数的数组
  - return deferred.promise()执行会返回一个 Promise 对象，然后会同步依次执行 Promise 对象的 then()将其中的回调函数依次放入数组，并尝试执行数组中的回调函数
  - resolve()执行时会修改 Promise 对象的状态(pending -> resolved/fulfilled)，并尝试执行数组中的回调函数
  - 执行数组中的回调函数：遍历数组并根据 Promise 对象的状态(pending/resolved/fulfilled/rejected)做相应的执行

相关链接：

> [ES6 Promise 和 JQuery 中 Promise 的区别](https://segmentfault.com/q/1010000008612124)

### Promise 深入理解

```javascript
new Promise(resolve => {
    console.log(1);
    resolve(3);
    Promise.resolve().then(()=> console.log(4))
}).then(num => {
    console.log(num)
});
console.log(2);
```

- then函数是同步执行的，then函数中的回调函数才是异步执行的，then函数和then中的回调函数执行后返回的都是新的promise
- then函数执行时，如果其对应的Promise状态已经改变(不再是pending)，对应状态的那个回调函数会被添加到nextTick队列，否则如果状态还是pending，两个回调函数会被添加到自身的Promise队列中，等到后续状态发生改变时，再把对应状态的回调函数添加到nextTick队列中，添加的过程不是一次性把所有回调函数都加入nextTick队列，是按顺序执行回调函数，根据上一个回调函数返回的promise状态来确定下一个要被加入nextTick队列的回调函数
- 每个Promise对象都有其自身的Promise队列

```javascript
new Promise(
    (resolve, reject) => {
        resolve('233');
    }
  )
  .then(() => {
    return Promise.reject('2233');
    // throw new Error('err'); // 打印444
  })
  .then(() => {
    console.log(123); //省略return
  })
  .catch(err => {
    console.log(444); //不省略return
  });
```

- 上述代码catch中的return不能省略，省略return会打印123，不省略会打印444
- 传递到下一个then或catch中的promise状态实际上是通过return来控制的

- new Promise()传入的函数中使用return返回的值不会自动被resolve处理，所以需要显示调用resolve才能触发状态改变
- then()传入的函数中使用return返回的值会自动被resolve处理，状态会自动改变，如果return的是一个promise对象，会等待这个promise的状态发生改变了以后才执行后面的then的回调

### Promise 内部抛出的异常无法被外部处理的本质原因

```javascript
try {
    new Promise((resolve, reject) => { throw new Error('test'); });
} catch(err) {
    console.log(err);
}
```

上例中promise内部抛出的Error之所以无法被try catch捕获，是因为当promise内部出现异常时(throw)，实际是执行了Promise.reject()方法，将错误放到了后续的catch方法中处理，而catch中的处理函数是异步执行的，当执行器发现这个promise根本没有catch方法的时候，就把Error抛出到外部，而此时try catch这个同步执行的代码早已执行结束，所以无法再继续去捕获这时才抛出到异常。

这也是为什么以下代码promise外面可以捕获到其内部异常到原因。

```javascript
async function fn() {
    try {
        await new Promise((resolve, reject) => { throw new Error('test'); });
    } catch(err) {
        console.log(err)
    }
}
fn().catch(err => { console.log(`err: ${err}`) })
```

以上代码promise中抛出的Error会被try catch处理，因为await命令会等待其后面到promise执行完才继续执行后续代码，包括promise的所有then和catch方法都会执行完，此时try catch还没执行结束，所以能捕获promise中抛出到Error，如果此处没有使用try catch，promise抛出的Error会被async方法的catch处理。

注：await命令的返回值为后面的promise执行Promise.resolve()或Promise.reject()的值，但要注意，如果后面的promise执行了Promise.reject()，await后面的代码将不会继续执行，包括赋值运算，async函数将直接进入最后的Promise.reject()执行，async函数会对其内部的return值根据内部promise的resolve和reject情况，执行对应的Promise.resolve()或Promise.reject()方法将其返回值转换为promise，此处需要注意到是如果内部的promise有自己到catch方法，当他的catch访问执行完后，promise的状态会切换为resolved而不再是rejected。此处还需要注意一点，如果await后面的promise的返回状态是resolved时，需要显示指定return值，否则return值为undefined，而不是await的返回值，而await后面的promise的返回状态是rejected时，不需要显示指定return值，return值就是await的返回值。

### ES6中的块作用域

const、let变量声明或函数声明会生成块作用域，var变量声明不会生成块作用域。
在块中声明的函数会同时声明在当前块作用域及其第一个父级非块作用域中。
在块中使用const、let声明的变量只会声明在当前块作用域中。

PS：对象一般情况下没有作用域，但是使用with能使对象生成作用域。

### require 和 import

require是运行时加载，执行到requrie语句时才开始加载模块(AMD、CMD、CommonJS都是一样)
es6 import是静态(编译时)加载；import()是动态(运行时)加载，类似require
require和import加载完模块都会立即执行模块代码

对于 `import { obj } from './module.js'`
obj本身是只读的，不能被重新赋值，但如果obj是一个对象，obj中的属性是可以被修改的，需要注意的是，如果obj在多个模块中被导入，在其中一个模块中修改了obj中的属性会导致其他模块中的obj也被修改。因为，import的原理是先查看内存中是否已经存在obj对象，如果已经存在则不会重复导入obj到内存中，而是简单的声明一个变量指向内存中的obj对象，内存中不存在obj对象时才会导入obj对象到内存中。所以实际上多个模块中导入的obj对象其实指向的是内存中的同一个对象。

### Object.preventExtensions & Object.seal & Object.freeze

`Object.preventExtensions(obj)`用来使指定对象变得无法扩展属性，即不能添加新属性
`Object.seal(obj)`相当于在Object.preventExtensions基础上设置对象已有属性的configurable为false，使对象已有属性都不可被删除
`Object.freeze(obj)`相当于在Object.seal基础上再设置对象已有属性的writable为false，使对象已有属性值都不可修改

### reduce

reduce接收一个函数，用来对数组做递减操作，最终返回一个计算值，但是如果操作的数组只有1个值时，不会执行接收的函数，而是直接返回数组中的那个值。如果操作的数组是个空数组，则必须传入初始值，否则会报错。

### Object.assign && { ...x }

Object.assign和扩展运算符方式拷贝对象都是浅拷贝
`Object.assign({}, a, b)` 等价于 `{ ...a, ...b }`
Object.assign和扩展运算符方式都只能拷贝源对象自身的可枚举属性，不能拷贝从原型继承的属性

### ES6 标签模板

标签模板其实不是模板，而是函数调用的一种特殊形式。
alert\`123\` 等同于 alert(['123', raw: Array[1]])
tag\`Hello \${a} world \${b}\` 等同于 tag(['Hello ', ' world ', '', raw: Array[3]], a, b)
-- 相当于对模版字符串执行`split(/\${.+?}/)`函数，然后给返回的数组添加一个不可枚举的raw属性，raw属性是一个数组，存放的值和前面的值一样，只不过是被转义过的，然后将模板字符串中的占位符(变量)按顺序依次传入作为剩余参数。

### requestIdleCallback & IntersectionObserver

- requestAnimationFrame --将回调函数放在下一帧执行，保证会在下一帧中执行
- requestIdleCallback --当前帧有空闲时间时，回调函数才会执行。否则，就推迟到下一帧，如果下一帧也没有空闲时间，就推迟到下下一帧，以此类推。它还可以接受第二个参数，表示指定的毫秒数。如果在指定的这段时间之内，每一帧都没有空闲时间，那么回调函数将会强制执行。
- IntersectionObserver --元素与视口的交叉区域，基于requestIdleCallback实现，可以用来做图片懒加载，无限滚动

### 字符串slice、substring、substr

slice用法和substring相同，传入的两个参数都是索引值，截取的字符串左闭右开，并且slice比substring用法更灵活，slice的两个参数可以传负值，substring的两个参数必须是正数。
substr第一个参数是起始索引值，可以为负值，第二个参数是长度，并且不推荐使用，因为该方法不属于ECMAScript标准。

### x == y 的隐式转换规则

1. 判断x, y类型相同
    1. 判断x, y是undefined，返回true
    2. 判断x, y是null，返回true
    3. 判断x, y是Number类型
        1. 判断x | y是NaN，返回false
        2. 判断x, y值相等，返回true
        3. 判断x, y值是否是+0/-0，返回true
        4. 其他都返回false
    4. 判断x, y是String类型
        1. 判断x, y是相同字符串，返回true
        2. 其他都返回false
    5. 判断x, y是Boolean类型
        1. 判断x, y值相同，返回true
        2. 其他都返回false
    6. 判断x, y是Object类型
        1. 判断x, y引用同一个对象（内存地址相同），返回true
        2. 其他都返回false
2. 判断x, y的值分别为null和undefined，返回true
3. 判断x, y的类型分别为Number和String，将String类型的值做ToNumber转换，再做 ==
4. 判断x, y其中一个是Boolean类型，将Boolean类型的值做ToNumber操作，再做 ==
5. 判断x, y其中一个是Object类型，另一个是Number或String类型，将Object类型的值做ToPrimitive操作，在做 ==
6. 返回false

[The Abstract Equality Comparison Algorithm](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

### <, >, <=, >= 的比较规则

所有比较运算符都支持任意类型，但是比较*只支持数字和字符串*，所以需要执行必要的转换然后进行比较，转换规则如下:

1. 如果操作数是对象，转换为原始值：如果valueOf方法返回原始值，则使用这个值，否则使用toString方法的结果，如果转换失败则报错
2. 经过必要的对象到原始值的转换后，如果两个操作数都是字符串，按照字母顺序进行比较（他们的16位unicode值的大小）
3. 否则，如果有一个操作数不是字符串，将两个操作数转换为数字进行比较

### + 运算符工作流程

1. 如果有操作数是对象，转换为原始值
2. 此时如果有一个操作数是字符串，其他的操作数都转换为字符串并执行连接
3. 否则：所有操作数都转换为数字并执行加法

### 箭头函数 - 严格模式的this指向

箭头函数：因为this是词法层面上的，严格模式中与this相关的规则会被忽略。
即普通函数在严格模式下this指向undefined的情况，改用箭头函数this会指向window。

以上说法不太正确，箭头函数的this就是指向外层最近的普通函数的this，而在全局环境中直接声明箭头函数时，即使使用严格模式，this依旧指向window而并不是undefined，应该是因为全局环境的创建(词法解析)阶段早已经预先处理了，不会在受我们设置的严格模式影响，this已经确定指向window，箭头函数的this指向全局环境的this，所以也指向window。如果是在函数中声明箭头函数，且函数中设置严格模式，那么箭头函数的this是可能会指向undefined的。

### replace 用法

语法：`stringObject.replace(regexp/substr, replacement)`

replacement可以是如下值：

- string：直接用字符串替换匹配项，有个特殊的是取值可以类似 `'$1 $2'`，`$1` 表示匹配子表达式的第一个匹配项。
- function：如果是函数，函数的第一个参数就是匹配整个正则表达式的匹配项，后面0个或多个参数是匹配子表达式的匹配项，有几个子表达式就有几个参数，后面接着的参数是表示匹配整个正则表达式的匹配项在 stringObject 中的位置索引，最后一个参数是 stringObject 本身。

### JSON.stringify

语法：`JSON.stringify(value[, replacer [, space]])`

- value: 将要序列化成一个JSON字符串的值。
- replacer: 可选，可以为数组或函数
    - 如果为数组：则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中，replacer作key值（这个在讲实例的时候就知道这个key是干嘛的了，先记住就好）
    - 如果为函数：则把系列化后的每一个对象（记住是每一个）传进方法里面进行处理
- space: 可选，指定缩进用的空白字符串
    - 如果省略的话，那么显示出来的值就没有分隔符。直接输出来
    - 如果是一个数字的话，那么它就定义缩进几个字符，范围是：0到10（数字小于1，则默认为0，大于10，则默认为10）
    - 如果是一些转义字符，比如“\t”，表示回车，那么它每行一个回车。
    - 如果仅仅是字符串，就在每行输出值的时候把这些字符串附加上去就OK。当然，最大长度也是10个字符

使用JSON.stringify将对象序列化为字符串时，undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）

[JSON.stringify() - CSDN](https://blog.csdn.net/pika_lzy/article/details/79212476)

### isNaN(ES5) && Number.isNaN(ES6)

- isNaN(a)会对a先用Number(a)进行类型转换，然后判断是否是NaN
    - Number(undefined) 或 Number({}) // NaN
    - Number(null) // 0
- Number.isNaN(a)不会进行类型转换

### DOMContentLoaded

DOMContentLoaded事件本身不会等待外联css文件的加载解析，但是会等待内嵌的同步js文件(script标签)的执行，而如果css文件是放在js文件之前加载(html文件中的位置)，js文件的执行会等待css文件的解析，所以通常情况下DOMContentLoaded事件会等待css和js文件的加载执行，如果将js文件设置成异步，那么DOMContentLoaded事件就不会等待css和js文件的加载了，另外，DOMContentLoaded事件不会等待iframe和image的加载，load事件会。

Vue中遇到这样一个问题，Vue router切换路由控制组件渲染，如果Vue组件是异步加载的，DOMContentLoaded事件不会等待组件的加载和渲染，所以也无法在DOMContentLoaded事件触发时获取到Vue组件里面的元素。load事件会等待异步加载组件加载完成，但如果组件中某些元素需要依赖接口返回的数据来渲染，DOMContentLoaded和load事件都不会等待接口数据返回，所以此时无法获取到这些元素。

### 首屏加载时间

要统计首屏加载时间，通常是要计算首屏中包含的图片加载时间的最大值，判定图片是否在首屏需要计算图片的偏移与视口的高度，所以有一个前提要求是要在图片加载完直接就提前设置好图片的固定高度，否则根据图片自身比例动态设置高度，很可能会引起布局变化，从而使首屏中包含的图片数量统计不准确，导致首屏加载时间计算失真。

### function声明也会形成block scope

当function声明在一段代码块中时，即被{}包裹起来，也会形成块级作用域，此时父作用域中会声明函数变量，但是初始化值为undefined，函数的赋值操作会推迟到执行阶段。
和let的区别是，函数的赋值操作会修改父作用域中声明的函数变量，而let不会在父作用域中声明变量。
另外，let、const、class声明的行为表现一致。

### Symbol

symbol类型的对象属性虽然enumerable为true，但仍不会被for in，Object.keys/values/entries，Object.getOwnPropertyNames()、JSON.stringify()获取到。

### for in、in、Object.keys、Object.assign

for...in会遍历原型链上的可枚举属性
in判断属性是否在对象上，不管对象自身或其原型链上的属性是否可枚举都会检查
Object.keys/Object.assign只检查自身对象的可枚举属性，不会检查原型链上的属性

### passive的功能

表明事件监听器中不会有preventDefault调用，有的话会报警告且无效。

Chrome浏览器对于手势输入事件的响应是非常快的，因为它可以不需要经过内核线程，直接由合成线程快速处理。然而手势输入事件的产生可能需要内核线程，这会导致Chrome对手势输入事件的优化效果大打折扣。由前面介绍知道，手势输入事件是由连续的普通输入事件组成，而这些普通的输入事件可能会被对应的事件监听器内部调用preventDefault函数来阻止掉事件的默认行为，在这种场景下是不会产生手势输入事件。如连续的mousewheel事件默认可以产生GestureScrollUpdate事件，但是如果监听器内部调用了preventDefault函数，那么这种情况下则不应该产生GestureScrollUpdate手势事件的。浏览器只有等内核线程执行到事件监听器对应的JavaScript代码时，才能知道内部是否会调用preventDefault函数来阻止事件的默认行为，所以浏览器本身是没有办法对这种场景进行优化的。这种场景下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感觉到页面卡顿。

[让页面滑动流畅得飞起的新特性：Passive Event Listeners](https://blog.csdn.net/tengxy_cloud/article/details/52858742)

