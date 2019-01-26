import React, {Component} from 'react';
import {Icon, message} from 'antd';
import config from '@/commons/config-hoc';
import {loadScript} from '@/commons';
import ColorPicker from '@/components/color-picker';
import theme from '../../theme';
import './style.less';

@config({
    path: '/about',
    title: '我特么是自定义title',
    // noAuth: true,
    // noFrame: true,
    ajax: true,
    query: true,
    event: true,
    connect: (state) => {
        return {
            primaryColor: state.system.primaryColor,
            loading: state.system.loading,
        };
    },
})
export default class ThemeColorPicker extends Component {
    componentDidMount() {

        setTimeout(() => {
            const {primaryColor} = this.props;
            if (primaryColor) this.handleColorChange(primaryColor);
        }, 1000);
    }

    handleColorChange = color => {
        const colorLess = document.getElementById('color-less')
        if (!colorLess) {
            // <link rel="stylesheet/less" type="text/css" href="/color.less">
            const colorLink = document.createElement('link');
            colorLink.id = 'color-less';
            colorLink.rel = 'stylesheet/less';
            colorLink.type = 'text/css';
            colorLink.href = '/color.less';

            document.querySelector('head').appendChild(colorLink);
        }

        const changeColor = () => {
            window.less
                .modifyVars({
                    ...theme,
                    '@primary-color': color,
                })
                .then((...args) => {
                    console.log(args);
                    Icon.setTwoToneColor({primaryColor: color});
                    message.success('修改颜色成功');
                    console.log(color);
                    this.props.action.system.setPrimaryColor(color);
                });
        };

        const lessUrl = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';

        if (this.lessLoaded) {
            changeColor();
        } else {
            window.less = {
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
        const {primaryColor: color = theme['@primary-color']} = this.props;
        return (
            <div styleName="root">
                <ColorPicker
                    type="sketch"
                    small
                    color={color}
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
                <Icon style={{marginLeft: 4}} type="caret-down"/>
            </div>
        );
    }
}
