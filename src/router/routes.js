import pageRoutes, {noAuths, noFrames} from '../pages/page-routes';

// 不需要页面框架的页面配置
export const noFrameRoutes = noFrames;

// 不需要登录的页面

export const noAuthRoutes = noAuths;

/*
* 非脚本抓取的路由，可以在这里编辑，脚本抓取的路由在./src/pages/page-routes.js中
* */
export default [
    // {path: '/', component: () => import('../pages/home/index')},
].concat(pageRoutes);
