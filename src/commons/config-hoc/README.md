## 配置高阶组件
将组件所需要的一些功能，通过配置的方式实现

```jsx
import React, {Component} from 'react';
import config from '/path/to/config-hoc';

@config({
    path: '/route/path',
    title: '页面title',
})
export default class SomePage extend Component {
    ...
}
```

所有参数如下：
            
参数|类型|默认值|说明
---|---|---|---
path|string|-|页面路由地址，如果存在path配置，会通过脚本抓取，当前组件将会作为路由页面，path将作为路由地址 
noFrame|boolean|false|标记当前页面为不需要导航框架的页面，比如登录页，通过脚本抓取实现
noAuth|boolean|false|标记当前页面为不需要登录即可访问的页面，通过脚本抓取实现
title|boolean/string/object|true|true：当前页面显示通过菜单结构自动生成的title；false：当前页面不显示title；string：自定义title，并不参与国际化；object：{local, text}，local对应国际化menu中的配置，text为国际化失败之后的默认显示
breadcrumbs|boolean/array|true|true：当前页面显示通过菜单结构自动生成的面包屑；false：当前页面不显示面包屑；object：[{local, text, ...}]，local对应国际化menu中的配置，text为国际化失败之后的默认显示
appendBreadCrumbs|array|空数组|在当前面包屑基础上添加
pageHead|boolean|-|页面头部是否显示
side|boolean|-|页面左侧是否显示
sideCollapsed|boolean|-|左侧是否收起
router|boolean|false|是否添加withRouter装饰器，如果设置了path，将自动使用了withRouter，组件内部可以使用this.props.history等API
query|boolean|false|是否添加地址查询字符串转换高阶组件，内部可以通过this.props.query访问查询字符串
ajax|boolean|false|是否添加ajax高阶组件，内部可以通过this.props.ajax使用ajax API，组件卸载时，会自动打断未完成的请求
connect|boolean/function|false|是否与redux进行连接，true：只注入了this.props.action相关方法；false：不与redux进行连接；(state) => ({title: state.page.title})：将函数返回的数据注入this.props
event|boolean|false|是否添加event高阶组件，可以使用this.props.addEventListener添加dom事件，并在组件卸载时会自动清理；通过this.props.removeEventListener移出dom事件
pubSub|boolean|false|是否添加发布订阅高阶组件，可以使用this.props.on订阅事件，并在组件卸载时，会自动取消订阅; 通过this.props.emit发布事件

