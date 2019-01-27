import React, {Component} from 'react';
import uuid from 'uuid/v4';
import {TableEditable} from '../../index';

function focusAndSelect(e, index) {
    // 获取父级tr
    let currentTr = e.target;
    while (currentTr && currentTr.tagName !== 'TR') {
        currentTr = currentTr.parentNode;
    }

    const nextInput = currentTr.getElementsByTagName('input')[index];
    nextInput.focus();
    nextInput.select();
}

export default class extends Component {
    state = {
        value: [
            {id: '1', name: '熊大', loginName: 'xiongda', job: '1', jobName: '护林员', age: 22},
            {id: '2', name: '熊二', loginName: 'xionger', job: '1', jobName: '护林员', age: 20},
        ],
    };
    columns = [
        {
            title: '用户名', dataIndex: 'name', key: 'name',
            props: {
                type: 'input',
                elementProps: {
                    placeholder: '请输入用户名',
                    onPressEnter: (e) => focusAndSelect(e, 1),
                },
                decorator: {
                    rules: [
                        {required: true, message: '请输入用户名!'}
                    ],
                },
            }
        },
        {
            title: '登录名', dataIndex: 'loginName', key: 'loginName',
            props: {
                type: 'input',
                elementProps: {
                    placeholder: '请输入登录名',
                    onPressEnter: (e) => focusAndSelect(e, 2),
                },
                decorator: {
                    rules: [
                        {required: true, message: '请输入登录名!'}
                    ],
                },
            }
        },
        {
            title: '年龄', dataIndex: 'age', key: 'age',
            props: {
                type: 'input',
                elementProps: {
                    placeholder: '请输入年龄',
                    onPressEnter: (e) => {
                        const value = [...this.state.value];

                        // 获取父级tr
                        let currentTr = e.target;
                        while (currentTr && currentTr.tagName !== 'TR') {
                            currentTr = currentTr.parentNode;
                        }

                        const nextTr = currentTr.nextSibling;

                        // 当前输入框在最后一行，新增一行，并且新增行第一个输入框获取焦点
                        if (!nextTr) {
                            value.push({id: uuid(), name: void 0, loginName: void 0, age: void 0});
                            this.setState({value}, () => {
                                const nextInput = currentTr.nextSibling.getElementsByTagName('input')[0];

                                nextInput.focus();
                                nextInput.select();
                            });
                        } else {
                            const nextInput = nextTr.getElementsByTagName('input')[0];
                            nextInput.focus();
                            nextInput.select();
                        }
                    },
                },
                decorator: {
                    rules: [
                        {required: true, message: '请输入年龄!'}
                    ],
                },
            }
        },
    ];

    handleChange = (value) => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;
        return (
            <div>
                <TableEditable
                    formRef={(form) => this.tableForm = form}
                    showAddButton
                    columns={this.columns}
                    value={value}
                    onChange={this.handleChange}
                    rowKey="id"
                />
            </div>
        );
    }
}

export const title = 'Input回车下一项、新增一行';

export const markdown = `
Input添加监听事件，回车下一个元素获取焦点，或则新增一行
`;
