import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import ReactLoadable from 'react-loadable';
import {isAuthenticated} from '@/commons';
import PageFrame from '@/layouts/frame';
import PageLoading from "@/layouts/page-loading";
import Error404 from '@/pages/error/Error404';
import config from '@/commons/config-hoc';
import AuthRoute from './AuthRoute';
import routes, {noFrameRoutes, noAuthRoutes} from './routes';

const history = createBrowserHistory();

// 代码分割处理
const allRoutes = routes.map(item => {
    return {
        path: item.path,
        component: ReactLoadable({loader: item.component, loading: PageLoading}),
    };
});

@config({
    query: true,
})
export default class AppRouter extends Component {
    render() {
        const {noFrame, noAuth} = this.props.query;
        return (
            <Router history={history}>
                <div style={{display: 'flex', flexDirection: 'column', position: 'relative', minHeight: '100vh'}}>
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

                        // 如果浏览器url中携带了noFrame=true参数，不显示框架
                        if (noFrame === 'true') {
                            return null;
                        }

                        return <PageFrame {...props}/>;
                    }}/>

                    <Switch>
                        {allRoutes.map(item => {
                            const {path, component} = item;

                            const noAuthRoute = <Route key={path} exact path={path} component={component}/>;

                            // 不需要登录的页面
                            if (noAuthRoutes.includes(path)) return noAuthRoute;

                            // 如果浏览器url中携带了noAuthor=true参数，不需要登录即可访问
                            if (noAuth === 'true') return noAuthRoute;

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
