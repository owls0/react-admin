import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import config from '@/commons/config-hoc';
import './style.less';

@config({
    router: true,
    connect: state => ({
        local: state.system.i18n,
    }),
})
export default class Error404 extends Component {
    state = {
        time: 9,
    };

    handleGoBack = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        if (this.props.history.length >= 2) {
            this.sI = setInterval(() => {
                const time = this.state.time - 1;

                if (time === 0) this.handleGoBack();

                this.setState({time});
            }, 1000);
        }
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
                    <h1>404</h1>
                    <h3>{local.errorPage.pageNotFound}</h3>
                </div>
                <p styleName="intro">
                    {local.errorPage.redirectTo}<Link to="/"> {local.menu.home} </Link>
                    {history.length >= 2 ? <span>{local.errorPage.orReturn} <a onClick={this.handleGoBack}>{local.errorPage.previousStep}（{time}）</a></span> : null}
                </p>
            </div>
        );
    }
}
