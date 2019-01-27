import React, {Component} from 'react';
import {FontIcon} from '../../index';

export default class FontIconDemo extends Component {
    state = {};

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        const style = {marginRight: 8};

        return (
            <div>
                <div>
                    <FontIcon style={style} type="fa-users" size="1x"/>
                    <FontIcon style={style} type="fa-users" size="2x"/>
                    <FontIcon style={style} type="fa-users" size="3x"/>
                    <FontIcon style={style} type="fa-users" size="4x"/>
                    <FontIcon style={style} type="fa-users" size="5x"/>
                </div>
                <div>
                    <FontIcon style={style} type="user" size="1x"/>
                    <FontIcon style={style} type="user" size="2x"/>
                    <FontIcon style={style} type="user" size="3x"/>
                    <FontIcon style={style} type="user" size="4x"/>
                    <FontIcon style={style} type="user" size="5x"/>
                </div>
            </div>
        );
    }
}

export const title = 'font-icon';

export const markdown = `
用法类似于 ant 的 Icon组件    
`;
