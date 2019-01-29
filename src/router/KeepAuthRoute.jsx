import React from 'react';
import {Route} from 'react-router-dom';
import {isAuthenticated} from '@/commons';
import Error401 from '@/pages/error/Error401';
import config from '@/commons/config-hoc';


/**
 * 验证登录路由组件，如果未登录，跳转到登录页面
 * @param Component
 * @param noAuth
 * @param rest
 * @returns {*}
 */
@config({
    connect(state) {
        return {
            tabs: state.system.tabs,
        }
    },
})
export default class TabAuthRoute extends React.Component {

    render() {
        const {component: Component, noAuth, tabs, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    const {pathname, search} = props.location;
                    const path = `${pathname}${search}`;
                    const currentTab = tabs.find(item => item.id === path);

                    if (!currentTab) {
                        let component = <Error401/>;

                        if (noAuth || isAuthenticated()) component = <Component {...props}/>;

                        const newTabs = [...tabs, {
                            id: path,
                            component,
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
