import React from 'react';
import InputClear from '../input-clear';
import FormItemLayout from '../form-item-layout';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import TreeSelect from 'antd/lib/tree-select';
import Checkbox from 'antd/lib/checkbox';
import Radio from 'antd/lib/radio';
import Switch from 'antd/lib/switch';
import DatePicker from 'antd/lib/date-picker';
import TimePicker from 'antd/lib/time-picker';
import Cascader from 'antd/lib/cascader';

import 'antd/lib/input-number/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/tree-select/style/css';
import 'antd/lib/checkbox/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/switch/style/css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/time-picker/style/css';
import 'antd/lib/cascader/style/css';

// input number textarea password mobile email select select-tree checkbox radio switch date time date-time cascader
/*
 * item 大多是 FormItemLayout 所需参数 及 表单元素所需参数

 type: 'input',
 field: 'loginName',
 label: '登录名',
 labelSpaceCount: 3,
 width: '25%',
 placeholder: '请输入登录名',
 decorator: {
 rules: [
 {required: false, message: '请输入用户名'},
 ],
 },
 elementProps: {} 元素的一些props，具体参考antd
 *
 * */


/**
 * 类似 input 元素
 * @param type
 * @returns {boolean}
 */
function isInputLikeElement(type) {
    return [
        'input',
        'input-clear',
        'number',
        'textarea',
        'password',
        'mobile',
        'email',
    ].includes(type);
}

/**
 * 获取元素placeholder
 * @param item
 * @returns {*}
 */
export function getPlaceholder(item) {
    const {type = 'input', label = '', placeholder, elementProps = {}} = item;

    if (elementProps.placeholder) return elementProps.placeholder;

    if (placeholder) return placeholder;

    return isInputLikeElement(type) ? `请输入${label}` : `请选择${label}`;
}

/**
 * 获取表单元素
 * @param item {type, placeholder, elementProps, component}
 * @param form
 * @returns {*}
 */
export function getFormElement(item) {
    const {type = 'input', elementProps = {}, component} = item;
    const width = elementProps.width ? elementProps.width : '100%';
    const elementCommonStyle = {width};

    elementProps.style = elementProps.style ? {...elementCommonStyle, ...elementProps.style} : elementCommonStyle;
    elementProps.placeholder = getPlaceholder(item);

    // 如果 component 存在，说明是自定义组件
    if (component) return component;

    if (isInputLikeElement(type)) {
        if (type === 'input-clear') return <InputClear {...elementProps}/>;
        if (type === 'number') return <InputNumber {...elementProps}/>;
        return <Input type={type} {...elementProps}/>;
    }

    if (type === 'select') {
        const {options = []} = elementProps;
        return (
            <Select {...elementProps}>
                {
                    options.map(opt => <Select.Option key={opt.value} {...opt}>{opt.label}</Select.Option>)
                }
            </Select>
        );
    }

    if (type === 'select-tree') return <TreeSelect {...elementProps} treeData={elementProps.options}/>;

    if (type === 'checkbox') return <Checkbox {...elementProps}>{elementProps.label}</Checkbox>;

    if (type === 'checkbox-group') return <Checkbox.Group {...elementProps}/>;

    if (type === 'radio') return <Radio {...elementProps}>{elementProps.label}</Radio>;

    if (type === 'radio-group') return <Radio.Group {...elementProps}/>;

    if (type === 'switch') return <Switch {...elementProps} style={{...elementProps.style, width: 'auto'}}/>;

    if (type === 'date') return <DatePicker {...elementProps}/>;

    if (type === 'date-range') return <DatePicker.RangePicker {...elementProps}/>;

    if (type === 'month') return <DatePicker.MonthPicker {...elementProps}/>;

    if (type === 'time') return <TimePicker {...elementProps}/>;

    if (type === 'cascader') return <Cascader {...elementProps}/>;

    throw new Error(`no such type: ${type}`);
}

export function getFormItem(item, form) {
    const {getFieldDecorator} = form;
    const {field, decorator} = item;
    return (
        <FormItemLayout key={item.field} {...item}>
            {getFieldDecorator(field, decorator)(getFormElement(item))}
        </FormItemLayout>
    );
}
