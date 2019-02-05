import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Basic from '@/library/antd/components/input-clear/demo/Basic';
import * as WithForm from '@/library/antd/components/input-clear/demo/WithForm';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Basic.default,
        title: Basic.title,
        markdown: Basic.markdown,
        code: `
import React, {Component} from 'react';
import {InputClear} from '../sx-antd';

export default class Basic extends Component {
    state = {
        value: '',
    };

    handleChange = (e) => {
        const {value} = e.target;

        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <div>
                <InputClear
                    style={{width: '200px'}}
                    value={value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}


        `,
    },

    {
        component: WithForm.default,
        title: WithForm.title,
        markdown: WithForm.markdown,
        code: `
import React, {Component} from 'react';
import {Form, Button} from 'antd';
import {InputClear} from '../sx-antd';

const FormItem = Form.Item;

@Form.create()
export default class Basic extends Component {
    handleSubmit = () => {
        const {form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
            }
        });
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;

        return (
            <Form layout="inline">
                <FormItem
                    label="可清除输入框"
                >
                    {getFieldDecorator('inputClear', {
                        rules: [
                            {required: true, message: '请输入！'},
                        ],
                    })(
                        <InputClear style={{width: '200px'}}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button onClick={this.handleSubmit}>提交</Button>
                </FormItem>
            </Form>
        );
    }
}


        `,
    },
];
const readme = `# 可清空Input
在Ant Design Input 输入框后添加了清除图标

## 何时使用

需要点击清除图标，清空输入框的情景

`;
const api = `## API

> 参考 Ant Design Input 组件

`;

@config({
    path: '/example/antd/input-clear',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
