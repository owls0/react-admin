import React, {Component} from 'react';
import {QueryItem} from '../../index';

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

export const title = '基础用法';

export const markdown = `
基础用法
`;
