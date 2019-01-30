import React, {Component} from 'react';
import config from '@/commons/config-hoc';

/**
 * 通过div的显示隐藏，来保存tab页面状态
 */
@config({
    connect(state) {
        return {
            tabs: state.system.tabs,
        };
    },
})
export default class KeepPage extends Component {
    render() {
        const {
            tabs,
        } = this.props;

        const {pathname, search} = window.location;
        const path = `${pathname}${search}`;

        // FIXME 每次tab切换，都会导致所有的tab页面组件render一次
        return (
            <div>
                {tabs.map(item => {
                    const {path: tabPath, component} = item;
                    const active = tabPath === path;

                    return (
                        <div key={tabPath} id={tabPath} style={{display: active ? 'block' : 'none'}}>
                            {component}
                        </div>
                    );
                })}
            </div>
        );
    }
}
