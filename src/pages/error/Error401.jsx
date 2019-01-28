import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import config from '@/commons/config-hoc';
import './style.less';

@config({
    router: true,
})
export default class Error401 extends Component {

    state = {
        time: 9,
    };

    handleGoBack = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        this.sI = setInterval(() => {
            const time = this.state.time - 1;
            if (time === 0) this.handleGoBack();
            this.setState({time});

        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.sI);
    }

    render() {
        const {time} = this.state;
        return (
            <div styleName="root">
                <div styleName="header">
                    <h1>401</h1>
                    <h3>您还未登录!</h3>
                </div>
                <p styleName="intro">
                    您可以跳转到 <Link to="/login">登录</Link> 或者返回 <a onClick={this.handleGoBack}>上一步（{time}）</a>
                </p>
            </div>
        );
    }
}