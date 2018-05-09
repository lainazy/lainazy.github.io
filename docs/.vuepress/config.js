// https://vuepress.vuejs.org/zh/config

const themeConfig = require('./config.theme')

module.exports = {
  // https://vuepress.vuejs.org/zh/guide/assets.html#基础路径
  base: '/', // 部署站点的基础路径

  title: '凌子亦 · 📙', // 网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上
  description: '写写笔记什么的', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中

  // head: [], // 额外的需要被注入到当前页面的 HTML <head> 中的标签
  // host: '0.0.0.0', // 指定用于 dev server 的主机名
  // port: 8080, // 指定 dev server 的端口
  // dest: '.vuepress/dist', // 指定 vuepress build 的输出目录，默认值貌似不是左边这样，因为我设置成左边这样，build之后生成的.vuepress目录会出现在根目录下而不是docs目录下
  // ga: undefined, // 提供一个 Google Analytics ID 来使 GA 生效
  // serviceWorker: false, // 如果设置成 true，VuePress 将会自动生成并且注册一个 service worker，它缓存了那些已访问过的页面的内容，用于离线访问（仅在生产环境生效）
  // locales: undefined, // 提供多语言支持的语言配置

  // https://vuepress.vuejs.org/zh/guide/custom-themes.html#使用来自-npm-的主题
  // theme: undefined, // 使用自定义主题或npm上的主题的时候，需要指定它
  themeConfig, // 为当前的主题提供一些配置，这些选项依赖于你正在使用的主题

  // markdown: {
  //   anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }, // markdown-it-anchor 插件的选项
  //   toc: { includeLevel: [2, 3] }, // markdown-it-table-of-contents 插件的选项
  //   config: undefined, // 用来对当前的 markdown-it 实例应用额外的插件的函数，举例：config: md => { md.use(require('markdown-it-xxx')) }
  // },

  // postcss: { plugins: [require('autoprefixer')] }, // postcss-loader 的选项，注意，指定这个值，将会覆盖内置的 autoprefixer，所以需要自己将它加进去
  // stylus: { preferPathResolver: 'webpack' }, // stylus-loader 的选项，优先使用 webpack 的 resolving 规则而不是 stylus 自身的 resolving 规则
  // scss: {}, // 加载 *.scss 文件的 sass-loader 的选项
  // sass: { indentedSyntax: true }, // 加载 *.sass 文件的 sass-loader 的选项
  // less: {}, // less-loader 的选项

  // configureWebpack: undefined, // 用于修改内部的 Webpack 配置。如果给定一个对象，那么它将会被 webpack-merge 合并到最终的配置中，如果给定一个函数，它将会接受 config 作为第一个参数，以及 isServer 作为第二个参数，你可以直接更改 config，也可以返回一个待合并的对象
  // chainWebpack: undefined, // 通过 webpack-chain 来修改内部的 Webpack 配置

  // evergreen: false, // 如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 true，这将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积
}
