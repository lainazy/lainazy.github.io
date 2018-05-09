---
title: Javascript学习记录
date: 2017-09-11 18:42:19
tags: javascript
---

### 作用域、执行上下文、作用域链、闭包

* 作用域(静态)：标识符(变量名和函数名)的作用范围在代码编译阶段通过词法分析就已经确定
* 执行上下文：
  * 创建阶段：生成变量对象(arguments，函数声明，变量声明)、维护作用域链(执行上下文作用域链)、确定 this
  * 执行阶段：变量对象转换为活动对象、执行可执行代码
* 作用域链：
  * 函数作用域链：函数创建时保存在函数对象内部属性[[Scopes]]中，由不包含函数自身作用域对象的所有上级作用域对象形成的集合
  * 执行上下文作用域链：函数执行时，创建自身作用域对象(活动对象)，并将其加入到函数作用域链顶端形成的集合
* 变量对象与活动对象的关系：this + 变量对象(创建阶段) = 活动对象(执行阶段)
* 闭包与变量对象的关系：闭包的本质就是变量对象
* 作用域与变量对象的关系：变量对象就是函数执行时生成的函数作用域对象
* 作用域链与变量对象的关系：作用域链就是由变量对象(闭包、全局作用域对象)构成的单向链表，实际上是一个指向变量对象的指针列表
* 作用域链与原型链的关系：
  * 作用域链：针对函数中的变量及函数
  * 原型链：针对对象中的成员变量

### this

* 如果函数被某一个对象所拥有，那么该函数在调用时，内部的 this 指向该对象。
  -- obj.fn() => fn()中的 this 指向 obj(调用者对象)
* 如果函数存在一个数组中，那么通过数组索引调用该函数时，函数内部的 this 指向该数组。
  -- arr: [fn(){}], arr[0]() => fn()中的 this 指向 arr(调用者对象)，可以把 arr[0]()看成 arr.fn()
* 如果函数独立调用，那么该函数内部的 this，则指向 undefined。
  -- fn() => fn()中的 this 指向 undefined(没有调用者对象)
* 但是在非严格模式中，当 this 指向 undefined 时，它会被自动指向全局对象。
  -- fn() => fn()中的 this 指向 window
* 使用 call/apply 方法显示指定调用者对象。
  -- fn.call(obj) => fn()中的 this 指向 obj(调用者对象)，本质上其实应该是通过 call()中的 this 指向 fn 函数对象实现的

**结论：函数调用时，内部的 this 永远指向调用者对象。**
_this 的含义不是作用域，不指向作用域对象(变量对象)_

### prototype、\_\_proto\_\_

* 所有对象(对象、数组、函数等)都具有内置属性\_\_proto\_\_，\_\_proto\_\_指向该对象的构造函数的原型(prototype)对象，原型链就是通过\_\_proto\_\_确定
* 函数才具有 prototype 属性，prototype 指向函数的原型对象，普通对象和数组没有 prototype 属性
* 函数的原型(prototype)对象上才有 constructor 属性，constructor 指向函数自身，普通对象和数组没有 constructor 属性
* 对象获取某个属性时，先在对象自身范围内查找，自身范围内没有找到该属性时，再通过\_\_proto\_\_属性一级一级地向上在其构造函数的原型(prototype)对象上查找

### {}，new Object()，Object.create(null) 及 new func()，Object.create(func.prototype) 的区别

* `var a = {};` -- {}创建方式的速度比 new Object()快，因为 new 方式要做额外的处理
* `var b = new Object();` -- a == b // false，a 和 b 是两个对象，但其内部是一样的，b.constructor === b.\_\_proto\_\_.constructor === Object // true
* `var c = Object.create(null);` -- 创建的对象中没有任何属性，\_\_proto\_\_属性也没有
* `var d = new Object(a);` -- a === d // true，new Object() 如果传入的参数是对象，返回的就是它自身，如果传入的参数是数字或字符串，返回的是 Number 或 String 对象(与传入参数==而不===)
* `var e = Object.create(a);` -- e.\_\_proto\_\_ === a // true，Object.create(prototype[, descriptors]) 函数用来创建一个具有指定原型且可选择性地包含指定属性的对象

      var func = function (name, option) {
          this.name = name;
          this.option = option;
      };
      var obj = new func('abc', {x:1, y:2});

* -- 实际的创建过程：先创建一个空对象，将其\_\_proto\_\_属性指向函数的原型，将 this 指向这个空对象并运行这个函数
  -- 实际的创建过程代码：var obj = new Object(); obj.\_\_proto\_\_ = func.prototype; func.apply(obj, ['abc', {x:1, y:2}]);
  -- obj 对象自身中含有 name 和 option 属性

      func.prototype.name = 'abc';
      func.prototype.option = {x:1, y:2};
      var obj = Object.create(func.prototype);

* -- obj 对象自身中不含 name 和 option 属性，但可以通过访问其原型获取到 name 和 option 的值
  -- 修改属性时会在自身添加该属性，如修改 name 会在 obj 中添加 name 字段，不会修改原型中的 name 属性
  -- 修改对象的属性时，会先在原型链中查询是否存在该对象，若存在则修改原型链中已经存在的该对象的属性，若原型链中不存在该对象，则报错

### ES6 Promise vs JQuery Promise

* ES6 中引入了一个 microtask(job) queue 概念，ES6 Promise 通过 microtask queue 实现，resolve()执行时依次将 then()中的回调函数加入 microtask queue
* JQuery Promise 的 then()中回调函数的执行并不保证是异步的，resolve()/reject()的执行方式(sync/async)决定了 then()中回调函数的执行方式
* JQuery Promise 的实现原理：
  * JQuery 内部会维护一个用来存放 then()中回调函数的数组
  * return deferred.promise()执行会返回一个 Promise 对象，然后会同步依次执行 Promise 对象的 then()将其中的回调函数依次放入数组，并尝试执行数组中的回调函数
  * resolve()执行时会修改 Promise 对象的状态(pending -> resolved/fulfilled)，并尝试执行数组中的回调函数
  * 执行数组中的回调函数：遍历数组并根据 Promise 对象的状态(pending/resolved/fulfilled/rejected)做相应的执行

相关链接：

> [ES6 Promise 和 JQuery 中 Promise 的区别](https://segmentfault.com/q/1010000008612124)
