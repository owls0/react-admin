import React, {Component} from 'react'
import {Helmet} from 'react-helmet';
import {Form, Icon, Input, Button} from 'antd';
import {setLoginUser} from '@/commons';
import config from '@/commons/config-hoc';
import Local from '@/layouts/header-i18n';
import './style.less'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()
@config({
    path: '/login',
    noFrame: true,
    noAuth: true,
    connect(state) {
        return {local: state.system.i18n.login}
    },
})
export default class extends Component {
    state = {
        loading: false,
        message: '',
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields(() => void 0);

        // TODO 方便测试，填写表单
        this.props.form.setFieldsValue({userName: 'test', password: '111'});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true, message: ''});

                // TODO 发送请求进行登录，一下为前端硬编码，模拟请求
                const {userName, password} = values;

                setTimeout(() => {
                    this.setState({loading: false});
                    if (userName === 'test' && password === '111') {
                        setLoginUser({
                            id: 'tempUserId',
                            name: userName,
                        });
                        // 跳转页面，优先跳转上次登出页面
                        const lastHref = window.sessionStorage.getItem('last-href');
                        window.location.href = lastHref || '/';
                    } else {
                        this.setState({message: '用户名或密码错误！'});
                    }
                }, 1000)
            }
        });
    };

    render() {
        const {local} = this.props;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {loading, message} = this.state;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div styleName="root">
                <Helmet>
                    <title>{local.title}</title>
                </Helmet>

                <div styleName="local">
                    <Local/>
                </div>
                <div styleName="box">
                    <div styleName="header">{local.title}</div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={userNameError ? 'error' : ''}
                            help={userNameError || ''}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: local.userNameEmptyTip}],
                            })(
                                <Input autoFocus prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: local.passwordEmptyTip}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
                            )}
                        </Form.Item>
                        <Button
                            styleName="submit-btn"
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            {local.submit}
                        </Button>
                    </Form>
                    <div styleName="error-tip">{message}</div>
                    <div styleName="tip">
                        <span>{local.userName}：test </span>
                        <span>{local.password}：111</span>
                    </div>
                </div>
            </div>
        );
    }
}

