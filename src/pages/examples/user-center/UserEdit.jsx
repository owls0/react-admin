import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/users/_/UserEdit/:id',
    query: true,
    title: (params, query) => {
        return {text: `用户编辑-name:${query.name};id:${params.id}`, icon: 'edit'};
    },
})
export default class UserEdit extends Component {
    state = {};

    componentDidMount() {
        console.log(this.props.match);
    }

    render() {
        const {query} = this.props;
        return (
            <PageContent>
                UserEdit {query.name}
            </PageContent>
        );
    }
}

