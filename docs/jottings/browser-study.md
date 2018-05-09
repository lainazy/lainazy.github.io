---
title: 浏览器学习记录
date: 2017-09-11 19:02:13
tags: browser
---

### 浏览器多线程

* **_Javascript 引擎线程_** (单线程运行且与 GUI 渲染线程互斥，脚本执行会阻塞 Http 请求线程(即阻塞资源的下载)和网上所说的有点冲突)
* **_GUI 渲染线程_** (与 Javascript 引擎线程互斥，渲染树的构建会等待 css 解析完成)
* **_事件触发线程_**
* **_定时触发器线程_** (setTimeout)
* **_Http 请求线程_** (同一个主机有最大并行连接数限制)
  * css 资源下载和解析时会阻塞 GUI 渲染线程(阻塞渲染树(rendering tree)渲染，不阻塞 DOM 解析)
  * js 资源下载和执行时会阻塞 GUI 渲染线程(阻塞 DOM 解析和渲染树(rendering tree)渲染)
  * 有些浏览器(safari、chrome、firefox 等)在 css 资源下载和解析时会延迟其之后的 js 代码的执行(不阻塞 js 资源下载)

**_个人理解：资源的下载应该分为同步下载(阻塞 GUI 渲染线程)和异步下载(不阻塞 GUI 渲染线程)，默认情况下所有资源都为同步下载，script 标签加 defer 后为异步下载_**

### Event loops

* 浏览器必须使用事件循环(event loops)协调异步(事件、接口、脚本、渲染、网络等)。
* 事件循环有对应 browsing contexts 和 workers 的两种类型。
* 一个事件循环(event loop)有一个或多个任务队列(task queue)。
* 任务(task)通常有 4 种任务源(task source)：
  * DOM 操作任务源(DOM manipulation task source)
  * 用户交互任务源(user interaction task source)
  * 网络请求任务源(networking task source)
  * 浏览器历史任务源(history traversal task source)
* 来自同一个 task source 的所有任务必须放入同一个 task queue，即一种 task source 对应一个 task queue。同一个 task queue 是按先进先出顺序执行的。
* 浏览器可以根据 task queue 中 task source 的不同，给予 task queue 不同的优先级。由浏览器决定挑哪一个 task queue 中的队首 task 执行。
* 任务(task)分为两类：
  * 宏任务(macro-task)：script(js codes as a whole in script tag), setTimeout|setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering.
  * 微任务(micro-task)：process.nextTick, Promise(callback function in then), Object.observe, MutationObserver. -- nextTick queue > Promise queue
* js 引擎会把 task push 到对应的 macrotask queue(即 task queue)或 microtask queue 中。
* 在 event loop 的一个回合中，会先从 macrotask queue 中取出队首的 task 进行执行；执行完毕后，再依次执行 microtask queue 中的所有任务；如果在执行过程中添加了新的 microtask，则会在当前的回合中继续执行，直到全部 mircotask 执行完毕才进入下一个 event loop 回合。
* 事件循环执行流程如下：

```bash
An event loop must continually run through the following steps for as long as it exists:
     1. select the oldest task(task A) in task queues.If task A is null(means task queues is empty),jump to step 5(microtasks steps)
     2. set "currently running task" to "task A"
     3. run "task A"(means run the callback function)
     4. set "currently running task" back to null,and remove "task A" from its task queue
     5. perform microtask queue
        (a). select the oldest task(task x) in microtask queue
        (b). if task x is null(means microtask queues is empty),jump to step (g)
        (c). set "currently running task" to "task x"
        (d). run "task x"
        (e). set "currently running task" to null,remove "task x" from the microtask queue
        (f). select next oldest task in microtask queue,jump to step(b)
        (g). finish microtask queue
     6. update rendering (应该是在GUI渲染线程中执行渲染队列(Render queue)中的所有UI render任务)
     7. next routnd:jump to step 1
```

* 渲染队列(Render queue)：浏览器在 1s 中渲染页面 60 次，每 16ms 就会往 Render queue 中添加一个 UI render 任务。但是浏览器只有在调用栈(Call stack)为空时才有机会执行该任务。
* microtask 任务执行时间过长会导致 UI 渲染的阻塞和 macrotask 任务的阻塞(应该是下一个事件循环回合的 macrotask)。
* nodejs 的 process.nextTick 限制 1000 个 tick 任务，以使 macrotask 得以执行。

**_总结：1 round event loop = 1 macrotask + n microtask + rendering_**

相关链接：

> [浏览器组成、线程及 event loop](http://www.cnblogs.com/kevin2chen/p/6415630.html) > [详解事件循环机制](http://www.jianshu.com/p/12b9f73c5a4f)
