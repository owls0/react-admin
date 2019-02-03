import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/users/_/UserEdit/:id',
    keepAlive: true,
    query: true,
    title: (props) => {
        const {query} = props;
        return {text: `用户编辑-${query.name}`, icon: 'edit'};
    },
    breadcrumbs: (props) => {
        const {query, match: {params}} = props;
        return [
            {key: 0, local: 'userEdit', icon: 'user', text: '用户编辑'},
            {key: 1, text: params.id},
            {key: 2, text: query.name},
        ];
    },
})
@Form.create()
export default class UserEdit extends Component {
    constructor(...props) {
        super(...props);

        this.props.onComponentWillShow(() => {
            console.log('UserEdit onComponentShow');
        });
        this.props.onComponentWillHide(() => {
            console.log('UserEdit onComponentWillHide');
        });
    }

    componentDidMount() {
        console.log('UserEdit.js componentDidMount');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleReset = (e) => {
        e.preventDefault();
        this.props.form.resetFields();
    };

    render() {
        console.log('render UserEdit.jsx');
        const {query, match: {params: {id}}} = this.props;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        };

        return (
            <PageContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2>UserEdit {query.name}</h2>
                <Form style={{width: 300}} onSubmit={this.handleSubmit}>
                    {getFieldDecorator('id', {initialValue: id})(<Input type="hidden"/>)}
                    <Form.Item
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true, message: '请输入姓名！',
                                },
                            ],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="年龄"
                    >
                        {getFieldDecorator('age', {
                            rules: [
                                {
                                    required: true, message: '请输入年龄！',
                                },
                            ],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                    </Form.Item>
                </Form>
            </PageContent>
        );
    }
}

