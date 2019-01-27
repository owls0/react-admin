import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'antd';
import FontIcon from './FontIcon';
import FontIconSelector from './FontIconSelector';
import './index.less';

export default class FontIconModal extends Component {
    static propsType = {
        value: PropTypes.string,
        size: PropTypes.string,
        disabled: PropTypes.boolean,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        size: 'large',
        disabled: false,
        buttonType: 'ghost',
        onSelect: () => {
        },
        height: 400,
        width: 645,
        showPreview: true,
        value: '',
    };

    state = {
        iconModalVisible: false,
        selectedIcon: '',
    };

    handleIconModalOk = () => {
        const {selectedIcon} = this.state;

        this.props.onSelect(selectedIcon);

        this.setState({iconModalVisible: false});
    };

    handleSelectIcon = selectedIcon => {
        this.setState({selectedIcon});
    };

    render() {
        const {value, size, disabled, buttonType, height, width, showPreview, style} = this.props;
        const {iconModalVisible} = this.state;
        return (
            <div className="font-icon-modal-wrap" style={style}>
                <div className="font-button">
                    <Button
                        type={buttonType}
                        size={size}
                        onClick={() => this.setState({iconModalVisible: true})}
                        disabled={disabled}
                    >
                        {
                            showPreview ?
                                <FontIcon type={value}/>
                                : null
                        }
                        选取图标
                    </Button>
                </div>
                <Modal
                    width={width}
                    visible={iconModalVisible}
                    title="选择一个图标"
                    okText="确定"
                    onCancel={() => this.setState({iconModalVisible: false})}
                    onOk={this.handleIconModalOk}
                >
                    <div>
                        <FontIconSelector
                            height={height}
                            onSelect={this.handleSelectIcon}
                            onSubmit={(icon) => {
                                this.handleSelectIcon(icon);
                                setTimeout(() => {
                                    this.handleIconModalOk();
                                });
                            }}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}
