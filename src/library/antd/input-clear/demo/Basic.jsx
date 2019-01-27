import React, {Component} from 'react';
import {InputClear} from '../../index';

export default class Basic extends Component {
    state = {
        value: '',
    };


    handleClear = () => {
        this.setState({value: void 0});
    };

    handleChange = (e) => {
        const {value} = e.target;

        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <InputClear
                style={{width: '200px'}}
                value={value}
                onChange={this.handleChange}
                onClear={this.handleClear}
            />
        );
    }
}

export const title = '基础用法';
export const markdown = `
需要声明 \`value\` \`onChange\` \`onClear\`属性
`;
