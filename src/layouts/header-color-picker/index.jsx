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

        const {primaryColor} = this.props;

        // .less文件加载完成之后，生成主题，localStorage中的主题有可能过时，需要覆盖
        if (primaryColor) this.handleColorChange(primaryColor);
    }

    handleColorChange = color => {
        const changeColor = () => {
            window.less
                .modifyVars({
                    ...theme,
                    '@primary-color': color,
                })
                .then(() => {
                    Icon.setTwoToneColor({primaryColor: color});
                    this.props.action.system.setPrimaryColor(color);

                    // 先清除缓存样式
                    const oldStyle = document.getElementById('less:color:old');
                    if (oldStyle) oldStyle.remove();

                    // 将生成之后的style标签插入body首部
                    // 由于每个页面的css也是异步加载（无论开发、还是生产），会导致样式插入在生成的style标签之后，导致主题失效
                    const lessColor = document.getElementById('less:color');
                    if (!lessColor) return;

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
                logLevel: 2,
                async: true,
                javascriptEnabled: true,
                modifyVars: { // less.js加载完成就会触发一次转换，需要传入变量
                    ...theme,
                    '@primary-color': color,
                },
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
