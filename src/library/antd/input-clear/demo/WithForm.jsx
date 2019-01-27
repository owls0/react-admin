import React, {Component} from 'react';
import {Form, Button} from 'antd';
import {InputClear} from '../../index';

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

export const title = '与antd Form 结合使用';
export const markdown = `
与正常 antd Input 使用一样，只是需要声明 \`onClear\`属性
`;
