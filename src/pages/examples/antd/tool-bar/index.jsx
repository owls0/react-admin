import React from 'react';
import * as Basic from '@/library/antd/components/tool-bar/demo/Basic';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/tool-bar',
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
