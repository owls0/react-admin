import React from 'react';
import DemoPage from '@/library/antd/demo-page';
import config from '@/commons/config-hoc';

const demos = [];
const readme = ``;
const api = ``;

@config({
    path: '/example/antd/draggable-tabs-bar',
})
export default class extends React.Component {
    render() {
        return <DemoPage demos={demos} readme={readme} api={api}/>;
    }
};
