import React, {Component} from 'react';
import {Icon} from 'antd';

export default class index extends Component {
    state = {
        fullScreen: false
    };

    componentDidMount() {

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

        this.setState({fullScreen: !fullScreen});
    };

    render() {
        const {className} = this.props;
        const {fullScreen} = this.state;
        return (
            <div
                style={{padding: '0 16px'}}
                className={className}
                onClick={this.handleFullScreenClick}
            >
                {fullScreen ? (
                    <Icon type="fullscreen-exit"/>
                ) : (
                    <Icon type="fullscreen"/>
                )}
            </div>
        );
    }
}
