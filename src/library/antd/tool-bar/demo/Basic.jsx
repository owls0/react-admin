import React, {Component} from 'react';
import {Button} from 'antd';
import {ToolBar} from '../../index';

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

export const title = '基础用法';

export const markdown = `
最基础的用法

内部 antd 的button 会被添加 \`margin-right: 8px\`的样式
`;
