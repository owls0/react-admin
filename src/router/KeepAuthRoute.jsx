import React from 'react';
import {Route} from 'react-router-dom';
import {isAuthenticated} from '@/commons';
import Error401 from '@/pages/error/Error401';
import config from '@/commons/config-hoc';

/**
 * 与KeepPage配合使用的路由，进行页面的收集
 */
@config({
    connect(state) {
        return {
            tabs: state.system.tabs,
            title: state.page.title,
            selectedMenu: state.menu.selectedMenu,
            keepPage: state.system.keepPage,
            tabsShow: state.settings.tabsShow,
        }
    },
})
export default class KeepAuthRoute extends React.Component {

    render() {
        const {
            component: Component,
            noAuth,
            tabs,
            title,
            selectedMenu,
            keepPage,
            tabsShow,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    const {history} = props;
                    const {action: {system}} = this.props;
                    let component = <Error401/>;
                    if (noAuth || isAuthenticated()) component = <Component {...props}/>;

                    // 如果页面现实tabs，或者启用了keep page alive 需要对tabs进行操作
                    if (tabsShow || keepPage) {
                        const prevActiveIndex = tabs.findIndex(item => item.active);
                        const prevActiveTab = tabs.find(item => item.active);

                        // 记录上一个页面的滚动条位置
                        if (prevActiveTab) {
                            prevActiveTab.scrollTop = document.body.scrollTop = document.documentElement.scrollTop;
                        }

                        // 关闭一个标签
                        const closeTab = tabs.find(item => item.isClose);
                        if (closeTab) {
                            const closeTabIndex = tabs.findIndex(item => item.isClose);
                            // 关闭的是当前标签
                            if (closeTab.active) {
                                const removeTabPath = closeTab.path;
                                const currentIndex = tabs.findIndex(item => item.path === removeTabPath);
                                let nextActiveIndex = 0;

                                if (currentIndex === tabs.length - 1) {
                                    // 当前标签已经是最后一个了，删除后选中上一个
                                    nextActiveIndex = currentIndex - 1;
                                } else {
                                    // 当前tab标签后面还有标签，删除后选中下一个标签
                                    nextActiveIndex = currentIndex + 1;
                                }

                                const nextPath = tabs[nextActiveIndex]?.path;

                                setTimeout(() => {
                                    tabs.splice(closeTabIndex, 1);
                                    history.push(nextPath);
                                    system.setTabs([...tabs]);
                                })
                            } else {
                                tabs.splice(closeTabIndex, 1);
                                setTimeout(() => {
                                    system.setTabs([...tabs]);
                                });
                            }

                            return null;
                        }

                        // 关闭其他标签
                        const closeOthersTab = tabs.find(item => item.isCloseOthers);
                        if (closeOthersTab) {
                            Reflect.deleteProperty(closeOthersTab, 'isCloseOthers');

                            setTimeout(() => {
                                if (!closeOthersTab.active) history.push(closeOthersTab.path);

                                system.setTabs([closeOthersTab]);
                            });

                            return null;
                        }

                        // 关闭所有标签
                        const closeAllTab = tabs.find(item => item.isCloseAll);
                        if (closeAllTab) {
                            setTimeout(() => {
                                // 全部删除，跳转首页
                                history.push('/');

                                system.setTabs([]);
                            });

                            return null;
                        }

                        // 关闭左侧
                        const closeLeftTab = tabs.find(item => item.isCloseLeft);
                        if (closeLeftTab) {
                            const closeLeftTabIndex = tabs.findIndex(item => item.isCloseLeft);

                            Reflect.deleteProperty(closeLeftTab, 'isCloseLeft');

                            setTimeout(() => {
                                const newTabs = tabs.slice(closeLeftTabIndex);

                                if (!closeLeftTab.active) history.push(closeLeftTab.path);
                                system.setTabs(newTabs);
                            });

                            return null
                        }

                        // 关闭右侧
                        const closeRightTab = tabs.find(item => item.isCloseRight);
                        if (closeRightTab) {
                            const closeRightIndex = tabs.findIndex(item => item.isCloseRight);

                            Reflect.deleteProperty(closeRightTab, 'isCloseRight');

                            setTimeout(() => {
                                const newTabs = tabs.slice(0, closeRightIndex + 1);

                                if (!closeRightTab.active) history.push(closeRightTab.path);
                                system.setTabs(newTabs);
                            });

                            return null;
                        }

                        // 清空选中状态
                        if (prevActiveTab) prevActiveTab.active = false;

                        const {pathname, search} = props.location;
                        const currentPath = `${pathname}${search}`;

                        // 获取当前地址对应的标签页
                        const currentTab = tabs.find(item => item.path === currentPath);

                        const TabComponent = keepPage ? <Route {...rest} component={Component}/> : null;
                        // 当前地址对应的标签存在
                        if (currentTab) {
                            // 选中当前地址对应的标签
                            currentTab.active = true;

                            // 先让 KeepPage.jsx 进行一次 无component渲染，然后再次渲染component达到刷新的目的
                            if (!currentTab.component) {
                                setTimeout(() => {
                                    const tb = tabs.find(item => item.path === currentTab.path);
                                    tb.component = TabComponent;
                                    system.setTabs([...tabs]);
                                })
                            }
                        }

                        // 当前地址对应的tab页不存在，进行添加
                        if (!currentTab) {
                            const icon = selectedMenu?.icon;
                            const newAddTab = {
                                path: currentPath,
                                component: TabComponent,
                                text: title,
                                icon,
                                active: true,
                            };

                            let newTabs;
                            // 用户新开tab页之后，往往比较关心上一个tab，新开的tab页面放在当前tab页面之后
                            if (prevActiveIndex !== -1) {
                                newTabs = [...tabs];
                                newTabs.splice(prevActiveIndex + 1, 0, newAddTab);
                            }

                            if (!newTabs) newTabs = [...tabs, newAddTab];

                            // 不使用setTimeout 会报出 Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
                            setTimeout(() => {
                                system.setTabs(newTabs);
                            })
                        }
                    }

                    // 由KeepPage进行页面渲染和切换，这里不需要进行页面渲染
                    if (keepPage) return null;

                    // 页面滚动条滚动到顶部
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    return component;
                }}
            />
        );
    }
}
