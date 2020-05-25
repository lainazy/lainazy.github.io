---
title: 浏览器学习记录
date: 2017-09-11 19:02:13
tags: Browser
---

### 浏览器多线程

- **_Javascript 引擎线程_** (单线程运行且与 GUI 渲染线程互斥，脚本执行会阻塞 Http 请求线程(即阻塞资源的下载)和网上所说的有点冲突)
- **_GUI 渲染线程_** (与 Javascript 引擎线程互斥，渲染树的构建会等待 css 解析完成)
- **_事件触发线程_**
- **_定时触发器线程_** (setTimeout)
- **_Http 请求线程_** (同一个主机有最大并行连接数限制)
  - css 资源下载和解析时会阻塞 GUI 渲染线程(阻塞渲染树(rendering tree)渲染，不阻塞 DOM 解析)
  - js 资源下载和执行时会阻塞 GUI 渲染线程(阻塞 DOM 解析和渲染树(rendering tree)渲染)
  - 有些浏览器(safari、chrome、firefox 等)在 css 资源下载和解析时会延迟其之后的 js 代码的执行(不阻塞 js 资源下载)

**_个人理解：资源的下载应该分为同步下载(阻塞 GUI 渲染线程)和异步下载(不阻塞 GUI 渲染线程)，默认情况下所有资源都为同步下载，script 标签加 defer 后为异步下载_**

### Event loops

- 浏览器必须使用事件循环(event loops)协调异步(事件、接口、脚本、渲染、网络等)。
- 事件循环有对应 browsing contexts 和 workers 的两种类型。
- 一个事件循环(event loop)有一个或多个任务队列(task queue)。
- 任务(task)通常有 4 种任务源(task source)：
  - DOM 操作任务源(DOM manipulation task source)
  - 用户交互任务源(user interaction task source)
  - 网络请求任务源(networking task source)
  - 浏览器历史任务源(history traversal task source)
- 来自同一个 task source 的所有任务必须放入同一个 task queue，即一种 task source 对应一个 task queue。同一个 task queue 是按先进先出顺序执行的。
- 浏览器可以根据 task queue 中 task source 的不同，给予 task queue 不同的优先级。由浏览器决定挑哪一个 task queue 中的队首 task 执行。
- 任务(task)分为两类：
  - 宏任务(task)：script(js codes as a whole in script tag), setTimeout|setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering.
  - 微任务(micro-task)：process.nextTick, Promise(callback function in then), Object.observe, MutationObserver.
- js 引擎会把 task push 到对应的 task queue 或 microtask queue 中。
- 在 event loop 的一个回合中，会先从 task queue 中取出队首的 task 进行执行；执行完毕后，再依次执行 microtask queue 中的所有任务；如果在执行过程中添加了新的 microtask，则会在当前的回合中继续执行，直到全部 mircotask 执行完毕才进入下一个 event loop 回合。
- 事件循环执行流程如下：

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
     6. update rendering
     7. next routnd:jump to step 1
```

- 渲染队列(Render queue)：浏览器在 1s 中渲染页面 60 次，每 16ms 就会往 Render queue 中添加一个 UI render 任务。但是浏览器只有在调用栈(Call stack)为空时才有机会执行该任务。
- microtask 任务执行时间过长会导致 UI 渲染的阻塞和后续的 macrotask 任务的阻塞。
- nodejs 的 process.nextTick 限制 1000 个 tick 任务。

**一次事件循环周期 = 一个宏任务 + 当前宏任务执行过程中产生的多个微任务 + 一次渲染机会 + 检查是否有 web worker 任务需要执行**

**一次事件循环周期并不一定会执行一次渲染，但是会有一次检查是否需要渲染的机会，检查 render queue 中是否有渲染任务。如果有requestAnimationFrame任务会在每次渲染之前执行。**

相关链接：

> [浏览器组成、线程及 event loop](http://www.cnblogs.com/kevin2chen/p/6415630.html) > [详解事件循环机制](http://www.jianshu.com/p/12b9f73c5a4f)

# Nodejs Event loops

大致可分为六个阶段：

- timer(调用setTimeout/setInterval的回调)
- I/O(pending) callback(探查需要处理的IO事件，并放入一个io pending事件队列，本质上是poll阶段的一个衍生部分，如果pending事件发生了error，也会在这个阶段执行)
- Idle、prepare(空闲、准备阶段，node内部处理机制，不需要关心)
- poll(轮循阶段，实际上是一个调度阶段，用来控制轮询流程，如每当io event状态从pending变成complete时，就会将io event回调放入poll queue，poll阶段会自动去检查poll queue，当poll queue有io event回调时，就去执行事件回调，可能执行过程中又有新的事件回调加入到poll队列中，所以执行完上一个事件回调后，发现poll队列中还有事件回调，会继续执行新的事件回调，直到poll队列清空或者执行的回调个数达到系统硬性最大限制才会继续下一个轮询，当poll队列为空时，会去查看setImmediate回调队列是否有immediate回调，有的话会进入到check阶段去执行immediate回调，没有的话会去查看timer回调队列是否有到时的定时器回调（和io事件一样，到时的定时器回调才会被放入timer回调队列），有的话就跳回调timer阶段去执行定时器回调（当然跳回timer阶段过程中也会经过check和close阶段），如果poll队列为空，timer队列和immediate队列也都为空，poll阶段将进入阻塞状态)
- check(check阶段，setImmediate回调在此阶段执行)
- close callback(关闭事件回调阶段)

[Github issue: event loop到底怎么工作](https://github.com/nodejs/help/issues/1118)

*微任务在上面这些阶段之间执行。*
process.nextTick队列中的所有微任务在promise队列的所有微任务之前执行。
在node11.0之前，会一次行先执行完宏任务队列中的所有宏任务，在开始执行微任务和后面阶段，如timer队列中有3个任务，会一次性依次执行完3个timer回调，然后才开始执行其中产生的微任务，然后再进入后面的阶段。在node11.0之后，改成了一次只执行一个宏任务。轮询队列的事件处理是否也是每次只执行一个有待查证。

[Node.js 11Version 版本之后 底层的任务执行栈的问题，宏任务与微任务执行的顺序做出了改变](https://blog.csdn.net/qq_38774121/article/details/97680282)
