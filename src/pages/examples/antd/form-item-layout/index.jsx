import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Basic from '@/library/antd/components/form-item-layout/demo/Basic';
import * as Float from '@/library/antd/components/form-item-layout/demo/Float';
import * as Form from '@/library/antd/components/form-item-layout/demo/Form';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Basic.default,
        title: Basic.title,
        markdown: Basic.markdown,
        code: `
import React, {Component} from 'react';
import {Input} from 'antd';
import {FormItemLayout} from '../sx-antd';

export default class extends Component {
    render() {
        const labelSpaceCount = 6;
        const tipWidth = 150;

        return (
            <div>
                <FormItemLayout
                    label="用户名"
                    labelSpaceCount={labelSpaceCount}
                    tip="用户名是必填的"
                    tipWidth={tipWidth}
                >
                    <Input/>
                </FormItemLayout>
                <FormItemLayout
                    label="密码"
                    labelSpaceCount={labelSpaceCount}
                    tipWidth={tipWidth}
                >
                    <Input/>
                </FormItemLayout>
                <FormItemLayout
                    label="工作单位"
                    labelSpaceCount={labelSpaceCount}
                    tipWidth={tipWidth}
                >
                    <Input/>
                </FormItemLayout>
            </div>
        );
    }
}


        `,
    },

    {
        component: Float.default,
        title: Float.title,
        markdown: Float.markdown,
        code: `
import React, {Component} from 'react';
import {Input} from 'antd';
import {FormItemLayout} from '../sx-antd';

export default class extends Component {
    render() {
        const width = 200;
        const labelSpaceCount = 5;

        return (
            <div>
                <FormItemLayout
                    float
                    label="用户名"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="密码"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="工作单位"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="用户名"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="密码"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="工作单位"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="用户名"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="密码"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <FormItemLayout
                    float
                    label="工作单位"
                    labelSpaceCount={labelSpaceCount}
                >
                    <Input style={{width}}/>
                </FormItemLayout>
                <div style={{clear: 'both'}}/>
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
import {Input, Form, Button, Row, Col} from 'antd';
import {FormItemLayout} from '../sx-antd';

@Form.create()
export default class extends Component {

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
        const labelSpaceCount = 7;
        const tipWidth = 60;

        return (
            <Form>
                <Row>
                    <Col span={8}>
                        <FormItemLayout
                            label="用户名"
                            labelSpaceCount={labelSpaceCount}
                            tip="必填项"
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {required: true, message: '请输入！'},
                                ],
                            })(
                                <Input/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={8}>
                        <FormItemLayout
                            label="密码"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {required: true, message: '请输入！'},
                                ],
                            })(
                                <Input/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={8}>
                        <FormItemLayout
                            label="工作单位"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('job', {
                                rules: [
                                    {required: true, message: '请输入！'},
                                ],
                            })(
                                <Input/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={8}>
                        <FormItemLayout
                            label="常用居住地址"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('address', {
                                rules: [
                                    {required: true, message: '请输入！'},
                                ],
                            })(
                                <Input/>
                            )}
                        </FormItemLayout>
                    </Col>

                    <Col span={8}>
                        <FormItemLayout
                            label="联系方式"
                            labelSpaceCount={labelSpaceCount}
                            tipWidth={tipWidth}
                        >
                            {getFieldDecorator('concat', {
                                rules: [
                                    {required: true, message: '请输入！'},
                                ],
                            })(
                                <Input/>
                            )}
                        </FormItemLayout>
                    </Col>
                </Row>

                <FormItemLayout
                    labelSpaceCount={labelSpaceCount}
                >
                    <Button onClick={this.handleSubmit}>提交</Button>
                </FormItemLayout>
            </Form>
        );
    }
}


        `,
    },
];
const readme = `# 表单布局

基于antd FormItem进行布局，label固定宽度，表单元素自适应

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
className | 添加在FormItem父级div上的class | string | - 
style | 添加在FormItem父级div上的style | object | - 
width | FormItem父级div的总宽度 label + element | string 或 number | - 
float | 是否是浮动，如果true，将左浮动 | bool | false 
label | 标签 | any | -
labelWidth | label宽度，如果设置此值，labelSpaceCount 和 labelFontSize将失效 | number | -
labelSpaceCount | label所占空间个数，用于与其他label对齐 | number | -
labelFontSize | label字体大小，最终labelWidth = labelSpaceCount * labelFontSize | number | -
tip | 表单元素后面的提示 | any | -
tipWidth | 提示的宽度 | number | -
tipColor | 提示颜色 | string | - 

`;

@config({
    path: '/example/antd/form-item-layout',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
