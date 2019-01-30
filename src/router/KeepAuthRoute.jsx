import React from 'react';
import {Route} from 'react-router-dom';
import {isAuthenticated} from '@/commons';
import Error401 from '@/pages/error/Error401';
import config from '@/commons/config-hoc';


/**
 * 与KeepPage配合使用的路由，只做页面收集，不渲染具体内容
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
                    let component = <Error401/>;
                    if (noAuth || isAuthenticated()) component = <Component {...props}/>;

                    // 如果页面现实tabs，或者启用了keep page alive 需要对tabs进行操作
                    if (tabsShow || keepPage) {
                        const prevActiveIndex = tabs.findIndex(item => item.active);

                        // 先重置所有的选中状态，接下来会重新设置
                        tabs.forEach(item => item.active = false);

                        const {pathname, search} = props.location;
                        const currentPath = `${pathname}${search}`;

                        // FIXME tab页面是否存在判断
                        const currentTab = tabs.find(item => item.path === currentPath);

                        if (currentTab) {
                            // 如果当前地址对应的tab页已经存在，直接选中
                            currentTab.active = true;

                            if (!currentTab.component) {
                                // 先让 KeepPage.jsx 进行一次 无component渲染，然后再次渲染component达到刷新的目的
                                setTimeout(() => {
                                    const tb = tabs.find(item => item.path === currentTab.path);
                                    tb.component = component;
                                    this.props.action.system.setTabs([...tabs]);
                                })
                            }
                        }

                        // 当前地址对应的tab页不存在，进行添加
                        if (!currentTab) {
                            const icon = selectedMenu?.icon;
                            const newAddTab = {
                                path: currentPath,
                                component,
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

                            // FIXME 不适用setTimeout 会报出 Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
                            setTimeout(() => {
                                this.props.action.system.setTabs(newTabs);
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
