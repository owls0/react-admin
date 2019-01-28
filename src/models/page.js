export default {
    initialState: {
        breadcrumbs: [],    // 面包屑数据 [{local, text}] 支持国际化
        title: '',          // 页面title {local, text} 支持国际化
        showHead: true,     // 是否显示/隐藏页面头部
        loading: false,
    },

    showHead: () => ({showHead: true}),
    hideHead: () => ({showHead: false}),

    setTitle: (state, {payload}) => ({title: payload}),

    setBreadcrumbs: (state, {payload}) => ({breadcrumbs: payload}),
    appendBreadcrumbs: (state, {payload}) => {
        let {breadcrumbs = []} = state;
        breadcrumbs = breadcrumbs.concat(payload);
        return {breadcrumbs};
    },

    showLoading: () => ({loading: true}),
    hideLoading: () => ({loading: false}),
}
