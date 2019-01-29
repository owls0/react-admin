import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Base from '@/library/antd/components/table-right-click/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {Table, Menu} from 'antd';
import uuid from 'uuid/v4';
import {TableRightClick} from '../sx-antd';

const RightClickTable = TableRightClick(Table);

export default class Base extends Component {
    state = {
        dataSource: [
            {id: uuid(), name: '熊大', age: 23, job: '护林员', position: '老大'},
            {id: uuid(), name: '熊二', age: 23, job: '护林员', position: '跟班'},
            {id: uuid(), name: '光头强', age: 23, job: '伐木工', position: 'leader'},
        ],
    };

    columns = [
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '年龄', dataIndex: 'age', key: 'age'},
        {title: '工作', dataIndex: 'job', key: 'job'},
        {title: '职位', dataIndex: 'position', key: 'position'},
        {
            title: '操作',
            render: (text, {id}) => {
                return <a onClick={() => this.handleDelete(id)}>删除</a>
            },
        }
    ];

    handleDelete = (id) => {
        const dataSource = this.state.dataSource.filter(item => item.id !== id);
        this.setState({dataSource});
    };

    handleRightClickContent = (record, index) => {
        console.log(record, index);
        return (
            <Menu
                onClick={(e) => {
                    console.log(e);
                }}
                style={{width: 256}}
                mode="vertical"
            >
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Iteom 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        );
    };

    render() {
        const {dataSource} = this.state;

        return (
            <div>
                <RightClickTable
                    rightClickContent={this.handleRightClickContent}
                    rowKey="id"
                    columns={this.columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
        );
    }
}


        `,
    },
];
const readme = `# 表格行右键高阶组件

## 何时使用

表格右键，需要展示操作菜单等情况

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
rightClickContent | 右键弹出的内容 | function(record, index) {} | -
`;

@config({
    path: '/example/antd/table-right-click',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
