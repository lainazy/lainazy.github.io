---
title: VuePress 使用指南
date: 2018-05-22 09:43:12
tags: Vue
---

# VuePress 使用指南

> [VuePress 中文官网](https://vuepress.vuejs.org/zh)

## 快速上手

```bash
# 全局安装
yarn global add vuepress

# 新建一个项目
mkdir demo
cd demo

# 创建 docs 目录
mkdir docs

# 添加一个 README.md 文件
echo "# Hello VuePress!" > docs/README.md

# 添加 package.json 文件
yarn init / npm init # 推荐npm，这个生成文件之前会先展示一遍生成的结果

# 在 package.json 中添加 scripts
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}

# 本地查看效果
yarn docs:dev

# 构建静态文件
yarn docs:build
```

## 基本配置

执行完 `yarn docs:build` 会在 docs 目录中生成一个 .vuepress 目录，在 .vuepress 目录中创建 config.js 文件，内容如下：

```js
// https://vuepress.vuejs.org/zh/config

const themeConfig = require('./config.theme')

module.exports = {
  // https://vuepress.vuejs.org/zh/guide/assets.html#基础路径
  base: '/', // 部署站点的基础路径，注意要以/开头和结束，如'/foo/'

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
  //   externalLinks: { target: '_blank', rel: 'noopener noreferrer' }, // 这个键值对将会作为特性被增加到是外部链接的 <a> 标签上，默认的选项将会在新窗口中打开一个该外部链接
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
```

注意以上 config.js 文件中我将主题配置 themeConfig 单独提取到 config.theme.js 文件中了，内容如下：

```js
// https://vuepress.vuejs.org/zh/default-theme-config

module.exports = {
  nav: [
    {
      text: 'Articles',
      items: [{ text: '随笔', link: '/jottings/' }, { text: '博客', link: '/blogs/' }],
    },
  ],

  sidebar: {
    '/jottings/': [
      { title: '自主学习', collapsable: false, children: ['learn-by-self'] },
      { title: '浏览器', collapsable: false, children: ['browser-study'] },
      { title: 'Http', collapsable: false, children: ['http-status-code'] },
      { title: 'Css', collapsable: false, children: ['css-often-used', 'css-study', 'scss'] },
      { title: 'Javascript', collapsable: false, children: ['js-study'] },
      { title: 'Vue', collapsable: false, children: ['vuepress-use'] },
      { title: 'Git', collapsable: false, children: ['git-cmd'] },
      { title: 'Linux', collapsable: false, children: ['linux-cmd'] },
    ],
    '/blogs/': [],
    '/': [],
  },

  search: true,
  searchMaxSuggestions: 10,

  repo: 'https://github.com/lainazy',
  repoLabel: 'Github',
}
```

## 静态资源

静态资源存放在 `docs/.vuepress/public` 目录中，如存放 img 资源存放在 `docs/.vuepress/public/assets/img` 目录中，favicon 之类的不会在 Markdown 文档和 Vue 组件中用到的资源可以直接放在 `docs/.vuepress/public` 目录下，public 目录中的内容构建时都会被直接拷贝到 dist 目录中。

使用静态资源时，以 config.js 中到 base 开头，后面跟资源文件相对 public 目录的路径即可，如要引用 `public/assets/img/hero.png` 文件，若 base 为 `/foo/`，则引用地址为 `/foo/assets/img/hero.png`。

为了防止 base 变化以后引用路径的修改，VuePress 提供了一个内置的 helper `$withBase`（它被注入到了 Vue 的原型上），Markdown 文件和 Vue 组件中都可以使用。用法如下：

```html
<img :src="$withBase('/assets/img/hero.png')" alt="hero">
```

另外，在 config.js 文件中不需要使用 `$withBase`，base 会自动作为前缀插入到以/开头的资源路径中。

## Markdown 拓展

### 内部链接

每一个子文件夹都应当有一个 README.md 文件，它会被自动编译为 index.html。其他文件名的 md 文件，编译为 html 文件之后使用原来的文件名。

::: tip
如果要在 Markdown 文件或 Vue 中链接一个 index.html 文件，注意要在其父目录路径后加 `/`，如使用 `/config/` 而不是 `/config`，链接其他文件名的文件时把文件名及扩展名加上即可。如 `/config/foo.html`。
:::

### 外部链接

外部的链接将会被自动地设置为 `target="_blank" rel="noopener noreferrer"`。可以通过配置 `config.markdown.externalLinks` 来自定义外部链接的特性。

### Front Matter

VuePress 提供了对 YAML Front Matter 的支持。如我的首页的 Front Matter 如下：

```yaml
---
home: true
heroImage: /assets/img/avatar.jpg
actionText: 随笔 →
actionLink: /jottings/
features:
  - title: Markdown
    details: 用 Markdown 来写笔记。
  - title: Vue
    details: 可以在 Markdown 中使用 Vue 组件。
  - title: VuePress
    details: 使用 VuePress 搭建。
footer: 前端小蜗牛🐌，学的慢，但是不能放弃学习。
---
```

在 Front Matter 中配置的元数据可以在当前 Markdown 文件中通过 `$page` 使用。

### Table

Input:

```md
| Tables        | Are             | Cool   |
| ------------- | :-------------: | -----: |
| col 3 is      | right-aligned   | $1600  |
| col 2 is      | centered        | $12    |
| zebra stripes | are neat        | $1     |
```

Output:

| Tables        | Are             | Cool   |
| ------------- | :-------------: | -----: |
| col 3 is      | right-aligned   | $1600  |
| col 2 is      | centered        | $12    |
| zebra stripes | are neat        | $1     |

### Emoji

Input:

```md
:smile: :tada: :100:
```

Output:

:smile: :tada: :100:

> [Markdown emoji 表情符收集 - 墨子陈](https://www.cnblogs.com/chenych/p/8623353.html)

### 目录

Input:

```md
[[TOC]]
```

Output:

[[TOC]]

### 自定义容器

Input:

```md
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

# 重命名label文案
::: danger ERROR
This is a renamed dangerous warning
:::
```

Output:

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger ERROR
This is a renamed dangerous warning
:::

### 代码块中的行高亮

Input:

````md
# 使用{}来选择需要高亮的行，可以使用{3,4}表示单行选择，也可以使用{3-4}选择行区间
```json{3,4}
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
````

Output:

```json{3,4}
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 进阶配置

VuePress 使用 markdown-it 来渲染 Markdown，上述大多数的拓展也都是通过自定义的插件实现的。想要进一步的话，你可以通过 .vuepress/config.js 的 markdown 选项，来对当前的 markdown-it 实例做一些自定义的配置：

```js{3-8}
module.exports = {
  markdown: {
    anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' }, // markdown-it-anchor 插件的选项
    externalLinks: { target: '_blank', rel: 'noopener noreferrer' }, // 这个键值对将会作为特性被增加到是外部链接的 <a> 标签上，默认的选项将会在新窗口中打开一个该外部链接
    toc: { includeLevel: [2, 3] }, // markdown-it-table-of-contents 插件的选项
    config: md => {
      md.use(require('markdown-it-xxx'))
    } // 用来对当前的 markdown-it 实例应用额外的插件的函数
  }
}
```

## Markdown 中使用 Vue

当你在开发一个 VuePress 应用时，由于所有的页面在生成静态 HTML 时都需要通过 Node.js 服务端渲染，因此所有的 Vue 相关代码都应当遵循 `编写通用代码` 的要求。简而言之，请确保只在 beforeMount 或者 mounted 访问浏览器 / DOM 的 API，因为在服务端能触发的生命周期函数只有 beforeCreate 和 created。

### 模板语法

**插值**和**指令**可以在 Markdown 文件中正常使用。

```md
# 插值
{{ 1 + 1 }}

# 指令
<span v-for="i in 3">{{ i }}</span>

# 使用 $page 访问当前网页的元数据
{{ $page }}

# 使用 $site 访问整个网站的元数据
{{ $site }}
```

### Escaping

默认情况下，块级 (block) 的代码块将会被自动包裹在 v-pre 中。如果你想要在内联 (inline) 的代码块或者普通文本中显示原始的大括号，或者一些 Vue 特定的语法，你需要使用自定义容器 v-pre 来包裹：(这个 v-pre 名字貌似可以改)

Input:

```md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

Output:

::: v-pre
`{{ This will be displayed as-is }}`
:::

### 使用组件

所有在 `.vuepress/components` 中找到的 `*.vue` 文件将会自动地被注册为全局的异步组件，所以可以在 Markdown 文件中直接使用，组件名和文件名对应。

::: warning 重要
请确保一个自定义组件的名字包含连接符或者是 PascalCase，否则，它将会被视为一个内联元素，并被包裹在一个 `<p>` 标签中，这将会导致 HTML 渲染紊乱，因为 HTML 标准规定，`<p>` 标签中不允许放置任何块级元素。
:::

### 使用 css 预处理器

VuePress 对以下预处理器已经内置相关的 webpack 配置：sass、scss、less、stylus 和 pug(原名jade)。要使用它们你只需要在项目中安装对应的依赖即可。

::: tip
需要指出的是，如果你是一个 stylus 用户，你并不需要在你的项目中安装 stylus 和 stylus-loader，因为 VuePress 已经内置了它们。

对于那些没有内置的预处理器，除了安装对应的依赖，你还需要拓展内部的 Webpack 配置。
:::

### 脚本和样式提升

有时，你可以只想在当前页面应用一些 JavaScript 或者 CSS，在这种情况下，你可以直接在 Markdown 文件中使用原生的 `<script>` 或者 `<style>` 标签，它们将会从编译后的 HTML 文件中提取出来，并作为生成的 Vue 单文件组件的 `<script>` 和 `<style>` 标签。`<style>` 标签内部的类样式可以通过 `$style` 获取到。

Input:

```html
<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  mounted () {
    document.querySelector(`.${this.$style.example}`).textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>
```

Output:

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  mounted () {
    document.querySelector(`.${this.$style.example}`).textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>

## 自定义主题

> [VuePress 自定义主题 - 官方链接](https://vuepress.vuejs.org/zh/guide/custom-themes.html)

## 多语言支持

> [VuePress 多语言支持 - 官方链接](https://vuepress.vuejs.org/zh/guide/i18n.html)

## 部署到 Github Pages

1. 在 `docs/.vuepress/config.js` 中设置正确的 base。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 base 默认即是 `/`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 base 设置为 `/<REPO>/`。

2. 创建一个如下的 .deploy.sh 文件（自行修改高亮部分的注释）

```bash{13,20,23}
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add --all
git commit -m 'deploy docs'

# 发布到 https://<USERNAME>.github.io
# git push --force git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 发布到 https://<USERNAME>.github.io/<REPO>
# git push --force git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip
你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。
:::
