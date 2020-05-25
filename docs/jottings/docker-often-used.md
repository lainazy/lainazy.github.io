# Docker 常用命令记录

```bash
docker --help # 帮助文档
docker pull # 下载镜像
docker push # 上传镜像
docker commit # 用指定的容器生成镜像，另一种生成镜像的方式是使用Dockerfile
docker import|load # 导入镜像，load对应save
docker export|save # 导出镜像，save方式包含历史记录
docker image --help # 查看镜像相关的帮助文档
docker image ls # 查看本地镜像
docker image rm # 删除本地镜像
docker container --help # 查看容器相关的帮助文档
docker container ls --all # 查看容器，--all表示所有，包括未启动的容器
docker container start # 启动容器
docker container stop|kill # 停止容器，stop等待容器执行一些内部操作后再停止，kill直接停止
docker container rm # 删除未启动的容器
docker run # 运行镜像生成一个容器，相当于 docker create + docker start
docker exec # 在指定的容器环境中执行某个命令
```
