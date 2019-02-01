import React from 'react';
import * as FontIcon from '@/library/antd/components/font-icon/demo/FontIcon';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';


@config({
    path: '/example/antd/font-icon',
})
export default class extends React.Component {
    render() {
        return (
            <PageContent>
                <FontIcon.default/>
            </PageContent>
        );
    }
};
