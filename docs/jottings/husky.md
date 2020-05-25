# husky & lint-staged 使用记录

## husky

1. Install

    ```sh
    # 注意加上@next，否则安装的是0.14版本，无法使用.huskyrc.js配置文件
    yarn add husky@next --dev
    ```

2. 在根目录创建.huskyrc.js文件，添加配置

    ```js
    module.exports = {
      hooks: {
        'pre-commit': 'bash .precommitlint.sh',
        '...': '...'
      },
    }
    ```

就是这么简单，husky会自动执行匹配的hook。

> [husky - github](https://github.com/typicode/husky)

## lint-staged

1. Install

    ```sh
    yarn add lint-staged --dev
    ```

2. 在根目录创建.lintstagedrc.js文件，添加配置

    ```js
    module.exports = {
      'src/**/*.{js,jsx,vue}': 'eslint',
    }
    ```

lint-staged只会对暂存区(stage)中的文件进行匹配，并对满足glob模式的文件执行对应的CLI。

> [lint-staged - github](https://github.com/okonet/lint-staged)

---

**配置直接写在package.json文件中**

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,jsx,vue}": "eslint"
},
```
