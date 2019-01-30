import React, {Component} from 'react';
import {Tabs} from 'antd';
import config from '@/commons/config-hoc';
import './style.less';

const TabPane = Tabs.TabPane;

@config({
    router: true,
    connect(state) {
        return {
            dataSource: state.system.tabs,
        };
    },
})
export default class PageTabs extends Component {
    state = {};

    componentDidMount() {

    }

    handleChange = (path) => {
        this.props.history.push(path);
    };

    render() {
        const {dataSource} = this.props;
        const {pathname, search} = window.location;
        const currentPath = `${pathname}${search}`;

        return (
            <div styleName="root">
                <Tabs
                    type="editable-card"
                    hideAdd
                    onChange={this.handleChange}
                    activeKey={currentPath}
                    onEdit={this.onEdit}
                >
                    {dataSource.map(pane => {
                        const {text, path} = pane;
                        const title = text.local ? text.text : text;

                        return (
                            <TabPane
                                tab={title}
                                key={path}
                                closable={dataSource.length > 1}
                            />
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}
