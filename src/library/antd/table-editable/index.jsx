import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/form/style/css';
import uuid from 'uuid/v4';
import {FormUtil} from '../index';
import classnames from 'classnames';

@Form.create()
export default class FieldsTable extends Component {
    static propTypes = {
        formRef: PropTypes.func,
        value: PropTypes.array,
        onChange: PropTypes.func,
        columns: PropTypes.array,
        rowKey: PropTypes.string.isRequired,
        showAddButton: PropTypes.bool,
    };

    static defaultProps = {
        rowKey: 'id',
        value: [],
        showAddButton: true,
        onChange: () => true,
    };

    state = {};

    componentWillMount() {
        const {formRef, form} = this.props;
        if (formRef) formRef(form);
    }

    renderColumns = (text, record, column) => {
        let {dataIndex, props} = column;
        if (!props) return text;

        const {editable = true, showEdit = true} = record;

        if (editable === false || showEdit === false) return text;

        if (editable && editable.length && editable.indexOf(dataIndex) === -1) return text;

        if (props.dataIndex) dataIndex = props.dataIndex;

        const {value, onChange, form, rowKey} = this.props;
        const id = record[rowKey];

        props.field = `${dataIndex}-${id}`;
        props.colon = false;
        props.label = props.label === void 0 ? ' ' : props.label;
        props.labelWidth = props.labelWidth === void 0 ? 20 : props.labelWidth ;

        if (!record.__form_fields) record.__form_fields = new Set();
        record.__form_fields.add(props.field);

        if (!record.__validate) {
            record.__validate = (fields, callback) => {
                if (!callback) {
                    callback = fields;
                    fields = void 0;
                }

                let validateFields = Array.from(record.__form_fields);
                if (fields) {
                    validateFields = fields.map(item => `${item}-${id}`)
                }


                const {form} = this.props;

                form.validateFieldsAndScroll(validateFields, callback);
            };
        }

        const decorator = {};
        decorator.onChange = (e) => {
            const {getValue = (e) => e.target ? e.target.value : e} = props;
            const val = getValue(e);

            const currentRecord = value.find(item => item[rowKey] === record[rowKey]);

            currentRecord[dataIndex] = val;

            if (!currentRecord.__changed) currentRecord.__changed = new Set();
            currentRecord.__changed.add(dataIndex);

            onChange(value);
        };

        if (text) {
            decorator.initialValue = text;
        }

        return FormUtil.getFormItem({...props, decorator: {...props.decorator, ...decorator}}, form);
    };

    handleAddNewRow = () => {
        const {value, onChange, columns, rowKey} = this.props;
        const newRecord = {__add: true};

        if (columns && columns.length) {
            columns.forEach(({dataIndex}) => {
                if (dataIndex) {
                    newRecord[dataIndex] = void 0;
                }
            })
        }
        newRecord[rowKey] = uuid();

        onChange([...value, {...newRecord}]);
    };

    render() {
        let {
            value,
            onChange,
            style,
            formRef,
            className,
            rowKey,
            showAddButton,
            footer,
            ...others
        } = this.props;

        const dataSource = [...value];

        const columns = this.props.columns.map(item => {
            const {render} = item;
            return {
                ...item,
                render: (text, record) => {
                    if (render) text = render(text, record);
                    return this.renderColumns(text, record, item);
                },
            }
        });

        const classNames = classnames('sx-table-editable', className);

        let ft;

        if (footer) ft = footer;

        if (showAddButton) ft = () => (
            <Button
                icon="plus"
                style={{width: '100%', height: '80px', lineHeight: '80px'}}
                type="dashed"
                onClick={this.handleAddNewRow}
            >添加</Button>
        );

        return (
            <Table
                className={classNames}
                bordered
                pagination={false}
                {...others}
                columns={columns}
                dataSource={dataSource}
                rowKey={rowKey}
                footer={ft}
            />
        );
    }
}
