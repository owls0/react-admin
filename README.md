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
注：构建生成的文件在 `/react-admin/build` 目录下；[nginx配置参考](./nginx-conf/nginx.conf)。

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
## 菜单
在`/src/menus.js`文中配置菜单数据，支持异步加载菜单数据。

菜单字段说明：

字段|必须|说明
---|---|---
key|是|需要唯一
parentKey|否|用于关联父级
local|否|国际化配置，系统在i18n.menu中获取对应的文案
text|是|如果local对应的文案有效，将覆盖text，否则菜单默认使用text作为展示内容
icon|否|菜单图标配置
order|否|菜单排序，数值越大越靠前显示

## 样式
使用less作为样式的编写：

- src目录下的less 文件启用了[Css Module](https://github.com/css-modules/css-modules)，配合[react-css-modules](https://github.com/gajus/react-css-modules)使用
    style.less
    ```less
    .root{
        width: 100%;
        height: 100%;
    }
    ```
    Some.jsx
    ```jsx
    import '/path/to/style.less';
    
    export default class Some extends React.Component {
        render() {
            return (
                <div styleName="root"></div>            
            );
        }
    }
    ```
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
指的是路由对应的页面组件。

### 页面配置
通过config装饰器，实现页面的配置功能，参见[config-hoc](./src/commons/config-hoc/README.md)

### 页面保持
页面渲染一次之后会保持状态，再次跳转到此页面不会重新创建或重新渲染。

开启方式：

1. 页面有上角 -> 用户头像 -> 设置 -> 页面设置 —> 保持页面状态
1. /src/models/system.js initState.keepPage 属性修改默认值
1. config装饰器 keepAlive属性

## 导航布局
系统提供了四种导航布局：
- 头部菜单
- 左侧菜单
- 头部+左侧菜单
- tab页方式

### 更改方式
- 用户可以通过 页面有上角 -> 用户头像 -> 设置 -> 页面设置 页面进行选择（如果您为用户提供了此页面）；
- 开发人员可以通过修改`src/models/settings.js`指定布局方式；

### 不需要导航的页面
如果有的页面不需要导航菜单显示，可以通过如下方式进行设置：
- 页面配置高级组件
    ```js
    @config({
        noFrame: true,
    })
    ```
- 浏览器url中noFrame=true参数 
    ```
    /path/to?noFrame=true
    ```

### 导航tab页
页面头部标签，有如下特性：

1. 在当前tab标签之后打开新的tab标签；
1. 记录并恢复滚动条位置；
1. 保持页面状态（需要开启`Keep Page Alive`）；
1. tab标签右键操作；
1. tab页操作API；
1. tab标签拖拽排序；

#### tab操作API
system model（redux）中提供了如下操作tab页的方法：

API|说明
---|---
setCurrentTabTitle(title)|设置当前激活的 tab 标题 title: stirng 或 {local, text, icon} local对应 i18n.menu中字段
refreshTab(targetPath)|刷新targetPath指定的tab页内容（重新渲染）
refreshAllTab()|刷新所有tab页内容（重新渲染）
closeTab(targetPath)|关闭targetPath对应的tab页
closeOtherTabs(targetPath)|关闭除了targetPath对应的tab页之外的所有tab页
closeAllTabs()|关闭所有tab页，系统将跳转首页
closeLeftTabs(targetPath)|关闭targetPath对应的tab页左侧所有tab页
closeRightTabs(targetPath)|关闭targetPath对应的tab页右侧所有的tab页

使用方式：
```jsx
import config from '@/commons/config-hoc';

@config({
    connect: true,
})
export default class SomeComponent extends React.Component {
    componentDidMount() {
        this.props.action.system.closeTab('/some/path');
    }
    ...
}
```


说明：

1. tab基于页面地址，每当使用`this.props.history.push('/some/path')`，就会选中或者新打开一个tab页（`/path` 与 `/path?name=Tom`属于不同url地址，会对应两个tab页）；
1. 没有菜单对应的页面，需要单独设置title，否则tab标签将没有title;


## 登录
由于是管理系统架构，绝大部分页面都需要登录，个别不需要登录的页面可以通过如下两种方式进行配置：

- 页面配置高级组件
    ```js
    @config({
        noAuth: true,
    })
    ```
- 浏览器url中携带noAuth=true参数
    ```
    /path/to?noAuth=true
    ```

## ajax 请求
TODO

## mock 数据
TODO 

## models(redux)
对redux进行封装 [文档](./src/models/README.md);

## 国际化
在`src/i18n`中进行国际化文件的编写，模块化方式。

### 项目中国际化相关的组件设置：
- 菜单：{local, text} local对应i18n.menu中的字段，text为国际化失败，默认显示；
- 页面（tab）标题：{local, text} local对应i18n.menu中的字段，text为国际化失败，默认显示；
- 第三方 Ant Design、moment等在 `src/i18n/Local.jsx`中配置；
- 经过models(redux)处理的数据，可以在`src/i18n/redux-middleware.js`中处理；

### 代码中如何获取当前国际化字符集对象
- 与models链接的页面：
    ```js
    @config({
        connect: state => ({
            local: state.system.i18n,
        }),
    })
    export default class SomePage extends React.Component {
        render() {
            const userText = this.props.local.menu.users;
            
            return (
                <div>{userText}<div>
            );
        }
    }
    ```
- 非React组件，无法与models链接的js方法中：
    ```js
    import {getCurrentLocal} from '@/i18n';
     
    function someFunction() {
        const currentLocal = getCurrentLocal();
        const userMenuText = currentLocal.menu.users;
        ...
    }
    ```
    
## 主题
使用less，通过样式覆盖来实现。

### 编写主题
- less文件中使用主题相关变量；
- 编写`/src/theme.js`通过[less-loader](https://github.com/webpack-contrib/less-loader)的`modifyVars`覆盖less中的变量；
- 自定义的颜色元素，如果参与主题，不能使用Css Module同时需要修改`/public/color.less`；

注：目前每次修改了theme.js 需要重新yarn start 才能生效

### 参考
- Ant Design 主题 参考：https://ant-design.gitee.io/docs/react/customize-theme-cn
- `/public/color.less` 来自于 https://ant-design.gitee.io/color.less （经过整理）  

## 页面打印
通过给元素添加相应的class，控制打印内容：

- `.just-print` 只在打印时显示
- `.no-print` 在打印时不显示 

## 组件
目录`src/library/antd`中基于Ant Design 扩展了一些常用组件

编写这些组件时，注意一下几点：
- 通用组件不使用css module，方便使用过程中的样式覆盖;
- 统一各个组件的目录结构，便于文档、demo生成；
- `src/pages/example/antd`、`src/menus-ant-design-example.js` 通过脚本 `src/library/antd/generator-demos.js`生成;


## Webpack
### 使用了alias @: /path/to/src

- 方便路径书写，不必关心相对路径结构
- 复制粘贴到其他文件，不必修改路径
- WebStorm 通过 配置webpack配置文件，可以支持提示和点击跳转：
    ```
    WebStorm -> Preference... -> Languages & Frameworks -> JavaScript -> Webpack
    ```
    
### 支持判断运算符
```js
const name = res?.data?.user?.name || '匿名';
```

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

## TODO 
- [x] ]model Redux 相关引用问题
- [x] axios 升级
- [x] sx-antd 移入项目中，编写例子，方便维护，方便使用人员查看，丰富架构内容
- [x] 框架中所有相关内容，切换到当前项目中
- [x] 页面上选择主体颜色，改变主题
- [x] library 目录中要使用less，但不进行css模块化处理
- [x] tab页实现，react 并没有 类似vue的keep-alive功能~ 通过显示隐藏div实现
- [ ] 设计
    - [ ] 登录页面
    - [ ] Logo
    - [ ] 404 401 等错误页面
- [ ] antd 组件整理
- [ ] 相关文档整理

