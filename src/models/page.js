import {getCurrentLocal} from '@/i18n';

export default {
    initialState: {
        breadcrumbs: [],    // 面包屑数据 [{local, text}] 支持国际化
        title: '',          // 页面title {local, text} 支持国际化
        showHead: true,     // 是否显示/隐藏页面头部
        loading: false,
    },

    showHead: () => ({showHead: true}),
    hideHead: () => ({showHead: false}),

    setTitle: (title) => {
        const local = getCurrentLocal();

        if (title && title.local) {
            const text = local.menu[title.local];
            if (text) title.text = text;
        }

        return {title};
    },

    setBreadcrumbs: (breadcrumbs) => ({breadcrumbs}),
    appendBreadcrumbs: (appendBreadcrumbs, state) => {
        let {breadcrumbs = []} = state;
        breadcrumbs = breadcrumbs.concat(appendBreadcrumbs);
        return {breadcrumbs};
    },

    showLoading: () => ({loading: true}),
    hideLoading: () => ({loading: false}),
}
