import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';

@config({
    path: '/example/users/_/UserEdit/:id',
    query: true,
    title: (props) => {
        const {query, match: {params}} = props;
        return {text: `用户编辑-name:${query.name};id:${params.id}`, icon: 'edit'};
    },
    breadcrumbs: (props) => {
        const {query, match: {params}} = props;
        return [
            {key: 0, local: 'userEdit', icon: 'user', text: '用户编辑'},
            {key: 1, text: params.id},
            {key: 2, text: query.name},
        ];
    },
})
export default class UserEdit extends Component {
    state = {};

    componentDidMount() {
    }

    render() {
        console.log('render UserEdit.jsx');
        const {query} = this.props;
        return (
            <PageContent>
                UserEdit {query.name}
            </PageContent>
        );
    }
}

