import React, {Component} from 'react';
import {QueryItem} from '../../index';

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

export const title = '通过嵌套数组，实现简单布局';

export const markdown = `
如果items 的的项是数组，那么其中的查询条件将占用同一行
`;
