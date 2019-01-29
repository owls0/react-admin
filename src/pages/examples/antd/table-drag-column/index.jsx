import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Base from '@/library/antd/components/table-drag-column/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {Table} from 'antd';
import uuid from 'uuid/v4';
import {TableDragColumn} from '../sx-antd';

const DragColumnTable = TableDragColumn(Table);

export default class Base extends Component {
    state = {
        dataSource: [
            {id: uuid(), name: '熊大', age: 23, job: '护林员', position: '老大'},
            {id: uuid(), name: '熊二', age: 23, job: '护林员', position: '跟班'},
            {id: uuid(), name: '光头强', age: 23, job: '伐木工', position: 'leader'},
        ],
        columns: [
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
        ],
    };

    handleDelete = (id) => {
        const dataSource = this.state.dataSource.filter(item => item.id !== id);

        this.setState({dataSource});
    };

    handleColumnMoved = (columns) => {
        // 可以对columns进行持久化存储，保存用户配置
        this.setState({columns});
    };

    render() {
        const {dataSource, columns} = this.state;

        return (
            <div>
                <DragColumnTable
                    onColumnMoved={this.handleColumnMoved}
                    rowKey="id"
                    columns={columns}
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
const readme = `# 表头拖拽高阶组件

## 何时使用

用户需要自己定制表格列的顺序

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
onColumnMoved | 表头拖拽完成后回调 | function(columns) {} | -
`;

@config({
    path: '/example/antd/table-drag-column',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
