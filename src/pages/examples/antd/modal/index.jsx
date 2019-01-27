import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as Base from '@/library/antd/components/modal/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {Button} from 'antd';
import {Modal} from '../sx-antd';

export default class Base extends Component {
    state = {
        visible: false,
    };

    handleClick = () => {
        this.setState({visible: true});
    };

    handleBeforeOpen = () => {
        console.log('打开了');
    };

    handleAfterClose = () => {
        console.log('关闭了');
    };

    render() {
        const {visible} = this.state;

        return (
            <div>
                <Button onClick={this.handleClick}>显示弹框</Button>
                <Modal
                    visible={visible}
                    title="标题"
                    onCancel={() => this.setState({visible: false})}
                    onOk={() => this.setState({visible: false})}
                    beforeOpen={this.handleBeforeOpen}
                    afterClose={this.handleAfterClose}
                >
                    我这里是弹框内容
                </Modal>
            </div>
        )
    }
}


        `,
    },
];
const readme = `# 弹框

扩展了beforeOpen属性，在弹框每次打开都会被调用

## 何时使用

弹框每次打开，需要做一些初始化工作的时候，比如修改用户弹框，每次打开要加载当前修改用户的数据

`;
const api = `## API


参数|说明|类型|默认值
---|---|---|---
beforeOpen | 弹框每次打开是会调用 | function() {} | -`;

@config({
    path: '/example/antd/modal',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
