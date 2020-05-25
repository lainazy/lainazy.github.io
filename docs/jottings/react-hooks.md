# React Hooks

**useState**

其实就是一个特殊的`useReducer`，底层就是通过`useReducer`实现。

**useEffect**

相当于原来class写法中的`componentDidMount`和`componentDidUpdate`，但是callback是异步执行的，会等到浏览器渲染dom完成才通过MessageChannel/setTimeout触发callback执行。

**useLayoutEffect**

是`useEffect`的同步版本，相当于原来class写法中的`componentDidMount`和`componentDidUpdate`。是在commit阶段执行完之后就会触发callback，不会等待浏览器渲染真实dom完成。

**useContext**

```js
const value = useContext(MyContext);
```

这个hook函数是用来替代如下用法的

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

没错，只是替代consumer部分，provider部分的写法还是和原来一样

**useReducer**

相当于redux的一个简单实现，用法概念都参考redux。

**useMemo**

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

当依赖改变时，传入的回调函数(`() => computeExpensiveValue(a, b)`)在useMemo调用的时候立即执行，回调函数的返回值即为useMemo调用的返回值，当依赖没变时，传入的回调函数不会执行，useMemo调用的返回值为上一次记忆的结果。

**useCallback**

```js
const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);
```

该hook方法用来缓存匿名函数，当依赖改变时，useCallback调用时会返回一个新的匿名函数，当依赖没变时，useCallback调用时会返回上一次记忆的匿名函数引用。

**useRef**

```js
const refContainer = useRef(initialValue);
```

类似直接使用`React.createRef()`，但在函数组件中还是应该使用useRef，因为useRef不会在重新渲染时创建新的ref对象，而`React.createRef()`会重新创建新的。
