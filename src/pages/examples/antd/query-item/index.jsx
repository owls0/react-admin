import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as Base from '@/library/antd/components/query-item/demo/Base';
import * as Layout from '@/library/antd/components/query-item/demo/Layout';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {QueryItem} from '../sx-antd';

export default class Base extends Component {
    render() {
        return (
            <div>
                <QueryItem
                    items={[
                        {
                            label: '用户名', width: 300, field: 'name', type: 'input',
                            decorator: {
                                rules: [
                                    {required: true, message: '请输入用户名！'}
                                ],
                            },
                        },
                        {
                            label: '工作', width: 300, field: 'job', type: 'select',
                            elementProps: {
                                options: [
                                    {label: '护理员', value: '1'},
                                    {label: '伐木工', value: '2'},
                                    {label: '程序员', value: '3'},
                                ],
                            },
                        },
                        {
                            label: '入职日期', width: 300, field: 'join', type: 'date',
                        }
                    ]}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                />
            </div>
        );
    }
}


        `,
    },

    {
        component: Layout.default,
        title: Layout.title,
        markdown: Layout.markdown,
        code: `
import React, {Component} from 'react';
import {QueryItem} from '../sx-antd';

export default class Base extends Component {
    render() {
        return (
            <div>
                <QueryItem
                    items={[
                        [
                            {
                                label: '用户名', width: 300, field: 'name', type: 'input',
                                decorator: {
                                    rules: [
                                        {required: true, message: '请输入用户名！'}
                                    ],
                                },
                            },
                            {
                                label: '工作', width: 300, field: 'job', type: 'select',
                                elementProps: {
                                    options: [
                                        {label: '护理员', value: '1'},
                                        {label: '伐木工', value: '2'},
                                        {label: '程序员', value: '3'},
                                    ],
                                },
                            },
                            {
                                label: '年龄', width: 300, field: 'age', type: 'number',
                            },
                        ],
                        {
                            label: '入职日期', width: 300, field: 'join', type: 'date',
                        }
                    ]}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                />
            </div>
        );
    }
}


        `,
    },
];
const readme = `# 查询条件
通过配置的方式，获取查询条件

## 何时使用
一般用于简单的列表页查询条件，通过配置，快速编写查询条件，太复杂的查询条件可能不适合；

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
showSearchButton | 是否显示查询按钮 | bool | true
showResetButton | 是否显示重置按钮 | bool | true
collapsed | 是否收起 | bool | false
items | 查询条件没一项配置 | object | -
onSubmit | 提交时触发（回车或则点击查询按钮）| function(values) {} | -
formRef | 获取内部form | function(form) {} | -

### items

FormUtil.getFormItem函数所需参数，[点击这里](/example/form-util)`;

@config({
    path: '/example/antd/query-item',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
