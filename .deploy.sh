#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'lainazy.cn' > CNAME

git init
git add -A
git commit -m 'deploy docs'

# 发布到 https://<USERNAME>.github.io
git push --force git@github.com:lainazy/lainazy.github.io.git master

cd -
