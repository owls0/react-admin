import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import * as Base from '@/library/antd/components/permission/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {Button} from 'antd';
import {Permission} from '../sx-antd';


function hasPermission(code) {
    if (code === 'ADD_USER') return true;
}

export default class Base extends Component {
    render() {
        return (
            <div>
                <Permission
                    code="ADD_USER"
                    hasPermission={hasPermission}
                >
                    <Button>添加用户</Button>
                </Permission>
                <Permission
                    code="EXPORT_USER"
                    hasPermission={hasPermission}
                >
                    <Button style={{marginLeft: 8}}>导出用户</Button>
                </Permission>

                <Permission
                    useDisabled
                    code="EXPORT_ALL_USER"
                    hasPermission={hasPermission}
                >
                    <Button style={{marginLeft: 8}}>全部导出</Button>
                </Permission>
            </div>
        );
    }
}


        `,
    },
];
const readme = `# 权限

## 何时使用

判断权限的情况下

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
code | 权限码 | string | -
hasPermission | 判断函数 | function(code) {} | -
useDisabled | 没有权限的元素，将添加disabled属性 | bool | false`;

@config({
    path: '/example/antd/permission',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
