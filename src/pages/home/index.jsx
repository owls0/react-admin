import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import './style.less';

@config({
    path: '/',
    title: {local: 'home', text: '首页', icon: 'home'},
    breadcrumbs: [{local: 'home', text: '首页', icon: 'home'}],
})
export default class Home extends Component {
    render() {
        return (
            <PageContent>
                需要一个优秀的首页！！！
            </PageContent>
        );
    }
}
