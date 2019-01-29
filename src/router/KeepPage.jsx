import React, {Component} from 'react';
import config from '@/commons/config-hoc';

/**
 * Tab页使用的路由
 * @param Component
 * @param rest
 */
@config({
    connect(state) {
        return {
            tabs: state.system.tabs,
        };
    },
})
export default class TabPages extends Component {
    tabs = {};

    render() {
        const {
            tabs,
        } = this.props;

        const {pathname, search} = window.location;
        const path = `${pathname}${search}`;

        return (
            <div>
                {tabs.map(item => {
                    const {id, component} = item;
                    const active = id === path;

                    return (
                        <div key={id} style={{display: active ? 'block' : 'none'}}>
                            {component}
                        </div>
                    );
                })}
            </div>
        );
    }
}
