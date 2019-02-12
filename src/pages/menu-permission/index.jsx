import React, {Component} from 'react';
import {Table, Icon, Tooltip} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import localMenus from '../../menus';
import {convertToTree} from "@/library/utils/tree-utils";
import {ToolBar, Operator} from '@/library/antd';
import './style.less';

@config({
    path: '/menu-permission',
    title: {local: 'menus', text: '菜单&权限'},
    ajax: true,
})
export default class index extends Component {
    state = {
        menus: [],
    };

    /*
    * key|是|需要唯一
parentKey|否|用于关联父级
path|是|菜单对应的路由地址
text|是|如果local对应的文案有效，将覆盖text，否则菜单默认使用text作为展示内容
icon|否|菜单图标配置
url|否|菜单对应会打开url对应的iframe页面，如果配置了url，path将无效
target|否|配合url使用，菜单将为a标签 `<a href={url} target={target}>{text}</a>`
local|否|国际化配置，系统在i18n.menu中获取对应的文案
order|否|菜单排序，数值越大越靠前显示
type|否|如果菜单数据中携带功能权限配置，type==='1' 为菜单，type==='2'为功能
code|否|功能码，如果是type==='2'，会用到此字段
    * */
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
        // {title: 'url', dataIndex: 'url', key: 'url'},
        // {title: 'target', dataIndex: 'target', key: 'target', width: 60},
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
                const items = [
                    {
                        label: <Tooltip placement="bottom" title="编辑"><Icon type="form"/></Tooltip>,
                        onClick: () => this.handleEditNode(record),
                    },
                    {
                        label: <Tooltip placement="bottom" title="删除"><Icon type="delete"/></Tooltip>,
                        color: 'red',
                        confirm: {
                            title: '您请确定要删除此节点及其子节点吗？',
                            onConfirm: () => this.handleDeleteNode(record),
                        }
                    },
                    {
                        label: <Tooltip placement="bottom" title="添加子菜单"><Icon type="folder-add"/></Tooltip>,
                        onClick: () => this.handleAddSubMenu(record),
                    },
                    {
                        label: <Tooltip placement="bottom" title="添加子功能"><Icon type="file-add"/></Tooltip>,
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
        // TODO 弹框添加
        console.log('添加顶级');
    };

    handleEditNode = (record) => {
        console.log(record);
    };

    handleAddSubMenu = (record) => {
        console.log(record);
    };

    handleAddSubFunction = (record) => {
        console.log(record);
    };

    handleDeleteNode = (record) => {
        console.log(record);
    };

    render() {
        const {menus} = this.state;

        return (
            <PageContent styleName="root">
                <ToolBar items={[{type: 'primary', text: '添加顶级', onClick: this.handleAddTopMenu}]}/>
                <Table
                    columns={this.columns}
                    dataSource={menus}
                />
            </PageContent>
        );
    }
}

