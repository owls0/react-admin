import React, {Component} from 'react';
import {Table, Icon, Tooltip, Modal, Form, Row, Col} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import localMenus from '../../menus';
import {convertToTree} from "@/library/utils/tree-utils";
import {ToolBar, Operator, FormElement} from '@/library/antd';
import './style.less';

@config({
    path: '/menu-permission',
    title: {local: 'menus', text: '菜单&权限'},
    ajax: true,
})
@Form.create()
export default class index extends Component {
    state = {
        menus: [],
        visible: false,
        record: {},
    };

    columns = [
        // key 与parentKey自动生成了，不需要展示和编辑
        // {title: 'key', dataIndex: 'key', key: 'key'},
        // {title: 'parentKey', dataIndex: 'parentKey', key: 'parentKey'},
        {
            title: '名称', dataIndex: 'text', key: 'text', width: 160,
            props: {
                type: 'input',
                placeholder: '请输入名称',
                decorator: {
                    rules: [{required: true, message: '请输入名称！'}],
                },
            },
        },
        {title: '图标', dataIndex: 'icon', key: 'icon', width: 60, render: value => <Icon type={value}/>},
        {title: 'path', dataIndex: 'path', key: 'path', width: 100},
        {title: 'url', dataIndex: 'url', key: 'url'},
        {title: 'target', dataIndex: 'target', key: 'target', width: 60},
        {title: '国际化', dataIndex: 'local', key: 'local', width: 60},
        {
            title: '类型', dataIndex: 'type', key: 'type', width: 60,
            render: value => {
                if (value === '1') return '菜单';
                if (value === '2') return '功能';
                // 默认都为菜单
                return '菜单';
            }
        },
        {title: '功能编码', dataIndex: 'code', key: 'code', width: 100},
        {title: '排序', dataIndex: 'order', key: 'order', width: 60},
        {
            title: '操作', dataIndex: 'operator', key: 'operator', width: 150,
            render: (value, record) => {
                const label = (label, icon) => <Tooltip placement="bottom" title={label}><Icon style={{fontSize: 16}} type={icon}/></Tooltip>;

                const items = [
                    {
                        label: label('编辑', 'form'),
                        onClick: () => this.handleEditNode(record),
                    },
                    {
                        label: label('删除', 'delete'),
                        color: 'red',
                        confirm: {
                            title: '您请确定要删除此节点及其子节点吗？',
                            onConfirm: () => this.handleDeleteNode(record),
                        }
                    },
                    {
                        label: label('添加子菜单', 'folder-add'),
                        onClick: () => this.handleAddSubMenu(record),
                    },
                    {
                        label: label('添加子功能', 'file-add'),
                        onClick: () => this.handleAddSubFunction(record),
                    },
                ];
                return <Operator items={items}/>
            },
        },
    ];

    componentDidMount() {
        this.fetchMenus();
    }

    fetchMenus() {
        localMenus().then(menus => {
            // 菜单根据order 排序
            const orderedData = [...menus].sort((a, b) => {
                const aOrder = a.order || 0;
                const bOrder = b.order || 0;

                // 如果order都不存在，根据 text 排序
                if (!aOrder && !bOrder) {
                    return a.text > b.text ? 1 : -1;
                }

                return bOrder - aOrder;
            });

            const menuTreeData = convertToTree(orderedData);

            this.setState({menus: menuTreeData});
        });
        /*
        // 获取所有的菜单，不区分用户
        this.setState({loading: true});
        this.props.ajax
            .get('/menus')
            .then(res => {
                this.setState({menus: res});
            })
            .finally(() => {
                this.setState({loading: false});
            });
        */
    }

    handleAddTopMenu = () => {
        this.props.form.resetFields();
        this.setState({visible: true});
    };

    handleEditNode = (record) => {
        const {resetFields, setFieldsValue} = this.props.form;

        resetFields();
        const {
            text,
            icon,
            path,
            url,
            target,
            local,
            type = '1',
            code,
            order,
        } = record;

        setTimeout(() => {
            setFieldsValue({
                text,
                icon,
                path,
                url,
                target,
                local,
                type,
                code,
                order,
            })
        });
        this.setState({visible: true, record});
    };

    handleAddSubMenu = (record) => {
        this.props.form.resetFields();
        this.setState({visible: true, record});
    };

    handleAddSubFunction = (record) => {
        const {resetFields, setFieldsValue} = this.props.form;

        resetFields();
        setFieldsValue({type: '2'});

        this.setState({visible: true, record});
    };

    handleDeleteNode = (record) => {
        console.log(record);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {
            menus,
            visible,
        } = this.state;

        const {form} = this.props;

        const labelWidth = 70;

        return (
            <PageContent styleName="root">
                <ToolBar items={[{type: 'primary', text: '添加顶级', onClick: this.handleAddTopMenu}]}/>
                <Table
                    columns={this.columns}
                    dataSource={menus}
                />
                <Modal
                    id="menu-modal"
                    title="菜单&权限"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={() => this.setState({visible: false})}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={12}>
                                <FormElement
                                    form={form}
                                    label="名称"
                                    labelWidth={labelWidth}
                                    type="input"
                                    field="text"
                                    placeholder="请输入名称"
                                    decorator={{
                                        rules: [
                                            {required: true, message: '请输入名称！'},
                                        ],
                                    }}
                                />
                            </Col>
                            <Col span={12}>
                                <FormElement
                                    form={form}
                                    label="图标"
                                    labelWidth={labelWidth}
                                    type="input"
                                    field="icon"
                                    placeholder="请输入图标"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormElement
                                    form={form}
                                    label="类型"
                                    labelWidth={labelWidth}
                                    type="select"
                                    options={[
                                        {value: '1', label: '菜单'},
                                        {value: '2', label: '功能'},
                                    ]}
                                    field="type"
                                    placeholder="请选择类型"
                                    decorator={{initialValue: '1'}}
                                    getPopupContainer={() => document.querySelector('.ant-modal-wrap')}
                                />
                            </Col>
                            <Col span={12}>
                                <FormElement
                                    disabled={form.getFieldValue('type') !== '2'}
                                    form={form}
                                    label="编码"
                                    labelWidth={labelWidth}
                                    type="input"
                                    field="code"
                                    placeholder="请输入功能编码"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormElement
                                    form={form}
                                    label="国际化"
                                    labelWidth={labelWidth}
                                    type="input"
                                    field="local"
                                    placeholder="请输入国际化"
                                />
                            </Col>
                            <Col span={12}>
                                <FormElement
                                    form={form}
                                    label="排序"
                                    labelWidth={labelWidth}
                                    type="number"
                                    field="order"
                                    placeholder="请输入排序"
                                    min={0}
                                    step={1}
                                />
                            </Col>
                        </Row>
                        <FormElement
                            disabled={form.getFieldValue('type') === '2'}
                            form={form}
                            label="path"
                            labelWidth={labelWidth}
                            type="input"
                            field="path"
                            placeholder="请输入path"
                        />
                        <FormElement
                            disabled={form.getFieldValue('type') === '2'}
                            form={form}
                            label="url"
                            labelWidth={labelWidth}
                            type="input"
                            field="url"
                            placeholder="请输入url"
                        />
                        <FormElement
                            disabled={form.getFieldValue('type') === '2'}
                            form={form}
                            label="target"
                            labelWidth={labelWidth}
                            type="input"
                            field="target"
                            placeholder="请输入target"
                        />
                    </Form>
                </Modal>
            </PageContent>
        );
    }
}

