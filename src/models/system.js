import getMenus from '../menus';
import zh_CN from '../i18n/zh_CN';
import i18n from '../i18n';

export default {
    initialState: {
        loading: false,
        loginUser: null,
        permissions: [],
        local: void 0, // en_GB 英语
        i18n: zh_CN, // 语言集 默认中文
    },

    syncState: {
        local: true,
    },

    /**
     * 获取系统菜单
     */
    getMenus: {
        payload: ({params, options} = {}) => {
            return getMenus(params.userId);
        },
    },

    /**
     * 设置语言
     * @param state
     * @param payload
     * @returns {{local: *}}
     */
    setLocal: (state, {payload}) => {
        const localI18n = i18n.find(item => item.local === payload).i18n;
        return {local: payload, i18n: localI18n}
    },

    /**
     * 设置当前用户
     * @param state
     * @param payload
     * @returns {{loginUser: *}}
     */
    setLoginUser: (state, {payload}) => ({loginUser: payload}),

    /**
     * 设置当前用户权限
     * @param state
     * @param payload
     * @returns {{permissions: *}}
     */
    setPermissions: (state, {payload}) => ({permissions: payload}),

    /**
     * 显示全局loading
     * @returns {{loading: boolean}}
     */
    showLoading: () => ({loading: true}),

    /**
     * 隐藏全局loading
     * @returns {{loading: boolean}}
     */
    hideLoading: () => ({loading: false}),
}
