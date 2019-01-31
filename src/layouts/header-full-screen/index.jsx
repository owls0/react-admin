import React, {Component} from 'react';
import {Icon, Tooltip} from 'antd';
import config from '@/commons/config-hoc';

@config({
    connect: state => ({
        local: state.system.i18n.setting,
    }),
})
export default class HeaderFullScreen extends Component {
    state = {
        fullScreen: false,
    };

    componentDidMount() {
        let fullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen

        document.addEventListener('fullscreenchange', this.handleFullScreenChange);
        document.addEventListener('mozfullscreenchange', this.handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange);
        document.addEventListener('msfullscreenchange', this.handleFullScreenChange);

        this.setState({fullScreen: !!fullScreen});
    }

    componentWillUnmount() {
        document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
        document.removeEventListener('mozfullscreenchange', this.handleFullScreenChange);
        document.removeEventListener('webkitfullscreenchange', this.handleFullScreenChange);
        document.removeEventListener('msfullscreenchange', this.handleFullScreenChange);
    }

    handleFullScreenClick = () => {
        const {fullScreen} = this.state;
        if (fullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            const element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
        }
    };

    handleFullScreenChange = () => {
        const {fullScreen} = this.state;
        this.setState({fullScreen: !fullScreen});
    };

    render() {
        const {className, local} = this.props;
        const {fullScreen} = this.state;
        return (
            <div
                style={{padding: '0 16px'}}
                className={className}
                onClick={this.handleFullScreenClick}
            >
                <Tooltip placement="bottom" title={fullScreen ? local.exitFullScreen : local.fullScreen}>
                    <div style={{height: '30px', lineHeight: '30px'}}>
                        {fullScreen ? (
                            <Icon type="fullscreen-exit"/>
                        ) : (
                            <Icon type="fullscreen"/>
                        )}
                    </div>
                </Tooltip>
            </div>
        );
    }
}
