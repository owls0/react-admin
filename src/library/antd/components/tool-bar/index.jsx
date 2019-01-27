import React from 'react';
import classNames from 'classnames';

export default class ToolBar extends React.Component {
    render() {
        const className = classNames('tool-bar', this.props.className);

        return (
            <div {...this.props} className={className}>
                {this.props.children}
            </div>
        );
    }
}
