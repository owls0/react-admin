import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import './style.less';

@config({
    path: '/',
    connect(state) {
        return {
            menus: state.menu.menus,
        };
    },
})
export default class Home extends Component {
    constructor(...props) {
        super(...props);

        // 如果不需要首页，可以直接跳转到系统第一个可用菜单页面
        const {menus} = this.props;
        if (menus && menus.length) {
            let path;
            for (let i = 0; i < menus.length; i++) {
                const m = menus[i];
                if (m.path) {
                    path = m.path;
                    break;
                }
            }
            if (path) {
                console.log(path);
                this.props.history.replace(path);
            }
        }
    }

    render() {
        return <PageContent/>;
    }
}
