import React, {Component} from 'react';
import {Menu} from 'antd';
import {FontIcon, DraggableTabsBar} from "@/library/antd";
import config from '@/commons/config-hoc';
import ContextMenu from './ContextMenu';
import './style.less';

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

    handleClose = (item) => {
        const {path: targetPath} = item;
        this.props.action.system.closeTab(targetPath);
    };

    handleSortEnd = ({oldIndex, newIndex}) => {
        const dataSource = [...this.props.dataSource];

        // 元素移动
        dataSource.splice(newIndex, 0, dataSource.splice(oldIndex, 1)[0]);

        this.props.action.system.setTabs(dataSource);
    };

    handleClick = (item) => {
        this.props.history.push(item.path);
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
        const disabledRefresh = !tab.component;
        const disabledClose = dataSource.length === 1;
        const tabIndex = dataSource.findIndex(item => item.path === tab.path);
        const disabledCloseLeft = tabIndex === 0;
        const disabledCloseRight = tabIndex === dataSource.length - 1;

        return (
            <Menu
                selectable={false}
                onClick={({key: action}) => this.handleMenuClick(action, tab.path)}
            >
                <Menu.Item key="refresh" disabled={disabledRefresh}>
                    <FontIcon type="sync"/> {local.refresh}
                </Menu.Item>
                {/*<Menu.Item key="refreshAll">*/}
                {/*<FontIcon type="sync"/> {local.refreshAll}*/}
                {/*</Menu.Item>*/}
                <Menu.Divider/>
                <Menu.Item key="close" disabled={disabledClose}>
                    <FontIcon type="close"/> {local.close}
                </Menu.Item>
                <Menu.Item key="closeOthers" disabled={disabledClose}>
                    <FontIcon type="close-circle"/> {local.closeOthers}
                </Menu.Item>
                <Menu.Item key="closeAll" disabled={disabledClose}>
                    <FontIcon type="close-square"/> {local.closeAll}
                </Menu.Item>
                <Menu.Item key="closeLeft" disabled={disabledCloseLeft}>
                    <FontIcon type="vertical-left"/> {local.closeLeft}
                </Menu.Item>
                <Menu.Item key="closeRight" disabled={disabledCloseRight}>
                    <FontIcon type="vertical-right"/> {local.closeRight}
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

        const tabsBarDataSource = dataSource.map(item => {
            let {text: tabTitle, path, icon} = item;
            let title = tabTitle;

            if (typeof tabTitle === 'object' && tabTitle.text) title = tabTitle.text;

            if (tabTitle.icon) icon = tabTitle.icon;

            if (icon) title = <span><FontIcon type={icon} style={{marginRight: 4}}/>{title}</span>;

            return {
                key: path,
                title,
                closable: true,
                ...item,
            }
        });

        return (
            <div styleName="root">
                <ContextMenu
                    visible={contextVisible}
                    onChange={(contextVisible) => this.setState({contextVisible})}
                    event={contextEvent}
                    content={contextMenu}
                />
                <DraggableTabsBar
                    dataSource={tabsBarDataSource}
                    itemWrapper={(itemJsx, item, wrapperClassName) => {
                        return (
                            <div
                                className={wrapperClassName}
                                onContextMenu={(e) => this.handleRightClick(e, item)}
                            >
                                {itemJsx}
                            </div>
                        );
                    }}
                    onSortEnd={this.handleSortEnd}
                    onClose={this.handleClose}
                    onClick={this.handleClick}
                    activeKey={currentTab?.path}
                />
            </div>
        );
    }
}
