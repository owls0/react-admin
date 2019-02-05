import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Base from '@/library/antd/components/pop-prompt/demo/Base';
import * as Form from '@/library/antd/components/pop-prompt/demo/Form';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {PopPrompt} from '../sx-antd';

export default class Base extends Component {
    state = {};

    render() {
        return (
            <div style={{paddingLeft: 300}}>
                <PopPrompt
                    onConfirm={(values) => console.log(values)}
                >
                    <a>demo</a>
                </PopPrompt>
            </div>
        );
    }
}


        `,
    },

    {
        component: Form.default,
        title: Form.title,
        markdown: Form.markdown,
        code: `
import React, {Component} from 'react';
import {PopPrompt} from '../sx-antd';

export default class Base extends Component {
    state = {
        visible: false,
    };

    render() {
        return (
            <div style={{paddingLeft: 300}}>
                <PopPrompt
                    visible={this.state.visible}
                    onConfirm={(values) => {
                        console.log(values);
                        this.setState({visible: false});
                    }}
                    onCancel={() => this.setState({visible: false})}
                    items={[
                        {
                            label: '姓名', field: 'name', type: 'input',
                            decorator: {
                                rules: [
                                    {required: true, message: '请输入姓名'},
                                ],
                            },
                        },
                        {label: '年龄', field: 'age', type: 'number'},
                        {label: '生日', field: 'birthday', type: 'date'},
                    ]}
                >
                    <a onClick={() => this.setState({visible: true})}>demo</a>
                </PopPrompt>
            </div>
        );
    }
}


        `,
    },
];
const readme = `# 弹框输入

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
visible | 是否显示 | bool | false
defaultVisible | 默认是否显示 | bool | true
title | 提示信息 | any | '请输入'
okText | 确认按钮文本 | string | '确认'
cancelText | 取消按钮文本 | string | '取消'
onClickLabel | label点击触发，一般通过visible控制显示隐藏时才会用到 | function() {} | -
onConfirm | 确认回调 | function(values) {} | -
onCancel | 取消回调 | function() {} | -
onVisibleChange | visible改变回调 | function(visible) {} | -
inputProps | 内置input 元素属性 | object | -
items | 自定义表单元素，参见[getFormItem](/example/form-util) | array | \`[]\``;

@config({
    path: '/example/antd/pop-prompt',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
