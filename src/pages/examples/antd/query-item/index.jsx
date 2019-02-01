import React from 'react';
import * as Base from '@/library/antd/components/query-item/demo/Base';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/query-item',
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
