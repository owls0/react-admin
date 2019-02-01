import React, {Component} from 'react';
import {Icon} from 'antd';
import {DraggableTabsBar} from '@/library/antd';
import './style.less';

export const PAGE_ROUTE = '/example/draggable-tabs';

export default class App extends Component {
    state = {
        dataSource: [
            {key: 1, title: <span><Icon style={{marginRight: 4}} type="user"/>1我的文字有点多啊</span>, closable: true},
            {key: 2, title: <span><Icon style={{marginRight: 4}} type="user"/>2我的</span>, closable: true},
            {key: 3, title: <span><Icon style={{marginRight: 4}} type="user"/>3我的</span>, closable: true},
            {key: 4, title: <span><Icon style={{marginRight: 4}} type="user"/>4我的</span>, closable: true},
            {key: 5, title: <span><Icon style={{marginRight: 4}} type="user"/>5我的文字有点多啊</span>, closable: true},
            {key: 6, title: <span><Icon style={{marginRight: 4}} type="user"/>6我的文字有点多啊</span>, closable: true},
            {key: 7, title: <span><Icon style={{marginRight: 4}} type="user"/>7我的文字有点多啊</span>, closable: true},
            {key: 8, title: <span><Icon style={{marginRight: 4}} type="user"/>8我的文字有点多啊</span>, closable: true},
            {key: 9, title: <span><Icon style={{marginRight: 4}} type="user"/>9我的文字有点多啊</span>, closable: true},
            {key: 10, title: <span><Icon style={{marginRight: 4}} type="user"/>10我的文字有点多啊</span>, closable: true},
        ],
    };

    handleSortEnd = (dataSource) => {
        this.setState({dataSource});
    };

    handleClose = (item) => {
        const dataSource = this.state.dataSource.filter(it => it.key !== item.key);
        this.setState({dataSource});
    };

    handleClick = (item) => {
        console.log(item);
        this.setState({activeKey: item.key});
    };

    render() {
        const {dataSource, activeKey} = this.state;
        return (
            <div styleName="root">
                <DraggableTabsBar
                    dataSource={dataSource}
                    onSortEnd={this.handleSortEnd}
                    onClose={this.handleClose}
                    onClick={this.handleClick}
                    activeKey={activeKey}
                />
            </div>
        );
    }
}
