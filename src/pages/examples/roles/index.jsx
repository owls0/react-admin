import React, {Component} from 'react';
import {DatePicker} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/roles',
})
export default class index extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                init roles
                <DatePicker/>
                <div style={{height: 600, background: 'blue'}}/>
            </PageContent>
        );
    }
}

