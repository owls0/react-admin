import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as GetElement from '@/library/antd/components/form-util/demo/GetElement';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: GetElement.default,
        title: GetElement.title,
        markdown: GetElement.markdown,
        code: `
import React, {Component} from 'react';
import {Form} from 'antd';
import {FormItemLayout, FormUtil} from '../sx-antd';

@Form.create()
export default class extends Component {
    render() {
        const {form} = this.props;
        const labelSpaceCount = 6;

        const getFormItem = (options) => FormUtil.getFormItem(options, form);

        return (
            <div>
                <FormItemLayout
                    label="输入框"
                    labelSpaceCount={labelSpaceCount}
                >
                    {FormUtil.getFormElement({
                        type: 'input'
                    })}
                </FormItemLayout>

                <FormItemLayout
                    label="下拉框"
                    labelSpaceCount={labelSpaceCount}
                >
                    {FormUtil.getFormElement({
                        type: 'select',
                        elementProps: {
                            placeholder: '请选择一项',
                            options: [
                                {label: '选项一', value: '1'},
                                {label: '选项二', value: '2'},
                                {label: '选项三', value: '3'},
                                {label: '选项四', value: '4'},
                                {label: '选项五', value: '5'},
                            ],
                        }
                    })}
                </FormItemLayout>
                <FormItemLayout
                    label="日期"
                    labelSpaceCount={labelSpaceCount}
                >
                    {FormUtil.getFormElement({
                        placeholder: '请选择日期',
                        type: 'date',
                        elementProps: {
                            width: 200,
                        }
                    })}
                </FormItemLayout>
                {getFormItem({
                    label: '日期区间',
                    labelSpaceCount,
                    field: 'dateRange',
                    type: 'date-range',
                    elementProps: {
                        width: 200,
                        placeholder: ['开始时间', '结束时间'],
                    }
                })}
            </div>
        );
    }
}


        `,
    },
];
const readme = `# 表单相关工具

通过配置方式，获取表单元素等

`;
const api = `## API


### getFormElement(options)

> 基于配置，获取表单元素

options参数为对象，具体属性说明如下：

参数|说明|类型|默认值
---|---|---|---
type | 元素类型，可用类型有：input,input-clear,number,textarea,password,mobile,email,select,select-tree,checkbox,checkbox-group,radio,radio-group,switch,date,date-range,month,time,cascader | string | 'input'
placeholder | 元素的placeholder属性 | string | '请输入{label}' 或 '请选择{label}' 
elementProps | 元素属性，会直接添加到元素上，比如Input上的属性等，但不会应用到自定义组件 component 上 | object | -
elementProps.options | 数组，形式为：\`[{label: xxx, value: xxx}, ...]\`，select,select-tree等组件，通过options提供选项 | array | -
component | 自定义元素，如果配合Form使用，此组件请提供value onChange属性 | any | - 


### getFormItem(options, form)

将返回如下结构
\`\`\`jsx
    <FormItemLayout key={item.field} {...item}>
        {getFieldDecorator(field, decorator)(getFormElement(item))}
    </FormItemLayout>
\`\`\`

参数说明：

参数|说明|类型|默认值
---|---|---|---
options | 为 [FontItemLayout](/example/form-item-layout) 属性 和 getFormElement 所需属性结合，比如 type label field 等 | object | -
from | 为 antd 的 form | object | -
`;

@config({
    path: '/example/antd/form-util',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
