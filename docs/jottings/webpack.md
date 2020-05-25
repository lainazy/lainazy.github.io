# Webpack相关记录

### runtime 和 manifest

webpack打包编译过程中会给每个模块分配一个唯一的模块标识符(module identifier)，我们写代码时使用的模块引入语句import或require会被转换成__webpack_require__方法，而此方法会通过模块标识符来引入模块，manifest中存放的就是模块标识符及其对应模块文件的映射关系数据，runtime是代码运行时用来加载和解析依赖模块的逻辑代码，runtime会根据manifest中的映射关系找到对应的需要加载的模块代码。

[manifest 和 runtime](https://www.webpackjs.com/concepts/manifest/)
[HMR manifest](https://www.webpackjs.com/concepts/hot-module-replacement/#在编译器中)
[HMR runtime](https://www.webpackjs.com/concepts/hot-module-replacement/#在-hmr-runtime-中)

### compiler hooks 执行顺序

- environment: new SyncHook([])
- afterEnvironment: new SyncHook([])
- entryOption: new SyncBailHook(["context", "entry"])
- afterPlugins: new SyncHook(["compiler"])
- afterResolvers: new SyncHook(["compiler"])
- beforeRun: new AsyncSeriesHook(["compiler"])
- run: new AsyncSeriesHook(["compiler"])
- * watchRun: new AsyncSeriesHook(["compiler"]) -- 开启watch模式时触发
- normalModuleFactory: new SyncHook(["normalModuleFactory"])
- contextModuleFactory: new SyncHook(["contextModulefactory"])
- beforeCompile: new AsyncSeriesHook(["params"]) -- 多次触发?
- compile: new SyncHook(["params"])
- thisCompilation: new SyncHook(["compilation", "params"])
- compilation: new SyncHook(["compilation", "params"]) -- 多次触发?
- make: new AsyncParallelHook(["compilation"])
- afterCompile: new AsyncSeriesHook(["compilation"]) -- 多次触发?
- shouldEmit: new SyncBailHook(["compilation"])
    - emit: new AsyncSeriesHook(["compilation"])
    - afterEmit: new AsyncSeriesHook(["compilation"])
- done: new AsyncSeriesHook(["stats"])
    - additionalPass: new AsyncSeriesHook([]) -- 触发受compilation.hooks.needAdditionalPass控制
- * failed: new SyncHook(["error"]) -- 只要发生错误就会触发
- * invalid: new SyncHook(["filename", "changeTime"]) -- watch模式下，编译无效时触发
- * watchClose: new SyncHook([]) -- 关闭watch模式时触发

[compiler 钩子](https://webpack.docschina.org/api/compiler-hooks/)

### compilation hooks 执行顺序

**webpack正常执行流程中都会触发的钩子**

- buildModule: new SyncHook(["module"]) -- compiler.hooks.make触发之后触发，多次触发，应该是每个模块都会触发一次
1. succeedModule: new SyncHook(["module"]) (二选一)
    - succeedEntry: new SyncHook(["entry", "name", "module"])
2. failedModule: new SyncHook(["module", "error"]) (二选一)
    - failedEntry: new SyncHook(["entry", "name", "error"]) (终止后续流程)
- normalModuleLoader: new SyncHook(["loaderContext", "module"]) -- 与buildModule一对一触发，与succeedModule和failedModule貌似没有明确的先后关系
- finishModules: new AsyncSeriesHook(["modules"])
- seal: new SyncHook([])
- optimizeDependenciesBasic: new SyncBailHook(["modules"])
- optimizeDependencies: new SyncBailHook(["modules"])
- optimizeDependenciesAdvanced: new SyncBailHook(["modules"])
- afterOptimizeDependencies: new SyncHook(["modules"])
- beforeChunks: new SyncHook([]) -- 触发该hook之后就会构建chunks
- dependencyReference: new SyncWaterfallHook(["dependencyReference", "dependency", "module"]) -- 多次触发?
- afterChunks: new SyncHook(["chunks"])
- optimize: new SyncHook([])
- optimizeModulesBasic: new SyncBailHook(["modules"])
- optimizeModules: new SyncBailHook(["modules"])
- optimizeModulesAdvanced: new SyncBailHook(["modules"])
- afterOptimizeModules: new SyncHook(["modules"])
- optimizeChunksBasic: new SyncBailHook(["chunks", "chunkGroups"])
- optimizeChunks: new SyncBailHook(["chunks", "chunkGroups"])
- optimizeChunksAdvanced: new SyncBailHook(["chunks", "chunkGroups"])
- afterOptimizeChunks: new SyncHook(["chunks", "chunkGroups"])
- optimizeTree: new AsyncSeriesHook(["chunks", "modules"])
- afterOptimizeTree: new SyncHook(["chunks", "modules"])
- optimizeChunkModulesBasic: new SyncBailHook(["chunks", "modules"])
- optimizeChunkModules: new SyncBailHook(["chunks", "modules"])
- optimizeChunkModulesAdvanced: new SyncBailHook(["chunks", "modules"])
- afterOptimizeChunkModules: new SyncHook(["chunks", "modules"])
- shouldRecord: new SyncBailHook([])
- reviveModules: new SyncHook(["modules", "records"])
- optimizeModuleOrder: new SyncHook(["modules"])
- advancedOptimizeModuleOrder: new SyncHook(["modules"])
- beforeModuleIds: new SyncHook(["modules"])
- moduleIds: new SyncHook(["modules"])
- optimizeModuleIds: new SyncHook(["modules"])
- afterOptimizeModuleIds: new SyncHook(["modules"])
- reviveChunks: new SyncHook(["chunks", "records"])
- optimizeChunkOrder: new SyncHook(["chunks"])
- beforeChunkIds: new SyncHook(["chunks"])
- optimizeChunkIds: new SyncHook(["chunks"])
- afterOptimizeChunkIds: new SyncHook(["chunks"])
    - recordModules: new SyncHook(["modules", "records"]) -- 触发受shouldRecord控制
    - recordChunks: new SyncHook(["chunks", "records"]) -- 触发受shouldRecord控制
- beforeHash: new SyncHook([])
- chunkHash: new SyncHook(["chunk", "chunkHash"])
- contentHash: new SyncHook(["chunk"])
- afterHash: new SyncHook([])
    - recordHash: new SyncHook(["records"]) -- 触发受shouldRecord控制
- beforeModuleAssets: new SyncHook([])
- mainTemplate.hooks.assetPath: new SyncWaterfallHook(["path", "options"])
- moduleAsset: new SyncHook(["module", "filename"])
- shouldGenerateChunkAssets: new SyncBailHook([])
    - beforeChunkAssets: new SyncHook([])
    - mainTemplate.hooks.assetPath: new SyncWaterfallHook(["path", "options"])
    - chunkAsset: new SyncHook(["chunk", "filename"])
- additionalChunkAssets: new SyncHook(["chunks"])
    - record: new SyncHook(["compilation", "records"]) -- 触发受shouldRecord控制
- additionalAssets: new AsyncSeriesHook([])
- optimizeChunkAssets: new AsyncSeriesHook(["chunks"])
- afterOptimizeChunkAssets: new SyncHook(["chunks"])
- optimizeAssets: new AsyncSeriesHook(["assets"])
- afterOptimizeAssets: new SyncHook(["assets"])
- needAdditionalSeal: new SyncBailHook([])
    - unseal: new SyncHook([])
    - seal: new SyncHook([]) (循环)
- afterSeal: new AsyncSeriesHook([]) -- compiler.hooks.afterCompile触发之前触发
- needAdditionalPass: new SyncBailHook([])

*compilation.hooks基本都是compiler.hooks.make和compiler.hooks.afterCompile之间触发的*

**需要在插件中调用compilation.prototype中的方法才会触发的钩子**

- addEntry: new SyncHook(["entry", "name"]) -- 这个hook存在于webpack-stream包的compilation中，在webpack包的compilation中不存在，所以通常不能用，还有succeedEntry和failedEntry也是。但是，两者的compilation原型对象上都有addEntry(context, entry, name, callback)方法，触发时机取决于compilation.addEntry方法的调用时间。
- childCompiler: new SyncHook(["childCompiler", "compilerName", "compilerIndex"]) -- 插件中调用compilation.createChildCompiler方法时触发
- rebuildModule: new SyncHook(["module"]) -- 插件中调用compilation.rebuildModule方法时才会触发
    - buildModule: new SyncHook(["module"])
    1. succeedModule: new SyncHook(["module"]) (二选一)
    2. failedModule: new SyncHook(["module", "error"]) (二选一)
    - finishRebuildingModule: new SyncHook(["module"]) -- 插件中调用compilation.rebuildModule方法时才会触发

**貌似暂时没设置触发时机的钩子，可能会在webpack5中删除**

- optimizeExtractedChunksBasic: new SyncBailHook(["chunks"])
- optimizeExtractedChunks: new SyncBailHook(["chunks"])
- optimizeExtractedChunksAdvanced: new SyncBailHook(["chunks"])
- afterOptimizeExtractedChunks: new SyncHook(["chunks"])

**暂时未使用到的钩子**

- assetPath: new SyncWaterfallHook(["filename", "data"]) -- 貌似等同于mainTemplate.hooks.assetPath: new SyncWaterfallHook(["path", "options"])

### tapable

Interception不同类型方法的触发时机
- call: hooks.xxx.(call/callAsync/promise)方法执行时触发
- tap: hooks.xxx.(call/callAsync/promise)方法执行时触发
- register: hooks.xxx.(tap/tapAsync/tapPromise)方法执行时触发

[Tapable](https://github.com/webpack/tapable)

### webpack各种属性

chunk: 包含每个entry和动态import的模块，如果有相同的import模块，只会算一个chunk
chunk.ids: 如果当前chunk需要依赖其他chunk，ids数组的前面会包含其他chunk的id，否则只有自身id
module: 每次编译，每个模块都会对应一个唯一的模块对象，一个模块的多次引入会复用同一个模块对象。
