import React, {Component} from 'react';
import config from '@/commons/config-hoc';

/**
 * 通过div的显示隐藏，来保存tab页面状态
 */
@config({
    connect: state => ({
        tabs: state.system.tabs,
    }),
})
export default class KeepPage extends Component {
    render() {
        const {tabs} = this.props;

        // 每次tab切换，都会导致所有的tab页面组件render一次，好像不可避免
        return (
            <div>
                {tabs.map(item => {
                    const {path: tabPath, component, active} = item;

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
