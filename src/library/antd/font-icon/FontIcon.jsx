import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from 'antd';
import './index.less';

/**
 * 文字图标，支持fa 和 antd 自带图标
 */
export default class FontIcon extends Component {
    static defaultProps = {
        size: '', // lg 2x 3x 4x 5x
    };
    static propsType = {
        type: PropTypes.string.isRequired,
        className: PropTypes.string,
    };

    render() {
        const {
            type = '',
            className,
            size,
            ...others
        } = this.props;

        let classNames = classnames('font-icon', className);
        const sizeStr = size ? `fa-${size}` : '';

        if (type && type.startsWith('fa-')) {
            classNames = classnames(classNames, {
                'fa': true,
                [type]: true,
                [sizeStr]: true,
            });
            return <i {...others} className={classNames}/>;
        }

        // 如果要支持其他库，这里继续扩展

        // 没检测到任何前缀，返回antd默认的图标
        return <Icon {...others} type={type} className={`font-icon ${className} ${sizeStr}`}/>;
    }
}
