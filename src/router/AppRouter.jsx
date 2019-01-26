import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import ReactLoadable from 'react-loadable';
import AuthRoute from './AuthRoute';
import {isAuthenticated} from '../commons';
import PageFrame from '../layouts/frame';
import routes, {noFrameRoutes, noAuthRoutes} from './routes';
import PageLoading from "../layouts/loading/PageLoading";
import Error404 from '../pages/error/error404';

const history = createBrowserHistory();

// 代码分割处理
const allRoutes = routes.map(item => {
    return {
        path: item.path,
        component: ReactLoadable({loader: item.component, loading: PageLoading}),
    };
});

export default class AppRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                    <Route path="/" render={props => {
                        // 框架组件单独渲染，与其他页面成为兄弟节点，框架组件和具体页面组件渲染互不影响

                        // 通过配置，筛选那些页面不需要框架
                        if (noFrameRoutes.includes(props.location.pathname)) {
                            return null;
                        }

                        // 框架内容属于登录之后内容，如果未登录，也不显示框架
                        if (!isAuthenticated()) {
                            return null;
                        }

                        return <PageFrame {...props}/>;
                    }}/>

                    <Switch>
                        {allRoutes.map(item => {
                            const {path, component} = item;

                            // 不需要登录的页面
                            if (noAuthRoutes.includes(path)) {
                                return (
                                    <Route key={path} exact path={path} component={component}/>
                                );
                            }
                            return (
                                <AuthRoute key={path} exact path={path} component={component}/>
                            );
                        })}
                        <Route component={Error404}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
