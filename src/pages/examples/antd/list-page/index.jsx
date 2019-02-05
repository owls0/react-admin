import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Base from '@/library/antd/components/list-page/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {Button} from 'antd';
import uuid from 'uuid/v4';
import {ListPage} from '../sx-antd';

export default class Base extends Component {
    state = {
        dataSource: [
            {id: uuid(), name: '熊大', age: 22, job: '护林员'},
            {id: uuid(), name: '熊二', age: 20, job: '护林员'},
            {id: uuid(), name: '光头强', age: 25, job: '伐木工'},
        ],
        total: 108,
    };
    columns = [
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '年龄', dataIndex: 'age', key: 'age'},
        {title: '工作', dataIndex: 'job', key: 'job'},
    ];

    handleSearch = (params) => {
        console.log(params);
    };

    render() {
        const {dataSource, total} = this.state;
        return (
            <ListPage
                queryItems={[
                    {label: '姓名', field: 'name', type: 'input'},
                ]}
                queryExtra={<Button style={{marginLeft: '8px'}}>添加</Button>}
                onSearch={this.handleSearch}
                tableProps={{
                    dataSource: dataSource,
                    columns: this.columns,
                    rowKey: (record) => record.id,
                }}
                total={total}
            />
        );
    }
}


        `,
    },
];
const readme = `# 列表页
通过配置来编写列表页

## 何时使用
列表页一般用于展示数据，一些比较简单的CRUD场景可以考虑使用，可以简化代码。

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
queryItems | 查询条件配置，如果缺省，将不显示查询条件，参见[QueryItem](/example/query-item) | array | -
formRef | 获取查询条件form | function(form) {} | -
showSearchButton | 是否显示查询条件中的查询按钮 | bool | true
showResetButton | 是否显示查询条件中的重置按钮 | bool | true
toolItems | 表格顶部工具条配置，如果缺省，将不显示工具条，参见[tool-item](/example/tool-item) | array | -
searchOnMount | componentDidMount 是否触发查询 | bool | true
onSearch | 触发查询回调，翻页、点击查询条件中的查询按钮等会触发此函数 | function(params) {} | -
tableProps | 表格相关属性，参见[antd Table](http://ant-design.gitee.io/components/table-cn/) | object | -
showSequenceNumber | 是否显示序号列 | bool | true
showPagination | 是否显示翻页组件 | bool | true
total | 总页数 | bool | 0
pageNum | 当前页，需要配合onPageNumChange一起使用 | number | 1
pageSize | 每页显示记录数，需要配合onPageSizeChange一起使用 | number | 10
onPageNumChange | 页码改变回调 | function(pageNum) {} | -
onPageSizeChange | 每页显示记录数改变回调 | function(pageSize) {} | -`;

@config({
    path: '/example/antd/list-page',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
