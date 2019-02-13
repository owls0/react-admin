import React, {Component} from 'react';
import {Modal, Form, Spin, Table, Icon, Row, Col} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';
import localMenus from "@/menus";
import {convertToTree, getGenerationsByKey} from "@/library/utils/tree-utils";

@config({
    ajax: true,
})
@Form.create()
export default class RoleEdit extends Component {
    state = {
        loading: false,
        data: {},
        selectedRowKeys: [],
        halfSelectedRowKeys: [],
        menus: [],
        menuTreeData: [],
    };

    componentDidMount() {
        this.fetchMenus();
    }

    componentDidUpdate(prevProps) {
        const {roleId: prevRoleId} = prevProps;
        const {roleId, form: {resetFields}} = this.props;
        if (prevRoleId !== roleId) {
            resetFields();

            if (!roleId) {
                // 添加操作
                this.setState({data: {}, selectedRowKeys: []});

            } else {
                // 修改操作
                // TODO 根据id获取数据
                this.setState({loading: true});
                setTimeout(() => {
                    const data = {
                        id: roleId,
                        name: `角色名称${roleId}`,
                        description: `角色描述${roleId}`,
                        permissions: ['ajax', 'user', 'component', '/example/antd/async-select'],
                    };

                    const selectedRowKeys = data.permissions;

                    // TODO 如果不是所有的子级都选中，删除父级的key，父级为半选状态

                    this.setState({data, selectedRowKeys});

                    this.setSelectedRowKeys(selectedRowKeys);

                    this.setState({loading: false});
                }, 500);
            }
        }
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

            this.setState({menus: orderedData, menuTreeData});
        });
        /*
        // TODO 获取所有的菜单，不区分用户
        this.setState({loading: true});
        this.props.ajax
            .get('/menus')
            .then(res => {
                this.setState({menus: res});
            })
            .finally(() => this.setState({loading: false}));
        */
    }

    handleOk = () => {
        const {selectedRowKeys, halfSelectedRowKeys} = this.state;
        const {onOk, form: {resetFields, validateFieldsAndScroll}} = this.props;

        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const keys = selectedRowKeys.concat(halfSelectedRowKeys);
                const params = {...values, keys};
                const {id} = values;

                console.log(params);

                // TODO ajax 提交数据

                // id存在未修改，不存在未添加
                const ajax = id ? this.props.ajax.put : this.props.ajax.post;

                this.setState({loading: true});
                ajax('/roles', params)
                    .then(() => {
                        if (onOk) onOk();
                        resetFields();
                    })
                    .finally(() => this.setState({loading: false}));
            }
        });
    };

    handleCancel = () => {
        const {onCancel} = this.props;
        if (onCancel) onCancel();
    };

    setSelectedRowKeys = (srk) => {
        let selectedRowKeys = [...srk];
        let halfSelectedRowKeys = [...this.state.halfSelectedRowKeys];

        const {menuTreeData, menus} = this.state;

        const loop = (dataSource) => {
            dataSource.forEach(item => {
                const {children, key} = item;
                if (children && children.length) {
                    const unSelected = children.filter(it => !selectedRowKeys.find(sk => sk === it.key));
                    if (unSelected.length) {
                        if (!halfSelectedRowKeys.includes(key) && unSelected.length !== children.length) {
                            halfSelectedRowKeys.push(key);
                            halfSelectedRowKeys = halfSelectedRowKeys.concat(item.parentKeys);
                        }
                    } else {
                        if (halfSelectedRowKeys.includes(key)) halfSelectedRowKeys = halfSelectedRowKeys.filter(k => k !== key);
                        if (!selectedRowKeys.includes(key)) selectedRowKeys.push(key);
                    }
                    loop(children);
                }
            });
        };

        loop(menuTreeData);

        selectedRowKeys = selectedRowKeys.filter(item => !halfSelectedRowKeys.includes(item));

        menus.forEach(item => {
            const {key} = item;
            // 包含了自身和所有的后代
            const nodes = getGenerationsByKey(menus, key);
            if (nodes && nodes.length > 1) {
                const keys = nodes.filter(it => it.key !== key).map(it => it.key);
                const unSelected = keys.filter(it => !selectedRowKeys.includes(it));
                if (!unSelected || !unSelected.length) {
                    if (!selectedRowKeys.includes(key)) selectedRowKeys.push(key);
                    if (halfSelectedRowKeys.includes(key)) halfSelectedRowKeys = halfSelectedRowKeys = halfSelectedRowKeys.filter(k => k !== key);
                }
            }
        });

        this.setState({halfSelectedRowKeys, selectedRowKeys});
    };

    render() {
        const {visible, form} = this.props;
        const {loading, data, menuTreeData, selectedRowKeys} = this.state;
        const labelWidth = 100;
        return (
            <Modal
                width="70%"
                confirmLoading={loading}
                visible={visible}
                title="角色"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Spin spinning={loading}>
                    <Form>
                        <FormElement form={form} type="hidden" field="id" decorator={{initialValue: data.id}}/>
                        <Row>
                            <Col span={10}>
                                <FormElement
                                    form={form}
                                    label="角色名称"
                                    labelWidth={labelWidth}
                                    type="input"
                                    field="name"
                                    placeholder="请输入角色名称"
                                    decorator={{
                                        initialValue: data.name,
                                        rules: [
                                            {required: true, message: '请输入角色名称！'}
                                        ],
                                    }}
                                />
                            </Col>
                            <Col span={14}>
                                <FormElement
                                    form={form}
                                    label="角色描述"
                                    labelWidth={labelWidth}
                                    type="textarea"
                                    field="description"
                                    placeholder="请输入角色描述"
                                    rows={1}
                                    decorator={{
                                        initialValue: data.description,
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form>
                    <Table
                        size="small"
                        defaultExpandAllRows
                        columns={[
                            {
                                title: '名称', dataIndex: 'text', key: 'text',
                                render: (value, record) => {
                                    const {icon} = record;

                                    if (icon) return <span><Icon type={icon}/> {value}</span>;

                                    return value;
                                }
                            },
                            {
                                title: '类型', dataIndex: 'type', key: 'type',
                                render: value => {
                                    if (value === '1') return '菜单';
                                    if (value === '2') return '功能';
                                    // 默认都为菜单
                                    return '菜单';
                                }
                            },
                            {title: 'path', dataIndex: 'path', key: 'path'},
                            {title: 'url', dataIndex: 'url', key: 'url'},
                            {title: 'target', dataIndex: 'target', key: 'target'},
                        ]}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: (selectedRowKeys) => {
                                this.setSelectedRowKeys(selectedRowKeys);
                            },
                            getCheckboxProps: (record) => {
                                const {halfSelectedRowKeys, selectedRowKeys} = this.state;
                                const {key} = record;

                                // 半选
                                if (halfSelectedRowKeys.includes(key)) return {checked: false, indeterminate: true};

                                // 全选
                                if (selectedRowKeys.includes(key)) return {checked: true, indeterminate: false};

                                return {};
                            },
                            onSelect: (record, selected, selectedRows) => {
                                const {key} = record;
                                let selectedRowKeys = [...this.state.selectedRowKeys];
                                // 选中、反选所有的子节点
                                const nodes = getGenerationsByKey(this.state.menus, key);
                                if (nodes && nodes.length) {
                                    nodes.forEach(item => {
                                        const {key} = item;
                                        if (selected) {
                                            if (!selectedRowKeys.includes(key)) selectedRowKeys.push(key);
                                        } else {
                                            if (selectedRowKeys.includes(key)) selectedRowKeys = selectedRowKeys.filter(it => it !== key);
                                        }
                                        this.setSelectedRowKeys(selectedRowKeys);
                                    })
                                }
                            },
                        }}
                        dataSource={menuTreeData}
                        pagination={false}
                    />
                </Spin>
            </Modal>
        );
    }
}
