import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Basic from '@/library/antd/components/tool-bar/demo/Basic';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Basic.default,
        title: Basic.title,
        markdown: Basic.markdown,
        code: `
import React, {Component} from 'react';
import {Button} from 'antd';
import {ToolBar} from '../sx-antd';

export default class extends Component {
    render() {
        return (
            <ToolBar>
                <Button type="primary">添加</Button>
                <Button type="danger">批量删除</Button>
                <Button>批量导出</Button>
            </ToolBar>
        );
    }
}


        `,
    },
];
const readme = `# 工具条容器

只是一个工具条容器，提供了基础样式

## 何时使用

一般是作为列表页表格上面的工具条

`;
const api = `## API


无


`;

@config({
    path: '/example/antd/tool-bar',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
