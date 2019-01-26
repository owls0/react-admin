import React, {Component} from 'react';
import {Radio, Card, Row, Col, Checkbox} from 'antd';
import PageContent from '../../layouts/page-content';
import config from '../../commons/config-hoc';

@config({
    path: '/settings',
    title: {local: 'setting', label: '设置'},
    breadcrumbs: [
        {
            key: '1',
            path: '/',
            text: '首页',
            icon: 'home',
            local: 'home',
        },
        {
            key: '2',
            path: '/settings',
            text: '设置',
            icon: 'setting',
            local: 'setting'
        },
    ],
    connect(state) {
        const {pageFrameLayout, pageHeadFixed, pageHeadShow} = state.settings;
        const {keepOtherOpen} = state.menu;
        const {i18n} = state.system;
        return {
            pageFrameLayout,
            pageHeadFixed,
            pageHeadShow,
            keepOtherMenuOpen: keepOtherOpen,
            i18n,
        };
    },
})
export default class Settings extends Component {

    handlePageFrameLayoutChange = (e) => {
        const {value} = e.target;
        const {action} = this.props;
        if (value === 'top-menu') {
            action.side.initWidth();
            action.side.setCollapsed(false);
        }
        action.settings.setPageFrameLayout(value);
    };

    handlePageHeadFixedChange = (e) => {
        const {checked} = e.target;
        this.props.action.settings.setPageHeadFixed(checked);
    };

    handlePageHeadShowChange = (e) => {
        const {checked} = e.target;
        const {action} = this.props;
        action.settings.showPageHead(checked);
        checked ? action.page.showHead() : action.page.hideHead();
    };

    handleKeepOtherMenuOpenChange = (e) => {
        const {checked} = e.target;
        this.props.action.menu.setKeepOtherOpen(checked);
    };

    render() {
        const {
            pageFrameLayout,
            pageHeadFixed,
            pageHeadShow,
            keepOtherMenuOpen,
            i18n: {setting: local},
        } = this.props;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const colStyle = {
            padding: '16px',
        };

        return (
            <PageContent>
                <Row>
                    <Col span={12} style={colStyle}>
                        <Card title={local.navigationLayout} style={{height: 272}}>
                            <Radio.Group onChange={this.handlePageFrameLayoutChange} value={pageFrameLayout}>
                                <Radio style={radioStyle} value="top-side-menu">{local.topSideMenu}</Radio>
                                <Radio style={radioStyle} value="top-menu">{local.topMenu}</Radio>
                                <Radio style={radioStyle} value="side-menu">{local.sideMenu}</Radio>
                            </Radio.Group>
                        </Card>
                    </Col>

                    <Col span={12} style={colStyle}>
                        <Card title={local.pageHeadSetting} style={{marginBottom: 16}}>
                            <Checkbox
                                onChange={this.handlePageHeadShowChange}
                                checked={pageHeadShow}
                            >{local.showHead}</Checkbox>

                            {pageHeadShow ? (
                                <Checkbox
                                    onChange={this.handlePageHeadFixedChange}
                                    checked={pageHeadFixed}
                                >{local.fixedHead}</Checkbox>
                            ) : null}
                        </Card>
                        <Card title={local.menuSetting}>
                            <Checkbox
                                onChange={this.handleKeepOtherMenuOpenChange}
                                checked={keepOtherMenuOpen}
                            >{local.keepMenuOpen}</Checkbox>
                        </Card>
                    </Col>
                </Row>
            </PageContent>
        );
    }
}
