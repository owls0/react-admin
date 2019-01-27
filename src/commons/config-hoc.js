import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from './index'
import queryHoc from './query-hoc';
import {connect as reduxConnect} from '../models';
import {ajaxHoc} from './ajax';
import pubSubHoc from '@/library/utils/event-hoc'
import eventHoc from '@/library/utils/dom-event-hoc';

/**
 * 页面配置高阶组件，整合了多个高阶组件
 * @param options
 * @returns {function(*): WithConfig}
 */
export default (options) => {
    return WrappedComponent => {
        const {
            // path = void 0, //  'route path' 页面路由地址，需要脚本抓取
            // noFrame = false, // 不需要导航框架的页面，需要脚本抓取
            // noAuth = false, // 不需要登录就可以访问的页面，需要脚本抓取
            title = true, //  || '页面title', {local, label} 是否显示或单独设置页面title，如果是tab页形式，会作为tab页名称  local 从i18n.menu对应
            breadcrumbs = true, // false || [{local, text, ...}], // 是否显示或单独设置面包屑 local 从i18n.menu对应
            header, // 页面头部是否显示
            side, // 页面左侧是否显示
            sideCollapsed, // 左侧是否收起
            router = false, // 是否添加 withRouter装饰器
            query = false, // 查询字符串封装，这个查一下 withRouter是否有封装
            ajax = false, // 是否添加ajax
            connect = false, //  || (state) => {...}, // 与redux进行连接，名字待考虑
            event = false, // dom事件高阶组件,自动清理，this.props.addEventListener, this.props.removeEventListener
            pubSub = false, // 发布订阅高阶组件,自动清理，this.props.on, this.props.emit
        } = options;

        const hocFuncs = [];

        if (event) hocFuncs.push(eventHoc());

        if (pubSub) hocFuncs.push(pubSubHoc());

        if (query === true) hocFuncs.push(queryHoc());

        if (router === true) hocFuncs.push(withRouter);

        if (ajax === true) hocFuncs.push(ajaxHoc());

        hocFuncs.push(reduxConnect());

        if (connect === true) hocFuncs.push(reduxConnect());

        if (typeof connect === 'function') hocFuncs.push(reduxConnect(connect));

        const hocs = compose(hocFuncs);

        @hocs
        class WithConfig extends Component {
            constructor(...args) {
                super(...args);

                const {page, side: sideAction} = this.props.action;

                // 页面标题设置
                if (title === false) {
                    page.setTitle('');
                }

                if (title && title !== true) {
                    page.setTitle(title);
                }

                // 页面面包屑导航
                if (breadcrumbs === false) {
                    page.setBreadcrumbs([]);
                }

                if (breadcrumbs && breadcrumbs !== true) {
                    page.setBreadcrumbs(breadcrumbs);
                }

                // 页面头部是否显示
                if (header !== undefined) header ? page.showHead() : page.hideHead();

                // 页面左侧是否显示
                if (side !== undefined) side ? sideAction.show() : sideAction.hide();

                // 页面左侧是否收起
                if (sideCollapsed !== undefined) sideAction.setCollapsed(sideCollapsed);
            }

            static displayName = `WithConfig(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

            render() {
                return <WrappedComponent {...this.props}/>;
            }
        }

        return WithConfig;
    };
}
