---
title: Git 命令
date: 2017-09-11 18:09:46
tags: Git
---

### Git Cmd

![Git命令大全](http://static.zybuluo.com/lainazy/0ht5u9haqg26dnclziixgrq3/git-cmd.jpeg)

### Git 使用流程（当前处于个人分支）

* `git status` -- 查看工作空间或暂存区与本地仓库的区别
* `git add .` -- 将工作空间中改动的文件添加到暂存区
* `git commit -m '注释'` -- 将暂存区中的内容提交到本地仓库
* `git checkout develop` -- 切换到本地仓库 develop 分支
* `git pull origin develop` -- 从远程仓库 develop 分支拉取最新数据到本地仓库当前(个人)分支，有冲突时解决
  * `git status -> git add . -> git commit -m '注释'` -- 有冲突时执行
* `git merge [--squash] <个人分支名>` -- 将本地仓库中个人分支的代码合并到本地仓库 develop 分支，一般没有冲突，若有冲突解决，--squash 选项用来将个人分支中的多个 commit 对象压扁成一个，并且合并完之后不自动 commit
  * `git status -> git add . -> git commit -m '注释'` -- 有冲突时执行
* `git push origin develop` -- 将本地仓库 develop 分支内容推送到远程仓库 develop 分支
* `git checkout <个人分支名>` -- 切换回本地仓库个人分支
* `git merge develop` -- 将本地仓库 develop 分支中的代码合并到本地仓库中的个人分支

### git pull 和 git push 用法

* `git pull <远程主机名> <远程分支名>:<本地分支名>` -- 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。
* `git push <远程主机名> <本地分支名>:<远程分支名>` -- 如果省略远程分支名，则表示将本地分支推送与之存在”追踪关系”的远程分支(通常两者同名)，如果该远程分支不存在，则会被新建。
* `git push origin :master 等同于 git push origin --delete master` -- 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支。
