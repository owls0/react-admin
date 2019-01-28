import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BackTop, Spin} from 'antd';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';
import PageHead from '../page-head';
import Header from '../header';
import Side from '../side';
import {connect} from '../../models/index';
import {getSelectedMenuByPath} from '../../commons';
import {PAGE_FRAME_LAYOUT} from '@/models/settings';
import './style.less';


@withRouter
@connect(state => {
    const {selectedMenu, menus} = state.menu;
    const {title, breadcrumbs, showHead} = state.page;
    const {show: showSide, width, collapsed, collapsedWidth, dragging} = state.side;
    const {loading, i18n} = state.system;
    const {pageFrameLayout, pageHeadFixed, pageHeadShow} = state.settings;
    return {
        menus,
        selectedMenu,
        showPageHead: showHead,
        title,
        breadcrumbs,

        showSide,
        sideWidth: width,
        sideCollapsed: collapsed,
        sideCollapsedWidth: collapsedWidth,
        globalLoading: loading,
        sideDragging: dragging,
        layout: pageFrameLayout,
        pageHeadFixed,
        pageHeadShow, // 设置中统一控制的头部是否显示
        i18n,
    };
})
export default class FrameTopSideMenu extends Component {
    static propTypes = {
        layout: PropTypes.string,
    };

    static defaultProps = {
        layout: PAGE_FRAME_LAYOUT.SIDE_MENU,    // top-menu side-menu
        pageHeadFixed: true,        // 页面头部是否固定
    };

    componentWillMount() {
        const {action: {menu, side}} = this.props;

        setTimeout(() => { // 等待getStateFromStorage获取配置之后再设置
            menu.getMenuStatus();
            side.show();
            this.setTitleAndBreadcrumbs();
        });

        this.props.history.listen(() => {
            menu.getMenuStatus();
            side.show();
            this.setTitleAndBreadcrumbs();
        });
    }

    setTitleAndBreadcrumbs() {
        const {
            action: {page},
            pageHeadShow,
            menus,
            i18n,
            title: prevTitle,
            breadcrumbs: prevBreadcrumbs,
        } = this.props;

        const selectedMenu = getSelectedMenuByPath(window.location.pathname, menus);
        let breadcrumbs = [];
        let title = '';
        if (selectedMenu) {
            title = {
                text: selectedMenu.text,
                local: selectedMenu.local,
            };
            if (selectedMenu.parentNodes) {
                breadcrumbs = selectedMenu.parentNodes.map(item => {
                    return {
                        key: item.key,
                        icon: item.icon,
                        text: item.text,
                        path: item.path,
                        local: item.local,
                    }
                });
            }

            if (selectedMenu.path !== '/') {
                breadcrumbs.unshift({
                    key: 'index',
                    icon: 'home',
                    text: i18n?.menu?.home,
                    path: '/',
                    local: 'home',
                });
            }

            breadcrumbs.push({
                key: selectedMenu.key,
                icon: selectedMenu.icon,
                text: selectedMenu.text,
                local: selectedMenu.local,
            });
        }

        // 从菜单中没有获取到，有肯能是当前页面设置了，但是没有菜单对应
        if (!breadcrumbs.length && prevBreadcrumbs && prevBreadcrumbs.length) {
            page.setBreadcrumbs(prevBreadcrumbs);
        } else {
            page.setBreadcrumbs(breadcrumbs);
        }

        // 从菜单中没有获取到，有肯能是当前页面设置了，但是没有菜单对应
        if (!title && prevTitle) {
            page.setTitle(prevTitle);
        } else {
            page.setTitle(title);
        }

        pageHeadShow ? page.showHead() : page.hideHead();
    }

    render() {
        let {
            layout,
            pageHeadFixed,
            showPageHead,
            title,
            breadcrumbs,

            showSide,
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            globalLoading,
            sideDragging,
        } = this.props;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
        sideWidth = showSide ? sideWidth : 0;

        let transitionDuration = sideDragging ? '0ms' : `300ms`;

        const isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
        const isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
        const hasSide = isTopSideMenu || isSideMenu;

        if (!hasSide) {
            window.document.body.style.paddingLeft = '0px';
        } else {
            window.document.body.style.paddingLeft = `${sideWidth}px`;
        }

        const theme = (isTopSideMenu || isSideMenu) ? 'dark' : 'default';

        let pageHead = null;
        if (showPageHead) {
            pageHead = (
                <PageHead
                    title={title}
                    breadcrumbs={breadcrumbs}
                />
            );

            if (pageHeadFixed) {
                pageHead = (
                    <div styleName="page-head-fixed" style={{left: hasSide ? sideWidth : 0, transitionDuration}}>
                        {pageHead}
                    </div>
                );
            }
        }

        if (isSideMenu) pageHead = null;

        return (
            <div styleName="base-frame" className="no-print">
                <Helmet><title>{title?.text || title}</title></Helmet>
                <BackTop/>
                <Header theme={(isTopSideMenu || isSideMenu) ? 'default' : 'dark'} layout={layout}/>
                <Side layout={layout} theme={theme}/>
                <div styleName={`content-top-space ${showPageHead && pageHead && pageHeadFixed ? 'with-fixed-page-head' : ''}`}/>
                {pageHead}
                <div styleName="global-loading" style={{display: globalLoading ? 'block' : 'none'}}>
                    <Spin spinning size="large"/>
                </div>
            </div>
        );
    }
}
