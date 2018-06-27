---
title: Gitlab CI 使用摘要
date: 2018-06-27 17:17:18
tags: CI
---

# Gitlab CI 使用摘要

[GitLab Continuous Integration (GitLab CI/CD)](https://docs.gitlab.com/ee/ci)

使用 Gitlab 托管代码时，最简单的持续集成方式。

## Gitlab Runner

[GitLab Runner Install & Register](https://docs.gitlab.com/runner/index.html)

### Install as a Docker service

[Run GitLab Runner in a container](https://docs.gitlab.com/runner/install/docker.html)

```bash
# alpine 版本的体积小
docker pull gitlab/gitlab-runner:alpine
```

```bash
# docker run <image>: 当本地 docker 中该镜像不存在时会自动 pull 镜像
# -d: 表示在后台运行
# --name: 给 docker 容器命名
# --restart: 将 runner 的自动重启和 docker 绑定
# -v: 将主机中的路径与 docker 容器中的路径关联(映射)
docker run -d --name gitlab-runner --restart always \
  -v /Users/shared/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:alpine
```

### Register a GitLab Runner

[Registering Runners](https://docs.gitlab.com/runner/register/index.html)

```bash
# docker exec <container> command: 在指定的 docker 容器中执行命令
docker exec -it gitlab-runner gitlab-runner register \
  --non-interactive \
  --url "https://xxx.com" \
  --registration-token "xxx" \
  --executor "docker" \
  --docker-image <image>:<tag> \
  --description "xxx" \
  --tag-list "xxx,xxx" \
  --docker-pull-policy "if-not-present" \
  --run-untagged \
  --locked="false"
```

## .gitlab-ci.yml 文件配置

[Configuration of your jobs with .gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/README.html)

```yaml
image: <image>:<tag> # gitlab runner 使用 docker executor 时需要指定 docker 镜像
services: # 使用上面的 docker 镜像时额外需要关联的 service docker 镜像，通常为 mysql 等数据库镜像
  - <image>:<tag>
  - ...
variables: # Job 中需要用到的变量，通过添加 $ 来引用，如 $VARIABLE_NAME，也可以在每个 Job 中单独定义
  - VARIABLE_NAME: "xxx"
  - ...
cache: # 设置缓存，可以在每个 Job 中单独定义
  untracked: true # 是否缓存 Git 仓库中所有未跟踪的文件
  key: <string> # 在每个 Job 中单独定义时可能会用到，防止当前 Job 的缓存被其他 Job 的缓存覆盖
  paths: # 需要缓存的目录路径
    - node_modules/
  policy: pull-push # 缓存策略，默认为 pull-push，可修改为 pull 或 push
stages: # 构建阶段
  - build
  - test
  - deploy
  - ...
before_script: # 全局脚本，在所有 Jobs 执行之前执行
  - global before script
  - ...
after_script: # 全局脚本，在所有 Jobs 执行之后执行
  - global after script
  - ...
pages: # 一个特殊的 Job，上传静态内容生成静态网站(Gitlab Pages)
  stage: deploy # 在哪个阶段执行，默认为 test
  only: # 只包含哪些分支
    - master
  script: # 按先后顺序依次执行
    - my command
    - ...
  artifacts: # 必须包含一个 public 目录，用来存放静态内容
    paths:
      - public # 必须
      - ...
job:
  stage: build # 在哪个阶段执行，默认为 test
  only: # 只包含哪些分支
    - develop
  when: manual # 何时执行，manual 表示手动触发，默认为 on_success
  before_script: # 替换全局的 before_script
    - execute this instead of global before script
    - ...
  script: # 按先后顺序依次执行
    - my command
    - ...
  after_script: # 替换全局的 after_script
    - execute this instead of global after script
    - ...
```
