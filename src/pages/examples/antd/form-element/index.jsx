import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as FormElement from '@/library/antd/components/form-element/demo/FormElement';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: FormElement.default,
        title: FormElement.title,
        markdown: FormElement.markdown,
        code: `
import React, {Component} from 'react';
import {Form} from 'antd';
import {FormElement} from '../sx-antd';

const FormItem = Form.Item;

@Form.create()
export default class extends Component {
    render() {
        const {form: {getFieldDecorator}} = this.props;

        return (
            <div>
                <FormItem
                    label="输入框"
                >
                    {getFieldDecorator('input', {})(
                        <FormElement type="input"/>
                    )}
                </FormItem>

                <FormItem
                    label="下拉框"
                >
                    {getFieldDecorator('select', {
                        initialValue: '1',
                    })(
                        <FormElement
                            type="select"
                            placeholder="请选择一项"
                            options={[
                                {label: '选项一', value: '1'},
                                {label: '选项二', value: '2'},
                                {label: '选项三', value: '3'},
                                {label: '选项四', value: '4'},
                                {label: '选项五', value: '5'},
                            ]}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="日期"
                >
                    {getFieldDecorator('select', {
                        initialValue: '1',
                    })(
                        <FormElement
                            type="date"
                            placeholder="请选择日期"
                            width={200}
                        />
                    )}
                </FormItem>
            </div>
        );
    }
}


        `,
    },
];
const readme = `# 表单元素

通过配置方式，获取表单元素

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
type | 元素类型，可用类型有：input,hidden,number,textarea,password,mobile,email,select,select-tree,checkbox,checkbox-group,radio,radio-group,switch,date,date-range,month,time,cascader | string | 'input'
component | 自定义元素，如果配合Form使用，此组件请提供value onChange属性 | ReactNode 或 function | - 
其他 | 其他属性为Ant Design提供的属性 | - | - 
`;

@config({
    path: '/example/antd/form-element',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
