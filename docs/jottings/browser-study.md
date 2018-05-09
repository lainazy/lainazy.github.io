---
title: 浏览器学习记录
date: 2017-09-11 19:02:13
tags: browser
---

#### 浏览器多线程

- ***Javascript引擎线程*** (单线程运行且与GUI渲染线程互斥，脚本执行会阻塞Http请求线程(即阻塞资源的下载)和网上所说的有点冲突)
- ***GUI渲染线程*** (与Javascript引擎线程互斥，渲染树的构建会等待css解析完成)
- ***事件触发线程***
- ***定时触发器线程*** (setTimeout)
- ***Http请求线程*** (同一个主机有最大并行连接数限制)
  - css资源下载和解析时会阻塞GUI渲染线程(阻塞渲染树(rendering tree)渲染，不阻塞DOM解析)
  - js资源下载和执行时会阻塞GUI渲染线程(阻塞DOM解析和渲染树(rendering tree)渲染)
  - 有些浏览器(safari、chrome、firefox等)在css资源下载和解析时会延迟其之后的js代码的执行(不阻塞js资源下载)

***个人理解：资源的下载应该分为同步下载(阻塞GUI渲染线程)和异步下载(不阻塞GUI渲染线程)，默认情况下所有资源都为同步下载，script标签加defer后为异步下载***

#### Event loops

- 浏览器必须使用事件循环(event loops)协调异步(事件、接口、脚本、渲染、网络等)。
- 事件循环有对应 browsing contexts 和 workers 的两种类型。
- 一个事件循环(event loop)有一个或多个任务队列(task queue)。
- 任务(task)通常有4种任务源(task source)：
  - DOM操作任务源(DOM manipulation task source)
  - 用户交互任务源(user interaction task source)
  - 网络请求任务源(networking task source)
  - 浏览器历史任务源(history traversal task source)
- 来自同一个task source的所有任务必须放入同一个task queue，即一种task source对应一个task queue。同一个task queue是按先进先出顺序执行的。
- 浏览器可以根据task queue中task source的不同，给予task queue不同的优先级。由浏览器决定挑哪一个task queue中的队首task执行。
- 任务(task)分为两类：
  - 宏任务(macro-task)：script(js codes as a whole in script tag), setTimeout|setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering.
  - 微任务(micro-task)：process.nextTick, Promise(callback function in then), Object.observe, MutationObserver. -- nextTick queue > Promise queue
- js引擎会把task push到对应的macrotask queue(即task queue)或microtask queue中。
- 在event loop的一个回合中，会先从macrotask queue中取出队首的task进行执行；
  执行完毕后，再依次执行microtask queue中的所有任务；
  如果在执行过程中添加了新的microtask，则会在当前的回合中继续执行，直到全部mircotask执行完毕才进入下一个event loop回合。
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
     6. update rendering (应该是在GUI渲染线程中执行渲染队列(Render queue)中的所有UI render任务)
     7. next routnd:jump to step 1
```

- 渲染队列(Render queue)：浏览器在1s中渲染页面60次，每16ms就会往Render queue中添加一个UI render任务。但是浏览器只有在调用栈(Call stack)为空时才有机会执行该任务。
- microtask任务执行时间过长会导致UI渲染的阻塞和macrotask任务的阻塞(应该是下一个事件循环回合的macrotask)。
- nodejs的process.nextTick限制1000个tick任务，以使macrotask得以执行。

***总结：1 round event loop = 1 macrotask + n microtask + rendering***

相关链接：

> [浏览器组成、线程及event loop](http://www.cnblogs.com/kevin2chen/p/6415630.html)
> [详解事件循环机制](http://www.jianshu.com/p/12b9f73c5a4f)
