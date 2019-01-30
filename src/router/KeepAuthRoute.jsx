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
                    if (tabsShow || keepPage) {
                        const {pathname, search} = props.location;
                        const path = `${pathname}${search}`;

                        // FIXME tab页面是否存在判断
                        const currentTab = tabs.find(item => item.path === path);

                        if (!currentTab) {
                            let component = <Error401/>;

                            if (noAuth || isAuthenticated()) component = <Component {...props}/>;

                            const icon = selectedMenu?.icon;
                            const newTabs = [...tabs, {
                                path,
                                component,
                                text: title,
                                icon,
                            }];

                            setTimeout(() => {
                                this.props.action.system.setTabs(newTabs);
                            })
                        }

                        if (currentTab && !currentTab.component) {
                            const tb = tabs.find(item => item.path === currentTab.path);
                            let component = <Error401/>;

                            if (noAuth || isAuthenticated()) component = <Component {...props}/>;

                            tb.component = component;

                            setTimeout(() => {
                                this.props.action.system.setTabs([...tabs]);
                            })
                        }
                    }

                    if (keepPage) {
                        return null;
                    }

                    // 页面滚动条滚动到顶部
                    document.body.scrollTop = document.documentElement.scrollTop = 0;

                    if (noAuth || isAuthenticated()) return <Component {...props}/>;

                    return <Error401/>;
                }}
            />
        );
    }
}
