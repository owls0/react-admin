import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/users/_/UserEdit/:id',
    title: {local: 'userEdit', text: '用户编辑', icon: 'edit'}
})
export default class UserEdit extends Component {
    state = {};

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                init UserEdit
            </PageContent>
        );
    }
}

