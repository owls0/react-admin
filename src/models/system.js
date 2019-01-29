import i18n, {defaultLang} from '../i18n';
import theme from "@/theme";

// 进行本地存储同步，syncState中的同步是区分用户的，会导致未登录的页面与登录的页面有差异
const getItem = (key) => window.localStorage.getItem(key);
const setItem = (key, value) => window.localStorage.setItem(key, value);

const primaryColor = getItem('primaryColor') || theme['@primary-color'];

export default {
    initialState: {
        loading: false,             // 全局loading
        loginUser: null,            // 当前登录用户
        permissions: [],            // 当前登录用户权限
        local: defaultLang.local,   // 默认语言
        i18n: defaultLang.i18n,     // 默认语言集
        autoLocal: true,            // 是否根据浏览器自动获取语言，如果false，将默认简体中文
        primaryColor,               // 主题主颜色
        tabs: [],                   // 所有的tab配置 {path, text, component}
        keepPage: false,             // 页面切换回去之后，保持内容，通过显示隐藏div实现，不知道会有什么坑！！！性能？各个互相干扰？
    },

    setTabs: (tabs) => ({tabs}),
    setKeepPage: keepPage => ({keepPage}),
    /**
     * 设置主题颜色
     * @param primaryColor
     * @returns {{primaryColor: *}}
     */
    setPrimaryColor: (primaryColor) => {
        setItem('primaryColor', primaryColor);

        return {primaryColor};
    },

    /**
     * 设置语言
     * @param local
     * @returns {{local: *, i18n: {application, ajaxTip, menu, login, setting}}}
     */
    setLocal: (local) => {
        const localI18n = i18n.find(item => item.local === local).i18n;

        setItem('system-local', local);

        return {local: local, i18n: localI18n}
    },

    /**
     * 设置当前用户
     * @param loginUser
     * @returns {{loginUser: *}}
     */
    setLoginUser: (loginUser) => ({loginUser}),

    /**
     * 设置当前用户权限
     * @param permissions
     * @returns {{permissions: *}}
     */
    setPermissions: (permissions) => ({permissions}),

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
