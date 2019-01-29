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
        }
    },
})
export default class KeepAuthRoute extends React.Component {

    render() {
        const {component: Component, noAuth, tabs, title, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    const {pathname, search} = props.location;
                    const path = `${pathname}${search}`;

                    // FIXME tab页面是否存在判断
                    const currentTab = tabs.find(item => item.path === path);

                    if (!currentTab) {
                        let component = <Error401/>;

                        if (noAuth || isAuthenticated()) component = <Component {...props}/>;

                        const newTabs = [...tabs, {
                            path,
                            component,
                            text: title,
                        }];

                        setTimeout(() => {
                            this.props.action.system.setTabs(newTabs);
                        })
                    }

                    return null;
                }}
            />
        );
    }
}
