
## 环境
yarn v1.12.1
node v10.13.0

## Webpack
使用了alias @ -> /path/to/src，WebStorm 通过 配置可以支持提示和点击跳转，具体配置如下：
```
Preference... -> Languages & Frameworks -> JavaScript -> Webpack
```

## 样式
less 文件启用了css module
css 文件没启用css module

## 路由
使用 react-router
路由配置自动抓取 同时支持 config PAGE_ROUTE 两种方式
页面跳转 page-link 组件，如果link所指已经是当前页面，点击无效


## modal

## 主题
编写 theme.js 通过 less-loader 的 modifyVars 来进行主题配置
antd 主题 https://ant-design.gitee.io/docs/react/customize-theme-cn
每次修改了theme.js 需要重新yarn start 才能生效

自定义的颜色元素，如果参与主题，不能使用css module 同时需要修改/public/color.less  

sx-antd 引入会导致antd的主题失效


## 菜单
/src/menus.js 中配置菜单数据，支持异步
头部菜单过多时，会导致左侧展开收起比较卡

## mock 数据

## 测试

## 国际化

## 页面打印


## TODO 
- [ ] ]model Redux 相关引用问题
- [ ] axios 升级
- [ ] sx-antd 移入项目中，编写例子，方便维护，方便使用人员查看，丰富架构内容
- [ ] 设计
    - [ ] 登录页面
    - [ ] Logo
- [ ] 框架中所有相关内容，切换到当前项目中
- [ ] 页面上选择主体颜色，改变主题
- [ ] 


