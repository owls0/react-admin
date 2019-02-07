import React, {Component} from 'react';
import {DatePicker, Button} from 'antd';
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
                <Button onClick={() => this.props.history.push('/asdf')}>openTab</Button>
                <div style={{display: 'flex'}}>
                    <div style={{height: 50, flexGrow: 1, background: 'red'}}></div>
                    <div style={{height: 50, flexGrow: 2, background: 'green'}}></div>
                </div>
            </PageContent>
        );
    }
}

