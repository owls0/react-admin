import React, {Component} from 'react';
import {Button, DatePicker} from 'antd';
import config from '@/commons/config-hoc';
import './style.less';

const {MonthPicker} = DatePicker;

@config({
    path: '/',
    header: false,
    side: false,
    sideCollapsed: true,
    connect(state) {
        return {i18n: state.system.i18n};
    },
})
export default class Home extends Component {
    state = {};

    componentDidMount() {
        // console.log(this.props);
    }

    render() {
        const {i18n} = this.props;
        console.log('home render', i18n);
        return (
            <div styleName="root">
                {i18n.menu.example}
                <DatePicker/>
                <MonthPicker placeholder="请选择月份"/>
                <Button type="primary">OK</Button>
            </div>
        );
    }
}
