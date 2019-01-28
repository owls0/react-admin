
## 环境
yarn v1.13.0
node v10.13.0

## Webpack
使用了alias @ -> /path/to/src，WebStorm 通过 配置可以支持提示和点击跳转，具体配置如下：
```
Preference... -> Languages & Frameworks -> JavaScript -> Webpack
```

## 样式
src目录下的less 文件启用了css module
src/library中less不启用css module 基础组件，不要使用css module
所有的css 文件没启用css module


## 路由
使用 react-router
路由配置自动抓取 同时支持 config PAGE_ROUTE 两种方式
页面跳转 page-link 组件，如果link所指已经是当前页面，点击无效

## 判断运算符
尤其在判断后端返回数据的时候，额外简洁

```
const name = res?.data?.user?.name || '匿名';
```

## modal
对redux进行封装 [文档](./src/models/README.md);

## 主题
通过样式覆盖来实现的

编写 theme.js 通过 less-loader 的 modifyVars 来进行主题配置
antd 主题 https://ant-design.gitee.io/docs/react/customize-theme-cn
每次修改了theme.js 需要重新yarn start 才能生效

自定义的颜色元素，如果参与主题，不能使用css module 同时需要修改/public/color.less
color.less 来自于 https://ant-design.gitee.io/color.less 里面的代码有点乱，大量重复，大量未使用到less变量的代码，需要整理  

## 菜单
/src/menus.js 中配置菜单数据，支持异步
头部菜单过多时，会导致左侧展开收起比较卡

## mock 数据

## 测试

## 国际化

## 页面打印

## 组件
通用组件不使用css module
example/antd 下文件时通过脚本 src/library/antd/generator-demos.js生成的

## 页面配置
[config装饰器](./src/commons/config-hoc/README.md);


## ESLint 说明
如果前端项目，不是git根目录，在提交的时候，会报错 `Not a git repository`

修改package.json，lint-staged 如下即可
```
"lint-staged": {
    "gitDir": "../",
    "linters": {
        "**/*.{js,jsx}": "lint-staged:js",
        "**/*.less": "stylelint --syntax less"
    }
},
```

## 页面布局

提供三种方式

通过/src/models/settings.js pageFrameLayout 进行默认修改

通过 设置页面，进行修改

@config({
    noFrame: true,
})

浏览器url中noFrame=true参数

## 登录
由于是管理系统架构，绝大部分页面都需要登录，个别不需要登录的页面可以通过如下两种方式进行配置：
@config({
    noAuth: true,
})

浏览器url中携带noAuth=true参数



## TODO 
- [x] ]model Redux 相关引用问题
- [x] axios 升级
- [x] sx-antd 移入项目中，编写例子，方便维护，方便使用人员查看，丰富架构内容
- [ ] 设计
    - [ ] 登录页面
    - [ ] Logo
    - [ ] 404 401 等错误页面
- [x] 框架中所有相关内容，切换到当前项目中
- [x] 页面上选择主体颜色，改变主题
- [ ] antd 组件整理
- [ ] library 目录中要使用less，但不进行css模块化处理


