import React from 'react';
import * as Basic from '@/library/antd/components/table-editable/demo/Basic';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/table-editable',
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
