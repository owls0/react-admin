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
    scrollTop = 0;

    componentDidUpdate() {
        document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop;
    }

    render() {
        console.log('render KeepPage.jsx');
        const {tabs} = this.props;

        // FIXME 每次tab切换，都会导致所有的tab页面组件render一次，由于history作为props，history改变导致的？（好像并不是）浏览器前进后退，并不是router使用的history，并不引起更新
        // FIXME tab页开多了，性能极差
        return tabs.map(item => {
            const {path: tabPath, component, active, scrollTop = 0} = item;

            // 记录当前页面的滚动条位置，等待页面加载完成，componentDidUpdate会进行恢复
            if (active) this.scrollTop = scrollTop;

            return (
                <div key={tabPath} id={tabPath} style={{display: active ? 'flex' : 'none', flex: 1}}>
                    {component}
                </div>
            );
        });
    }
}
