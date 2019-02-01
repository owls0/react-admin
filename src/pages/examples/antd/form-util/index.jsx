import React from 'react';
import * as GetElement from '@/library/antd/components/form-util/demo/GetElement';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/form-util',
})
export default class extends React.Component {
    render() {
        return (
            <PageContent>
                <GetElement.default/>
            </PageContent>
        );
    }
};
