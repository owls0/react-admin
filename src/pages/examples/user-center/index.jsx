import React, {Component} from 'react';
import {Button} from 'antd';
import PageContent from '@/layouts/page-content';
import FixBottom from '@/layouts/fix-bottom';

export const PAGE_ROUTE = '/user-center';

export default class index extends Component {
    state = {};

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                用户中心
                <div style={{height: 200, background: 'red'}}></div>
                <FixBottom>
                    <Button>按钮</Button>
                    <Button type="primary">按钮</Button>
                </FixBottom>
            </PageContent>
        );
    }
}
