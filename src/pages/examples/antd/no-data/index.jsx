import React from 'react';
import DemoPage from '@/layouts/demo-page';
import * as Base from '@/library/antd/components/no-data/demo/Base';
import config from '@/commons/config-hoc';

const demos = [
    {
        component: Base.default,
        title: Base.title,
        markdown: Base.markdown,
        code: `
import React, {Component} from 'react';
import {NoData} from '../sx-antd';

export default class Base extends Component {
    state = {};

    render() {
        return (
            <NoData/>
        );
    }
}



        `,
    },
];
const readme = `# 暂无数据

`;
const api = `## API

无`;

@config({
    path: '/example/antd/no-data',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
