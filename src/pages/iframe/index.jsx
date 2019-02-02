import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import './style.less';

@config({
    path: '/iframe_page_/:src',
    keepAlive: true,
    event: true,
})
export default class IFrame extends Component {

    state = {
        height: 800,
    };

    componentDidMount() {
        this.setHeight();
        this.props.addEventListener(window, 'resize', this.setHeight)
    }

    setHeight = () => {
        const otherHeight = 64 + 62;
        const windowHeight = window.document.documentElement.clientHeight;
        this.setState({height: windowHeight - otherHeight});
    };

    render() {
        let {src} = this.props.match.params;
        src = window.decodeURIComponent(src);
        const {height} = this.state;
        return (
            <div styleName="iframe" style={{fontSize: 0}}>
                <iframe
                    style={{height}}
                    title={src}
                    src={src}
                />
            </div>
        );
    }
}
