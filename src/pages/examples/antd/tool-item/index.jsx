import React from 'react';
import * as Base from '@/library/antd/components/tool-item/demo/Base';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/tool-item',
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
