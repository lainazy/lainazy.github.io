# commitizen & commitlint 使用记录

## commitizen

**使所有项目成为Commitizen-friendly**

1. 全局安装commitizen：`npm install -g commitizen`
    - commitizen提供了git cz命令来替代git commit，此时git cz等价于git commit
2. 全局安装commitizen适配器：`npm install -g cz-conventional-changelog`
    - 该适配器用来修改git cz的行为，使用这个之后git cz的行为和git commit不一样了，执行git cz时会出现commit message选项，且错误提示信息也发生改变
3. 执行CLI在主目录中添加.czrc配置文件：`echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc`
    - 这个配置文件用来指定commitizen适配器路径，否则cz-conventional-changelog无法生效

此时在我们的任意git项目中都已经可以使用commitizen了，使用git cz来替代git commit即可，git commit中的所有可选参数都包含在git cz中。

**使具体项目成为Commitizen-friendly**

1. 如上，还是要先*全局安装commitizen*，这样我们才能全局使用git cz命令

2. 其次，在*具体项目中安装commitizen适配器*：

- 如果是使用npm作为包管理器的项目可以直接使用官方提供的CLI：

    ```sh
    commitizen init cz-conventional-changelog --save-dev --save-exact
    ```

- 如果是使用yarn作为包管理器的项目需要分开操作：
    1. 安装具体版本的cz-conventional-changelog：

        ```sh
        yarn add cz-conventional-changelog --dev --exact
        ```

        我估计之所以需要安装具体版本，应该是为了让所有项目成员都保持统一。

    2. 修改package.json文件，添加config.commitizen配置：

        ```json
        "config": {
          "commitizen": {
            "path": "cz-conventional-changelog"
          }
        }
        ```

> [commitizen - github](https://github.com/commitizen/cz-cli)

## commitlint

- Install

    ```sh
    yarn add --dev @commitlint/{config-conventional,cli}
    ```

- 在根目录创建.commitlintrc.js文件，添加配置

    ```js
    module.exports = {
      extends: ['@commitlint/config-conventional'],
      rules: {},
    }
    ```

- 再通过husky注册的commit-msg hook来执行commitlint

    ```json
    "husky": {
      "hooks": {
        "commit-msg": "commitlint -e $GIT_PARAMS"
      }
    },
    ```

> [commitlint - github](https://github.com/marionebl/commitlint)

## conventional-changelog-cli

可以使用这个生成change log。

> [conventional-changelog-cli - github](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

