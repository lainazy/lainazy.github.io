---
title: Travis CI 使用摘要
date: 2018-05-22 09:44:50
tags: CI
---

# Travis CI 使用摘要

> Travis CI 只支持 Github，不支持其他代码托管服务。

travis 生命周期函数：

```bash
1. before_install # install阶段之前执行
2. install # install阶段执行
3. before_script # script阶段之前执行
4. script # script阶段执行
5. after_success or after_failure # script阶段成功或失败时执行
6. [OPTIONAL] before_deploy # 部署之前执行
7. [OPTIONAL] deploy # 部署时执行
8. [OPTIONAL] after_deploy # 部署之后执行
9. after_script # script阶段之后执行
```

## travis 使用关键步骤

1.  访问 [travis 官方网站](https://travis-ci.org)，使用 github 账号登录，开启账号下想要使用 travis 的仓库开关。
2.  在项目根目录下添加如下格式的 .travis.yml 配置文件，travis 需要根据该文件执行构建操作。

    ```yaml
    language: node_js # 运行环境
    node_js:
      - '8' # node.js版本号
    # cache:
    #   yarn: true # 缓存yarn
    #   directories:
    #     - node_modules # 缓存node_modules目录
    # env:
    #   - key=value # 环境变量，可以在脚本内部使用
    install: true # true表示跳过install阶段
    script: true # true表示跳过script阶段
    ```

3.  修改 .travis.yml 文件中，install 和 script 阶段要执行的操作。
4.  push .travis.yml 文件到 github，travis 会自动开始构建。通常此时构建会报错，根据错误信息修改 .travis.yml 文件。错误信息中有一条是因为访问权限问题导致的自动部署失败，通常需要加密私钥。
5.  加密私钥需要使用 travis 的加密功能，所以先安装 ruby 的包 travis

    ```bash
    gem install travis
    ```

    使用 travis 加密文件的功能：

    ```bash
    travis encrypt-file ~/.ssh/id_rsa --add # 加密私钥文件
    ```

    执行之后 .travis.yml 文件中会多出以下几行，同时项目中会多出一个 id_rsa.enc 文件：

    ```yaml
    before_install:
      - openssl aes-256-cbc -K $encrypted_d89376f3278d_key -iv $encrypted_d89376f3278d_iv -in id_rsa.enc -out ~/.ssh/id_rsa -d
    ```

    为保证权限正常，多加一行设置权限的 shell：

    ```yaml
    before_install:
      - openssl aes-256-cbc -K $encrypted_d89376f3278d_key -iv $encrypted_d89376f3278d_iv -in id_rsa.enc -out ~/.ssh/id_rsa -d
      - chmod 600 ~/.ssh/id_rsa
    ```

6.  再 push 一下代码，应该就能正常部署了。

---

* [持续集成服务 Travis CI 教程 - 阮一峰](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
* [Travis CI 系列：自动化部署博客 - segmentfault](https://segmentfault.com/a/1190000011218410)
