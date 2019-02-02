import React from 'react';
import {Route} from 'react-router-dom';
import {isAuthenticated} from '@/commons';
import Error401 from '@/pages/error/Error401';
import config from '@/commons/config-hoc';
import {keepAliveRoutes} from './routes';

/**
 * 与KeepPage配合使用的路由，进行页面的收集
 */
@config({
    pubSub: true,
    connect(state) {
        return {
            tabs: state.system.tabs,
            title: state.page.title,
            selectedMenu: state.menu.selectedMenu,
            keepPageSystem: state.system.keepPage,
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
            keepPageSystem,
            tabsShow,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    const configKeepAlive = keepAliveRoutes.find(item => item.path === rest.path)?.keepAlive;
                    const keepPage = configKeepAlive === void 0 ? keepPageSystem : configKeepAlive;
                    const {history} = props;
                    const {action: {system}} = this.props;
                    let component = (noAuth || isAuthenticated()) ? <Component {...props}/> : <Error401 {...props}/>;

                    // 如果页面现实tabs，或者启用了keep page alive 需要对tabs进行操作
                    if (tabsShow || keepPage) {
                        // 根据nextActive标记切换新的tab页
                        const nextActiveTab = tabs.find(item => item.nextActive);
                        if (nextActiveTab) {
                            nextActiveTab.nextActive = false;
                            setTimeout(() => {
                                history.push(nextActiveTab.path);
                            });
                            return keepPage ? null : component;
                        }

                        const {pathname, search} = props.location;
                        const currentPath = `${pathname}${search}`;

                        // 获取当前地址对应的标签页
                        const currentTab = tabs.find(item => item.path === currentPath);
                        const TabComponent = keepPage ? component : null;

                        // 切换tab页
                        if (currentTab && !currentTab.active) {
                            // 保存上一个tab页滚动调位置
                            const prevActiveTab = tabs.find(item => item.active);

                            // 记录上一个页面的滚动条位置
                            if (prevActiveTab) {
                                prevActiveTab.scrollTop = document.body.scrollTop = document.documentElement.scrollTop;
                            }

                            // 清空选中状态
                            if (prevActiveTab) {
                                prevActiveTab.active = false
                                this.props.emit('tab-hide', prevActiveTab.path);
                            }

                            currentTab.active = true;

                            this.props.emit('tab-show', currentTab.path);

                            setTimeout(() => {
                                system.setTabs([...tabs]);
                            });
                        }

                        // 先让 KeepPage.jsx 进行一次 无component渲染，然后再次渲染component达到刷新的目的
                        if (keepPage && currentTab && !currentTab.component) {
                            setTimeout(() => {
                                const tb = tabs.find(item => item.path === currentTab.path);
                                tb.component = TabComponent;
                                system.setTabs([...tabs]);
                            })
                        }

                        // 添加一个标签 当前地址对应的tab页不存在，进行添加
                        if (!currentTab) {
                            let prevActiveIndex = -1;
                            const prevActiveTab = tabs.find((item, index) => {
                                if (item.active) prevActiveIndex = index;

                                return item.active;
                            });

                            // 记录上一个页面的滚动条位置
                            if (prevActiveTab) {
                                prevActiveTab.scrollTop = document.body.scrollTop = document.documentElement.scrollTop;
                            }

                            // 清空选中状态 直接选中新添加的标签
                            if (prevActiveTab) prevActiveTab.active = false;
                            const newAddTab = {
                                path: currentPath,
                                component: TabComponent,
                                active: true,
                            };

                            // 用户新开tab页之后，往往比较关心上一个tab，新开的tab页面放在当前tab页面之后
                            if (prevActiveIndex !== -1) {
                                tabs.splice(prevActiveIndex + 1, 0, newAddTab);
                            } else {
                                tabs.push(newAddTab);
                            }

                            // 不使用setTimeout 会报出 Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
                            setTimeout(() => {
                                // 等待title selectedMenu更新完成了之后，才获取；
                                newAddTab.text = this.props.title;
                                newAddTab.icon = this.props.selectedMenu?.icon;
                                system.setTabs([...tabs]);
                            })
                        }
                    }

                    // 由KeepPage组件进行页面渲染和切换，这里不需要进行页面渲染
                    if (keepPage) return null;

                    // 页面滚动条滚动到顶部
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    return component;
                }}
            />
        );
    }
}
