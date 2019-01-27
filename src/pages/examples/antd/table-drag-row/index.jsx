import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as Base from '@/library/antd/components/table-drag-row/demo/Base';
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
import {TableDragRow} from '../sx-antd';

const DragRowTable = TableDragRow(Table);

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

    handleRowMoved = (dataSource) => {
        this.setState({dataSource});
    };

    render() {
        const {dataSource} = this.state;

        return (
            <div>
                <DragRowTable
                    onRowMoved={this.handleRowMoved}
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
const readme = `# 表格行可拖拽高阶组件

## 何时使用

用户需要自己定制表格行的顺序

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
onRowMoved | 行拖拽完成后回调 | function(dataSource) {} | -
`;

@config({
    path: '/example/antd/table-drag-row',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
