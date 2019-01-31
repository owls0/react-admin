import React, {Component} from 'react';
import {Tabs, Menu, Icon} from 'antd';
import {FontIcon} from "@/library/antd";
import config from '@/commons/config-hoc';
import ContextMenu from './ContextMenu';
import DraggableTabs from './DraggableTabs';
import './style.less';

const TabPane = Tabs.TabPane;

@config({
    router: true,
    connect: state => ({
        dataSource: state.system.tabs,
        local: state.system.i18n.tabs,
    }),
})
export default class PageTabs extends Component {
    state = {
        contextVisible: false,
        contextEvent: null,
        contextMenu: '',
    };

    handleChange = (path) => {
        this.props.history.push(path);
    };

    handleEdit = (targetPath, action) => {
        if (action === 'remove') this.props.action.system.closeTab(targetPath);
    };

    handleRightClick = (e, tab) => {
        e.preventDefault();

        const contextMenu = this.renderContextMenu(tab);

        this.setState({
            contextVisible: true,
            contextEvent: {clientX: e.clientX, clientY: e.clientY},
            contextMenu,
        });
    };

    renderContextMenu = (tab) => {
        const {dataSource, local} = this.props;
        const disabledClose = dataSource.length === 1;
        const tabIndex = dataSource.findIndex(item => item.path === tab.path);
        const disabledCloseLeft = tabIndex === 0;
        const disabledCloseRight = tabIndex === dataSource.length - 1;

        return (
            <Menu
                selectable={false}
                onClick={({key: action}) => this.handleMenuClick(action, tab.path)}
            >
                <Menu.Item key="refresh">
                    <Icon type="sync"/> {local.refresh}
                </Menu.Item>
                <Menu.Item key="refreshAll">
                    <Icon type="sync"/> {local.refreshAll}
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="close" disabled={disabledClose}>
                    <Icon type="close"/> {local.close}
                </Menu.Item>
                <Menu.Item key="closeOthers" disabled={disabledClose}>
                    <Icon type="close-circle"/> {local.closeOthers}
                </Menu.Item>
                <Menu.Item key="closeAll" disabled={disabledClose}>
                    <Icon type="close-square"/> {local.closeAll}
                </Menu.Item>
                <Menu.Item key="closeLeft" disabled={disabledCloseLeft}>
                    <Icon type="vertical-left"/> {local.closeLeft}
                </Menu.Item>
                <Menu.Item key="closeRight" disabled={disabledCloseRight}>
                    <Icon type="vertical-right"/> {local.closeRight}
                </Menu.Item>
            </Menu>
        );
    };

    handleMenuClick = (action, targetPath) => {
        const {action: {system}} = this.props;

        if (action === 'refresh') system.refreshTab(targetPath);
        if (action === 'refreshAll') system.refreshAllTab();
        if (action === 'close') system.closeTab(targetPath);
        if (action === 'closeOthers') system.closeOtherTabs(targetPath);
        if (action === 'closeAll') system.closeAllTabs();
        if (action === 'closeLeft') system.closeLeftTabs(targetPath);
        if (action === 'closeRight') system.closeRightTabs(targetPath);
    };

    render() {
        const {dataSource} = this.props;
        const {contextVisible, contextEvent, contextMenu} = this.state;
        const currentTab = dataSource.find(item => item.active);

        return (
            <div styleName="root">
                <ContextMenu
                    visible={contextVisible}
                    onChange={(contextVisible) => this.setState({contextVisible})}
                    event={contextEvent}
                    content={contextMenu}
                />
                <DraggableTabs
                    type="editable-card"
                    hideAdd
                    onChange={this.handleChange}
                    activeKey={currentTab?.path}
                    onEdit={this.handleEdit}
                >
                    {dataSource.map(pane => {
                        let {text: tabTitle, path, icon} = pane;

                        if (typeof tabTitle === 'object' && tabTitle.text) tabTitle = tabTitle.text;

                        if (tabTitle.icon) icon = tabTitle.icon;

                        if (icon) tabTitle = <span><FontIcon type={icon}/>{tabTitle}</span>;

                        return (
                            <TabPane
                                tab={(
                                    <span
                                        style={{display: 'inline-block', height: '100%'}}
                                        onContextMenu={(e) => this.handleRightClick(e, pane)}
                                    >
                                        {tabTitle}
                                    </span>
                                )}
                                key={path}
                                closable={dataSource.length > 1}
                            />
                        );
                    })}
                </DraggableTabs>
            </div>
        );
    }
}
