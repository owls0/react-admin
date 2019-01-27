import React from 'react';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enGB from 'antd/lib/locale-provider/en_GB';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 解决 antd 日期组件国际化问题
import {connect} from '../models';
import {setMenuI18n} from '../commons'
import allI18n, {setCurrentLocal} from './index';

@connect(state => {
    return {
        local: state.system.local,
        autoLocal: state.system.autoLocal,
        i18n: state.system.i18n,
        menus: state.menu.menus,
        title: state.page.title,
        breadcrumbs: state.page.breadcrumbs,
    }
})
export default class App extends React.Component {
    constructor(...props) {
        super(...props);
        let {local, autoLocal} = this.props;

        // 不基于浏览器自动获取，将语言设置为中文
        if (!autoLocal) local = 'zh_CN';

        // 如果没有选择过语言，通过浏览器获取语言
        if (!local && autoLocal) {
            const type = navigator.appName;
            let lang;

            if (type === 'Netscape') {
                lang = navigator.language; // 获取浏览器配置语言，支持非IE浏览器
            } else {
                lang = navigator.userLanguage; // 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
            }

            // 浏览器语言对应
            lang = lang.replace('-', '_');
            const lang2 = lang.substr(0, 2);
            const l2 = allI18n.find(item => item.local.substr(0, 2) === lang2);

            if (allI18n.find(item => item.local === lang)) {
                // 完全匹配了
                local = lang;
            } else if (l2) {
                // 前两位匹配
                local = l2.local;
            } else {
                // 未查找到匹配的语言，设置成英语
                local = 'en_GB';
            }
        }

        this.state.local = local;
        this.props.action.system.setLocal(local);
    }

    state = {
        menus: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            i18n,
            local: nextLocal,
            menus: nextMenus,
            title: nextTitle,
            breadcrumbs: nextBreadcrumbs = [],
        } = nextProps;

        const {
            local,
            menus,
            title,
            breadcrumbs = [],
        } = prevState;

        // 菜单国际化处理
        const menuI18n = () => {
            const menus = setMenuI18n(nextMenus, i18n.menu);
            nextProps.action.menu.setMenus(menus);
        };

        // 标题国际化处理
        const titleI18n = () => {
            if (!nextTitle.local) return;

            const label = i18n.menu[nextTitle.local] || i18n[nextTitle.local];
            if (label) nextProps.action.page.setTitle({...nextTitle, label});
        };

        // 面包屑国际化
        const breadcrumbsI18n = () => {
            if (!nextBreadcrumbs || !nextBreadcrumbs.length) return;

            const breadcrumbs = nextBreadcrumbs.map(item => {
                const {local} = item;
                const text = i18n.menu[local] || i18n[local];

                if (text) return {...item, text};

                return {...item}
            });

            nextProps.action.page.setBreadcrumbs(breadcrumbs);
        };

        // 如果menus数据变化，FIXME 这里只是简单的对比了长度
        if (nextMenus.length !== menus.length) {
            menuI18n();
        }

        // title国际化处理
        if (nextTitle && nextTitle.local) {
            if (!title) {
                titleI18n();
            }
            if (title && title.local && title.local !== nextTitle.local) {
                titleI18n();
            }
        }

        // 面包屑导航国际化处理
        if (nextBreadcrumbs.length !== breadcrumbs.length) {
            breadcrumbsI18n();
        }

        if (nextLocal !== local) {
            menuI18n();
            titleI18n();
            breadcrumbsI18n();
            setCurrentLocal(allI18n.find(item => item.local === nextLocal)?.i18n || {});
        }

        return {
            local: nextLocal,
            menus: nextMenus,
            title: nextTitle,
            breadcrumbs: nextBreadcrumbs,
        };
    }

    render() {
        const {children} = this.props;
        const {local} = this.state;

        // FIXME 更多语言支持
        const momentLocalMap = {
            'zh_CN': 'zh-cn',
            'en_GB': 'en-gb',
        };
        const antLocalMap = {
            'zh_CN': zhCN,
            'en_GB': enGB,
        };

        const momentLocal = momentLocalMap[local];
        if (momentLocal) moment.locale(momentLocal);

        const antLan = antLocalMap[local];

        return (
            <LocaleProvider locale={antLan}>
                {children}
            </LocaleProvider>
        );
    }
}
