import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {toLogin} from "@/commons";
import config from '@/commons/config-hoc';
import './style.less';

@config({
    router: true,
    connect: state => ({
        local: state.system.i18n,
    }),
})
export default class Error401 extends Component {

    state = {
        time: 9,
    };

    handleGoBack = () => {
        this.props.history.goBack();
    };

    handleToLogin = () => {
        toLogin();
    };

    componentDidMount() {
        this.sI = setInterval(() => {
            const time = this.state.time - 1;

            if (time === 0) this.handleToLogin();

            this.setState({time});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.sI);
    }

    render() {
        const {history, local} = this.props;
        const {time} = this.state;
        return (
            <div styleName="root">
                <div styleName="header">
                    <h1>401</h1>
                    <h3>{local.errorPage.needLogin}</h3>
                </div>
                <p styleName="intro">
                    {local.errorPage.redirectTo}<Link to="/login"> {local.menu.login}({time}) </Link>
                    {history.length >= 2 ? <span>{local.errorPage.orReturn} <a onClick={this.handleGoBack}>{local.errorPage.previousStep}</a></span> : null}
                </p>
            </div>
        );
    }
}
