import React, {Component} from 'react';
import {Icon} from 'antd';
import config from '@/commons/config-hoc';
import {loadScript} from '@/commons';
import ColorPicker from '@/components/color-picker';
import theme from '@/theme';
import './style.less';

@config({
    ajax: true,
    connect: (state) => {
        return {
            primaryColor: state.system.primaryColor,
            loading: state.system.loading,
        };
    },
})
export default class ThemeColorPicker extends Component {
    constructor(...props) {
        super(...props);

        // 快速生效
        const themeStyleContent = window.localStorage.getItem('theme-style-content');
        if (themeStyleContent) {
            const themeStyle = document.createElement('style');
            themeStyle.type = 'text/css';
            themeStyle.id = 'less:color:old';
            themeStyle.innerHTML = themeStyleContent;
            document.body.insertBefore(themeStyle, document.body.firstChild);
        }

        this.props.ajax.get('/color.less', null, {baseURL: ''})
            .then(res => {
                const lessLink = document.createElement('link');
                lessLink.rel = 'stylesheet/less';
                lessLink.type = 'text/css';
                lessLink.href = '/color.less';
                lessLink.innerHTML = res;
                document.head.appendChild(lessLink);

                // 开发模式下，要等待其他style注入head，否则样式不能覆盖
                // 登录页面 和 等之后的页面 用的storage 前缀不同，这里使用原生存储
                const primaryColor = window.localStorage.getItem('primaryColor');

                if (primaryColor) {
                    this.handleColorChange(primaryColor);
                }
            });
    }

    handleColorChange = color => {
        const changeColor = () => {
            window.less
                .modifyVars({
                    ...theme,
                    '@primary-color': color,
                })
                .then((...args) => {
                    Icon.setTwoToneColor({primaryColor: color});
                    this.props.action.system.setPrimaryColor(color);

                    // 将生成之后的style标签插入body首部
                    // 由于每个页面的css也是异步加载（无论开发、还是生产），会导致样式插入在生成的style标签之后，导致主题失效
                    const oldStyle = document.getElementById('less:color:old');
                    if (oldStyle) oldStyle.remove();

                    const lessColor = document.getElementById('less:color');
                    // document.head.appendChild(lessColor);
                    document.body.insertBefore(lessColor, document.body.firstChild);
                    window.localStorage.setItem('theme-style-content', lessColor.innerHTML);
                });
        };

        const lessUrl = '/less.min.js';

        if (this.lessLoaded) {
            changeColor();
        } else {
            window.less = {
                // onReady: false,
                async: true,
                javascriptEnabled: true,
            };
            loadScript(lessUrl).then(() => {
                this.lessLoaded = true;
                changeColor();
            });
        }
    };

    render() {
        const {primaryColor = theme['@primary-color'], className} = this.props;
        return (
            <div styleName="root" className={`theme-color-picker ${className}`}>
                <div styleName="picker">
                    <ColorPicker
                        type="sketch"
                        small
                        color={primaryColor}
                        position="bottom"
                        presetColors={[
                            '#F5222D',
                            '#FA541C',
                            '#FA8C16',
                            '#FAAD14',
                            '#FADB14',
                            '#A0D911',
                            '#52C41A',
                            '#13C2C2',
                            '#1890FF',
                            '#2F54EB',
                            '#722ED1',
                            '#EB2F96',
                        ]}
                        onChangeComplete={this.handleColorChange}
                    />
                </div>
                <Icon style={{marginLeft: 4}} type="caret-down"/>
            </div>
        );
    }
}
