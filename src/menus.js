import antdMenus from './menus-antd-demo';
/*
* 菜单数据 返回Promise各式，支持前端硬编码、异步获取菜单数据
* */
export default function getMenus(userId) {
    // TODO 根据userId获取菜单数据
    return Promise.resolve([
        {key: 'example', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: 'ajax', parentKey: 'example', local: 'ajax', text: 'ajax请求', icon: 'user', path: '/ajax', order: 10011},
        {key: 'antd', parentKey: 'example', local: 'antd', text: 'antd封装', icon: 'user', order: 10011},

        {key: 'user-center', parentKey: 'example', local: 'userCenter', text: '用户中心', icon: 'user', path: '/user-center', order: 10011},
        {key: 'user', parentKey: 'example', local: 'users', text: '用户列表', icon: 'user', path: '/users/list', order: 10011},
        {key: 'role', parentKey: 'example', local: 'roles', text: '角色列表 ', icon: 'user', path: '/example/roles', order: 10011},

        {key: 'user-center1', local: 'userCenter', text: '用户中心', icon: 'user', path: '/user-center2', order: 10011},
        {key: '2', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '3', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '4', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '5', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '6', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '7', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '8', local: 'example', text: 'Example', icon: 'user', path: '', order: 10011},
        {key: '9', local: 'example', text: 'Example', icon: 'user', path: '', order: 10000},
        {key: '199', parentKey: '9', local: 'about', text: '关于', icon: 'user', path: '/about', order: 10000},
    ].concat(antdMenus));
}
