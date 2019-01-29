import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Base from '@/library/antd/components/table-animate/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {Table, Button} from 'antd';
import uuid from 'uuid/v4';
import {TableAnimate} from '../sx-antd';

const AnimateTable = TableAnimate(Table);

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

    handleAdd = () => {
        const dataSource = [...this.state.dataSource];
        dataSource.push({
            id: uuid(),
            name: '新增',
            age: 23,
            job: '前端',
            position: '高级',
        });

        this.setState({dataSource});
    };

    handleDelete = (id) => {
        const dataSource = this.state.dataSource.filter(item => item.id !== id);

        this.setState({dataSource});
    };

    render() {
        const {dataSource} = this.state;

        return (
            <div>
                <Button
                    style={{marginBottom: 16}}
                    type="primary"
                    onClick={this.handleAdd}
                >添加</Button>
                <AnimateTable
                    animationDuring={500}
                    inAnimationClass="animated fadeInLeft"
                    outAnimationClass="animated zoomOutRight"

                    rowKey={(record, index) => record.id}
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
const readme = `# 表格动画高阶组件

表格动画，能够从视觉上反馈用户的操作，合理应用动画，可以有效提高用户体验

推荐动画基于[animate.css](https://daneden.github.io/animate.css/)

## 何时使用

需要通过动画反馈表格操作的场景

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
rowKey | 可以确定数据唯一性的key，**由于添加删除，数据长度变化，不能使用index作为key** | string 或 function(record, index) {} | 'id'
animationDuring | 动画持续时间,单位ms| number | 500
inAnimationClass | 行入场动画class | string | 'animated fadeInLeft'
outAnimationClass | 行出场动画class | string | 'animated zoomOutRight'
`;

@config({
    path: '/example/antd/table-animate',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
