import React from 'react';
import * as Basic from '@/library/antd/components/form-item-layout/demo/Basic';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/form-item-layout',
})
export default class extends React.Component {
    render() {
        return (
            <PageContent>
                <Basic.default/>
            </PageContent>
        );
    }
};
