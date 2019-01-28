import React from 'react';
import {Route} from 'react-router-dom';
import {isAuthenticated} from '../commons';
import Error401 from '@/pages/error/Error401';


/**
 * 验证登录路由组件，如果未登录，跳转到登录页面
 * @param Component
 * @param rest
 */
export default ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated()) return <Component {...props}/>;
                return <Error401/>;
            }}
        />
    );
}
