import antdMenus from './menus-ant-design-example';
/*
* 菜单数据 返回Promise各式，支持前端硬编码、异步获取菜单数据
* */
export default function getMenus(userId) {
    // TODO 根据userId获取菜单数据 或在此文件中前端硬编码菜单
    return Promise.resolve([
        {key: '1', text: 'level-1'},
        {key: '1-1', parentKey: '1', text: 'level-1-1'},
        {key: '1-2', parentKey: '1', text: 'level-1-2'},
        {key: '1-3', parentKey: '1', text: 'level-1-3'},
        {key: '1-4', parentKey: '1', text: 'level-1-4'},
        {key: '1-4-1', parentKey: '1-4', text: 'level-1-4-1'},
        {key: '1-4-2', parentKey: '1-4', text: 'level-1-4-2'},
        {key: '1-4-3', parentKey: '1-4', text: 'level-1-4-3'},
        {key: '1-4-4', parentKey: '1-4', text: 'level-1-4-4'},
        {key: '1-4-3-1', parentKey: '1-4-3', text: 'level-1-4-3-1'},
        {key: '1-4-3-2', parentKey: '1-4-3', text: 'level-1-4-3-2'},
        {key: '1-4-3-3', parentKey: '1-4-3', text: 'level-1-4-3-3'},
        {key: '1-4-3-4', parentKey: '1-4-3', text: 'level-1-4-3-4'},


        {key: 'antDesign', local: 'antDesign', text: 'Ant Design 官网', icon: 'ant-design', url: 'https://ant-design.gitee.io', order: 2000},
        {key: 'baiDu', local: 'baiDu', text: '百度官网', icon: 'google', url: 'https://www.baidu.com', target: '_blank', order: 1200},
        {key: 'ajax', local: 'ajax', text: 'ajax请求', icon: 'api', path: '/example/ajax', order: 1000},
        {key: 'user', local: 'users', text: '用户列表', icon: 'user', path: '/example/users', order: 900},
        {key: 'role', local: 'roles', text: '角色列表 ', icon: 'team', path: '/example/roles', order: 800},
        {key: 'page404', local: 'page404', text: '404页面不存', icon: 'file-search', path: '/404', order: 700},
        {key: 'component', local: 'component', text: '组件', icon: 'ant-design', order: 700},
    ].concat(antdMenus));
}
