import React, {Component} from 'react';
import {Button} from 'antd';
import uuid from 'uuid/v4';
import {TableEditable} from '../../index';

const jobs = {
    '1': '护林员',
    '2': '伐木工',
    '3': '程序员',
};

export default class extends Component {
    state = {
        value: [
            {editable: ['name'], id: '1', name: '熊大', loginName: 'xiongda', job: '1', jobName: '护林员', age: 22},
            {editable: false, id: '2', name: '熊二', loginName: 'xionger', job: '1', jobName: '护林员', age: 20},
            {showEdit: false, editable: true, id: '3', name: '光头强', loginName: 'guangtouqiang', job: '2', jobName: '伐木工', age: 30},
            {editable: true, id: '4', name: '', loginName: 'monkeyKing', job: '2', jobName: '伐木工', age: 29},
        ],
    };
    columns = [
        {
            title: '用户名', width: 200, dataIndex: 'name', key: 'name',
            props: {
                type: 'input',
                elementProps: {
                    placeholder: '请输入用户名',
                },
                decorator: {
                    rules: [
                        {required: true, message: '请输入用户名!'}
                    ],
                },
            }
        },
        {
            title: '登录名', width: 200, dataIndex: 'loginName', key: 'loginName',
            props: {
                type: 'input',
                elementProps: {
                    placeholder: '请输入登录名',
                },
                decorator: {
                    rules: [
                        {required: true, message: '请输入登录名!'}
                    ],
                },
            }
        },
        {
            title: '职业', width: 200, dataIndex: 'job', key: 'job',
            render: (text) => {
                return jobs[text];
            },
            props: {
                type: 'select',
                elementProps: {
                    placeholder: '请选择职业',
                    options: [
                        {label: '护林员', value: '1'},
                        {label: '伐木工', value: '2'},
                        {label: '程序员', value: '3'},
                    ],
                },
                decorator: {
                    rules: [
                        {required: true, message: '请选择职业!'}
                    ],
                },
            }
        },
        // 缺省了props，将为不可编辑
        {title: '年龄', width: 60, dataIndex: 'age', key: 'dataIndex'},
        {
            title: '操作',
            width: 60,
            render: (text, record) => {
                // 注意这 showEdit 和 editable 要默认为true
                const {showEdit = true, editable = true} = record;

                if (showEdit && editable) {
                    return (
                        <a
                            onClick={() => {
                                // 单独校验此行
                                record.__validate((err, values) => {
                                    if (err) return;

                                    // values为editable-table form使用的数据
                                    console.log(values);
                                    // record 才是真实编辑过得数据
                                    console.log(record);

                                    const value = [...this.state.value];
                                    const r = value.find(item => item.id === record.id);
                                    r.showEdit = false;

                                    this.setState({value});
                                });
                            }}
                        >保存</a>
                    );
                }
                return (
                    <a
                        disabled={editable === false}
                        onClick={() => {
                            const value = [...this.state.value];
                            const r = value.find(item => item.id === record.id);
                            r.showEdit = true;

                            this.setState({value});
                        }}
                    >编辑</a>
                );

            }
        }
    ];

    handleChange = (value) => {
        this.setState({value});
    };

    handleAdd = () => {
        const value = [...this.state.value];
        value.unshift({
            id: uuid(),
            editable: true,
            name: void 0,
            loginName: void 0,
            job: void 0,
            jobName: void 0
        });

        this.setState({value});
    };

    handleSubmit = () => {
        // this.tableForm可以用来做校验，编辑过得数据已经同步到 this.state.value中
        this.tableForm.validateFieldsAndScroll((err, values) => {
            if (err) return;
            // values为editable-table form使用的数据
            console.log(values);
            // this.state.value 才是真实编辑过得数据
            console.log(this.state.value);
        });
    };

    render() {
        const {value} = this.state;
        return (
            <div>
                <Button style={{marginBottom: 16}} type="primary" onClick={this.handleAdd}>添加</Button>
                <TableEditable
                    formRef={(form) => this.tableForm = form}
                    showAddButton
                    columns={this.columns}
                    value={value}
                    onChange={this.handleChange}
                    rowKey="id"
                />
                <Button style={{marginTop: 16}} type="primary" onClick={this.handleSubmit}>提交</Button>
            </div>
        );
    }
}

export const title = '基础用法';

export const markdown = `
表格整行可编辑，使用value代替了表格的dataSource属性，同时提供了onChange属性，封装成了类表单元素；

表格每一列最好声明width，编辑/展示切换时，列宽不会变
`;
