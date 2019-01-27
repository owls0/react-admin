import React, {Component} from 'react';
import {ToolBar, ToolItem} from '../../index';

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

export const title = '基础用法';

export const markdown = `
基础用法
`;
