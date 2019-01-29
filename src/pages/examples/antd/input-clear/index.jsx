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


    handleClear = () => {
        this.setState({value: void 0});
    };

    handleChange = (e) => {
        const {value} = e.target;

        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <InputClear
                style={{width: '200px'}}
                value={value}
                onChange={this.handleChange}
                onClear={this.handleClear}
            />
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

    handleClear = () => {
        const {form: {setFieldsValue}} = this.props;
        setFieldsValue({inputClear: void 0});
    };

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
                        <InputClear
                            style={{width: '200px'}}
                            onClear={this.handleClear}
                        />
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
在antd Input 输入框后添加了清除图标，点击触发 \`onClear\`事件

## 何时使用

需要点击清除图标，清空输入框的情景

`;
const api = `## API

> 其他属性 参考 antd Input 组件


参数|说明|类型|默认值
---|---|---|---
onClear | 点击 清除图标 时触发 | function() {}| -
`;

@config({
    path: '/example/antd/input-clear',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
