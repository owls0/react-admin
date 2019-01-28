import getMenus from '../menus';
import zh_CN from '../i18n/zh_CN';
import i18n from '../i18n';
import theme from "@/theme";

// 进行本地存储同步，syncState中的同步是区分用户的，会导致未登录的页面与登录的页面有差异
const getItem = (key) => window.localStorage.getItem(key);
const setItem = (key, value) => window.localStorage.setItem(key, value);

const local = getItem('system-local');
const primaryColor = getItem('primaryColor') || theme['@primary-color'];

export default {
    initialState: {
        loading: false,         // 全局loading
        loginUser: null,        // 当前登录用户
        permissions: [],        // 当前登录用户权限
        local,                  // en_GB 英语
        i18n: zh_CN,            // 语言集 默认简体中文
        autoLocal: true,        // 是否根据浏览器自动获取语言，如果false，将默认简体中文
        primaryColor,           // 主题主颜色
    },

    setPrimaryColor: (state, {payload}) => {
        setItem('primaryColor', payload);

        return {primaryColor: payload};
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

        setItem('system-local', payload);

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
