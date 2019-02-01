# React Admin
基于[React](https://reactjs.org) [Ant Design](https://ant.design/)的管理系统架构

## 环境
- [yarn](https://yarnpkg.com) v1.13.0
- [node](https://nodejs.org) v10.13.0

## 下载&安装
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

## 生产构建
```
$ cd /path/to/react-admin
$ yarn build
```
注：构建生成的文件在 `/react-admin/build` 目录下

## 目录结构
```
.
├── config              // 构建配置
├── nginx-conf          // 生产部署nginx配置参考
├── public              // 不参与构建的静态文件
├── scripts             // 构建脚本
├── src                 
│   ├── commons         // 通用js
│   ├── components      // 通用组件
│   ├── i18n            // 国际化
│   ├── layouts         // 页面框架布局组件
│   ├── library         // 基础组件
│   ├── mock            // 模拟数据
│   ├── models          // 模块，基于redux
│   ├── pages           // 页面组件
│   ├── router          // 路由
│   ├── App.js          // 根组件
│   ├── index.css       // 全局样式
│   ├── index.js        // 项目入口
│   ├── menus.js        // 菜单配置
│   ├── setupProxy.js   // 后端联调代理配置
│   └── theme.js        // 主题变量
├── package.json
├── README.md
└── yarn.lock

```

## Webpack
使用了alias @: /path/to/src，说明：

- 方便路径书写，不必关心相对路径结构
- 复制粘贴到其他文件，不必修改路径
- WebStorm 通过 配置webpack配置文件，可以支持提示和点击跳转：
    ```
    WebStorm -> Preference... -> Languages & Frameworks -> JavaScript -> Webpack
    ```
    
支持判断运算符：
```js
const name = res?.data?.user?.name || '匿名';
```

## 样式
使用less作为样式的编写：

- src目录下的less 文件启用了[Css Module](https://github.com/css-modules/css-modules)，配合[react-css-modules](https://github.com/gajus/react-css-modules)，通过 `<div styleName="root"></div>`使用样式
- src/library中less不启用Css Module，基础组件不要使用Css Module，不利于样式覆盖；
- 所有的css 文件没启用Css Module；


## 路由
系统路由使用 [react-router](https://reacttraining.com/react-router/web/guides/quick-start)

- 路由配置自动抓取，生成`/src/pages/page-routes.js`，同时支持两种方式：
    1. 常量方式
        ```js
        export const PAGE_ROUTE = '/path';
        ```
    1. 页面config装饰器
        ```js
        @config({
            path: '/path',
        })
        export default class Demo extends React.Component {
            ...
        }
        ```    
- 页面跳转 page-link 组件，如果link所指已经是当前页面，点击不会引起页面重新render
- 二级页面如果要保持选中父级菜单的选中状态，以父级path开始并以`/_/`作为分隔符即可：`parentPath/_/childPath`
    ```js
    // parent page 
    @config({
        path: '/parent/path'
    })
    export default class Parent extends React.Component {
        ...
    }
    
    // child page
    @config({
        path: '/parent/path/_/child/path'
    })
    export default class Parent extends React.Component {
        ...
    }
    ```

## 页面

### 页面配置
通过config装饰器，实现页面的配置功能，参见[config-hoc](./src/commons/config-hoc/README.md)

### 页面保持
点击地址跳转页面，渲染之后会保持，再次跳转到此页面，页面不会重新创建，而是一直保持状态

开启方式：

1. 页面有上角 -> 用户头像 -> 设置 -> 页面设置 —> 保持页面内容
1. /src/models/system.js initState.keepPage 属性修改默认值
1. config装饰器 keepAlive属性

## 导航tab页
页面头部标签，有如下特性：

1. 在当前tab标签之后打开新的tab标签；
1. 记录并恢复滚动条位置；
1. 保持页面内容（需要开启`Keep Page Alive`）；
1. tab标签右键操作；
1. tab页操作API；
1. tab标签拖拽排序；

说明：

1. tab基于页面地址，每新开一个地址，就会新开一个tab页，`/path` 与 `/path?name=Tom`属于不同url地址，会对应两个tab页；
1. 没有菜单对应的页面，需要单独设置title，否则tab标签将没有title


## modal
对redux进行封装 [文档](./src/models/README.md);

## 主题
通过样式覆盖来实现

编写`/src/theme.js`通过[less-loader](https://github.com/webpack-contrib/less-loader)的`modifyVars`来进行主题配置
Ant Design 主题 https://ant-design.gitee.io/docs/react/customize-theme-cn
每次修改了theme.js 需要重新yarn start 才能生效

自定义的颜色元素，如果参与主题，不能使用Css Module同时需要修改`/public/color.less`
/public/color.less 来自于 https://ant-design.gitee.io/color.less （经过整理）  

## 菜单
/src/menus.js 中配置菜单数据，支持异步
注：头部菜单过多时，会导致左侧展开收起比较卡

## mock 数据

## ajax 请求

## 测试

## 国际化

## 页面打印

## 组件
通用组件不使用css module
example/antd 下文件时通过脚本 src/library/antd/generator-demos.js生成的

## ESLint 说明
如果前端项目，不是git根目录，在提交的时候，会报错 `Not a git repository`

修改package.json，lint-staged 如下即可
```json
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

1. 页面config配置
    ```js
    @config({
        noAuth: true,
    })
    ```
1. 浏览器url中携带noAuth=true参数

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
- [x] library 目录中要使用less，但不进行css模块化处理
- [x] tab页实现，react 并没有 类似vue的keep-alive功能~ 通过显示隐藏div实现

