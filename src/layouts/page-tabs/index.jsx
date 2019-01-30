import React, {Component} from 'react';
import {Tabs} from 'antd';
import {FontIcon} from "@/library/antd";
import config from '@/commons/config-hoc';
import './style.less';

const TabPane = Tabs.TabPane;

@config({
    router: true,
    connect(state) {
        return {
            dataSource: state.system.tabs,
        };
    },
})
export default class PageTabs extends Component {
    handleChange = (path) => {
        this.props.history.push(path);
    };


    handleEdit = (targetKey, action) => {
        this[action](targetKey);
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
        const currentTab = dataSource.find(item => this.isCurrentTab(item.path));

        return (
            <div styleName="root">
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
                                tab={title}
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
