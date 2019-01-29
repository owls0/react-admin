import React from 'react';
import {Route} from 'react-router-dom';
import {isAuthenticated} from '@/commons';
import Error401 from '@/pages/error/Error401';


/**
 * 验证登录路由组件，如果未登录，跳转到登录页面
 * @param Component
 * @param noAuth
 * @param rest
 * @returns {*}
 */
export default ({component: Component, noAuth, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                // 页面滚动条滚动到顶部
                document.body.scrollTop = document.documentElement.scrollTop = 0;

                if (noAuth || isAuthenticated()) return <Component {...props}/>;

                return <Error401/>;
            }}
        />
    );
}
