# 快速开始
从github上clone代码，通过下面介绍的命令，进行开发或者生产构建

## 环境
- [yarn](https://yarnpkg.com) v1.13.0
- [node](https://nodejs.org) v10.13.0

## 下载&安装依赖
```bash
$ git clone https://github.com/zkboys/react-admin.git
$ cd /path/to/react-admin
$ yarn
```

## 开发启动
```bash
$ cd /path/to/react-admin
$ yarn start
```
注：会自动打开浏览器，开发构建完成之后，可能需要刷新一下浏览器才能显示页面

## 生产构建
```
$ cd /path/to/react-admin
$ yarn build
```
注：构建生成的文件在 `/react-admin/build` 目录下；[nginx配置参考](NGINX.md)。

