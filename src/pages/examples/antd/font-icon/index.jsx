import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as FontIcon from '@/library/antd/components/font-icon/demo/FontIcon';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: FontIcon.default,
        title: FontIcon.title,
        markdown: FontIcon.markdown,
        code: `
import React, {Component} from 'react';
import {FontIcon} from '../sx-antd';

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


        `,
    },
];
const readme = `# 图标

antd官方图标 + font awesome 图标

## 何时使用
在antd 官方图标不满足需求时，可以使用此图标

`;
const api = `## API


### FontIcon

参数|说明|类型|默认值
---|---|---|---
type | 图标类型，font awesome图标添加fa-前缀，比如 fa-users | string | -
size | 图标大小，antd图标 fa图标 统一，1x 2x 3x 4x 5x | string | '1x'`;

@config({
    path: '/example/antd/font-icon',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
