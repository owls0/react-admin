import antdMenus from './menus-antd-demo';
/*
* 菜单数据 返回Promise各式，支持前端硬编码、异步获取菜单数据
* */
export default function getMenus(userId) {
    // TODO 根据userId获取菜单数据
    return Promise.resolve([
        {key: 'ajax', local: 'ajax', text: 'ajax请求', icon: 'api', path: '/example/ajax', order: 10011},
        {key: 'antDesign', local: 'antDesign', text: 'Ant Design组件扩展', icon: 'ant-design', order: 10011},
        {key: 'user', local: 'users', text: '用户列表', icon: 'user', path: '/example/users', order: 10011},
        {key: 'role', local: 'roles', text: '角色列表 ', icon: 'team', path: '/example/roles', order: 10011},
    ].concat(antdMenus));
}
