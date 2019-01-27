import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as Base from '@/library/antd/components/tool-item/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {ToolBar, ToolItem} from '../sx-antd';

export default class Base extends Component {
    render() {
        return (
            <ToolBar>
                <ToolItem
                    items={[
                        {text: '添加', icon: 'plus', onClick: () => console.log('添加')},
                        {text: '删除', type: 'danger', icon: 'delete', onClick: () => console.log('删除')},
                        {text: '导出', type: 'default', icon: 'export', disabled: true, onClick: () => console.log('导出')},
                        {component: <a onClick={() => console.log('详情')}>详情</a>},
                        {getComponent: () => <a onClick={() => console.log('获取组件')}>获取组件</a>},
                    ]}
                />
            </ToolBar>
        );
    }
}


        `,
    },
];
const readme = `# 工具项

通过配置的方式，获取工具条中的每一项

## 何时使用
通过配置方式，编写工具条场景下使用

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
items | 工具项配置 | array | -

### 每一项API

参数|说明|类型|默认值
---|---|---|---
key | react 列表循环需要的key | string | index
type | 按钮的type | string| 'primary'
icon | 按钮的icon | FontIcon | -
text | 按钮的text | any | -
visible | 此项是否可见 | bool | true
onClick | 按钮点击回调 | function | -
disabled | 按钮的disabled 属性 | bool | false
component | 非按钮时，自定义组件 | any | -
getComponent | 或去组件，优先级高于 component | function | -

`;

@config({
    path: '/example/antd/tool-item',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
