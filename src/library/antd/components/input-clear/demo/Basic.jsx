import React, {Component} from 'react';
import {InputClear} from '../../../index';

export default class Basic extends Component {
    state = {
        value: '',
    };

    handleChange = (e) => {
        const {value} = e.target;

        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <div>
                <InputClear
                    style={{width: '200px'}}
                    value={value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export const title = '基础用法';
export const markdown = `
需要声明 \`value\` \`onChange\` 属性
`;
