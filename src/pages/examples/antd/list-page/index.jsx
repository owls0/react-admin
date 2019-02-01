import React from 'react';
import * as Base from '@/library/antd/components/list-page/demo/Base';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/list-page',
})
export default class extends React.Component {
    render() {
        return (
            <PageContent>
                <Base.default/>
            </PageContent>
        );
    }
};
