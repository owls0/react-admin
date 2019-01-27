import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';
import PageContent from '../../layouts/page-content';
import PreviewCode from './PreviewCode';
import './style.less';


export default class index extends Component {

    static defaultProps = {
        readme: '',
        api: '',
        demos: [],
    };

    state = {
        showCode: [],
    };

    componentDidMount() {

    }

    render() {
        const {demos, readme, api} = this.props;
        const {showCode} = this.state;

        return (
            <PageContent>
                <div styleName="sx-antd-demo-root">
                    <div styleName="left">
                        <div styleName="markdown">
                            <ReactMarkdown source={readme}/>
                            <ReactMarkdown source={'## 代码演示'}/>
                        </div>
                        {demos.map((item, index) => {
                            return (
                                <div id={index} styleName="box" key={index}>
                                    <div styleName="live-demo">
                                        <item.component/>
                                    </div>
                                    <div styleName="markdown">
                                        <div styleName="title">
                                            {item.title}
                                        </div>

                                        <div styleName="markdown description">
                                            <ReactMarkdown source={item.markdown}/>
                                        </div>
                                        <div styleName="code-icon" onClick={() => {
                                            const show = showCode[index];
                                            const sc = [...showCode];
                                            sc[index] = !show;
                                            this.setState({showCode: sc});
                                        }}>
                                            {showCode[index] ? (
                                                <img className="code-expand-icon-hide" alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"/>
                                            ) : (
                                                <img className="code-expand-icon-show" alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"/>
                                            )}
                                        </div>
                                    </div>
                                    <div styleName="code" style={{display: showCode[index] ? 'block' : 'none'}}>
                                        {process.env.NODE_ENV === 'development' ? <div style={{color: 'red'}}>开发模式下，为了提高编译效率，如下源码有时候不会被更新！！！</div> : null}
                                        <PreviewCode code={item.code}/>
                                    </div>
                                </div>
                            );
                        })}
                        <div styleName="markdown">
                            <ReactMarkdown source={api}/>
                        </div>
                    </div>
                    <ul styleName="right">
                        {demos.map((item, index) => {
                            return (
                                <li key={index}>
                                    <a href={`#${index}`}>{item.title}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </PageContent>
        );
    }
}
