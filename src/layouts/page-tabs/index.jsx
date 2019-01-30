import React, {Component} from 'react';
import {Tabs, Menu, Icon} from 'antd';
import {FontIcon} from "@/library/antd";
import config from '@/commons/config-hoc';
import ContextMenu from './ContextMenu';
import './style.less';

const TabPane = Tabs.TabPane;

@config({
    router: true,
    connect(state) {
        return {
            dataSource: state.system.tabs,
            local: state.system.i18n.tabs,
        };
    },
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

    handleEdit = (targetKey, action) => {
        this[action](targetKey);
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
        const disabledRefresh = !this.isCurrentTab(tab.path);
        const disabledClose = dataSource.length === 1;
        const tabIndex = dataSource.findIndex(item => item.path === tab.path);
        const disabledCloseLeft = tabIndex === 0;
        const disabledCloseRight = tabIndex === dataSource.length - 1;

        const handleMenuClick = ({key}) => {
            console.log(key);
        };

        return (
            <Menu
                selectable={false}
                onClick={handleMenuClick}
            >
                <Menu.Item key="refresh" disabled={disabledRefresh}>
                    <Icon type="sync"/> {local.refresh}
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

    isCurrentTab = (path) => {
        const {pathname, search} = window.location;
        const currentPath = `${pathname}${search}`;

        return path === currentPath;
    };

    remove = (targetKey) => {
        const {dataSource, action: {system}} = this.props;

        // 关闭当前标签
        if (this.isCurrentTab(targetKey)) {
            const currentIndex = dataSource.findIndex(item => item.path === targetKey);
            let nextIndex = 0;

            if (currentIndex === dataSource.length - 1) {
                // 当前标签已经是最后一个了，删除后选中上一个
                nextIndex = currentIndex - 1;
            } else {
                // 当前tab标签后面还有标签，删除后选中下一个标签
                nextIndex = currentIndex + 1;
            }

            const nextPath = dataSource[nextIndex]?.path;

            this.props.history.push(nextPath);
        }

        const tabs = dataSource.filter(item => item.path !== targetKey);

        system.setTabs(tabs);
    };

    render() {
        const {dataSource} = this.props;
        const {contextVisible, contextEvent, contextMenu} = this.state;
        const currentTab = dataSource.find(item => this.isCurrentTab(item.path));

        return (
            <div styleName="root">
                <ContextMenu
                    visible={contextVisible}
                    onChange={(contextVisible) => this.setState({contextVisible})}
                    event={contextEvent}
                    content={contextMenu}
                />
                <Tabs
                    type="editable-card"
                    hideAdd
                    onChange={this.handleChange}
                    activeKey={currentTab?.path}
                    onEdit={this.handleEdit}
                >
                    {dataSource.map(pane => {
                        let {text, path, icon} = pane;
                        let title = text.local ? text.text : text;

                        if (text.icon) icon = text.icon;

                        if (icon) title = <span><FontIcon type={icon}/>{title}</span>;

                        return (
                            <TabPane
                                tab={(
                                    <span
                                        style={{display: 'inline-block', height: '100%'}}
                                        onContextMenu={(e) => this.handleRightClick(e, pane)}
                                    >
                                        {title}
                                    </span>
                                )}
                                key={path}
                                closable={dataSource.length > 1}
                            />
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}
