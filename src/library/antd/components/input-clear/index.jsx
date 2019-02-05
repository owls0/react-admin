import React, {Component} from 'react';
import {Input, Icon} from 'antd';

const closeIconColor = 'rgba(0, 0, 0, 0.25)';
const closeIconHoverColor = 'rgba(0, 0, 0, 0.43)';

/**
 * 给输入框添加清空按钮 suffix ，点击可清空Input，并使Input获得焦点
 */

export default class InputClear extends Component {
    state = {
        iconColor: closeIconColor,
        showCloseIcon: false,
    };

    showCloseIcon() {
        const {value} = this.props;

        if (value) this.setState({showCloseIcon: true});
    }

    hideCloseIcon() {
        this.setState({showCloseIcon: false});
    }

    handleRef = node => {
        const {ref} = this.props;
        if (ref) ref(node);

        this.__input = node;
    };

    handleMouseEnter = (e) => {
        const {onMouseEnter} = this.props;
        if (onMouseEnter) onMouseEnter(e);

        this.showCloseIcon();
    };

    handleMouseLeave = (e) => {
        const {onMouseLeave} = this.props;
        if (onMouseLeave) onMouseLeave(e);

        this.hideCloseIcon();
    };

    handleClear = () => {
        const {onChange} = this.props;

        if (onChange) {
            onChange({target: {value: ''}});
        }
        this.__input.focus();
    };

    render() {
        const {iconColor, showCloseIcon} = this.state;
        const {...others} = this.props;

        let injectProps = {};
        injectProps.suffix = (
            <Icon
                style={{
                    transition: 'color 0.3s ease, opacity 0.15s ease',
                    color: iconColor,
                    cursor: 'pointer',
                    opacity: showCloseIcon ? 1 : 0,
                }}
                type="close-circle"
                onMouseEnter={() => {
                    this.showCloseIcon();
                    this.setState({iconColor: closeIconHoverColor});
                }}
                onMouseLeave={() => this.setState({iconColor: closeIconColor})}
                onClick={this.handleClear}
            />
        );
        return (
            <Input
                {...injectProps}
                {...others}
                ref={this.handleRef}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            />
        );
    }
}
