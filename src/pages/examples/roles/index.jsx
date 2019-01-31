import React, {Component} from 'react';
import {DatePicker} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/roles',
})
export default class RoleList extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        console.log('render Role');
        return (
            <PageContent>
                init roles
                <DatePicker/>
                <div style={{height: 600, background: 'blue'}}/>
            </PageContent>
        );
    }
}

