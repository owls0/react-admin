import React, {Component} from 'react';
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
            </PageContent>
        );
    }
}

