import React, {Component} from 'react';
import {Menu, Dropdown, Avatar, Icon} from 'antd';
import {Link} from 'react-router-dom';
import avatar from './avatar.svg';
import {toLogin, getLoginUser} from '../../commons';
import {connect} from '../../models';
import './style.less';

const Item = Menu.Item;

@connect(state => ({local: state.system.i18n}))
export default class HeaderUser extends Component {
    static defaultProps = {
        theme: 'default',
    };
    handleMenuClick = ({key}) => {
        if (key === 'logout') {
            // TODO 发送请求退出登录
            toLogin();
        }
    };

    render() {
        const user = getLoginUser() || {};
        const name = user.name;

        const {className, theme, local} = this.props;

        const menu = (
            <Menu styleName="menu" theme={theme} selectedKeys={[]} onClick={this.handleMenuClick}>
                <Item><Link to="/settings"><Icon type="setting"/>{local.menu.setting}</Link></Item>
                <Menu.Divider/>
                <Item key="logout"><Icon type="logout"/>{local.menu.logout}</Item>
            </Menu>
        );
        return (
            <div styleName="user-menu" ref={node => this.userMenu = node}>
                <Dropdown overlay={menu} getPopupContainer={() => (this.userMenu || document.body)}>
                    <span styleName="account" className={className}>
                        <Avatar size="small" styleName="avatar" src={avatar}/>
                        {name}
                        <Icon type="caret-down"/>
                    </span>
                </Dropdown>
            </div>
        );
    }
}