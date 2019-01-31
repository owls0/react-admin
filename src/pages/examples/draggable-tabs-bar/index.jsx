import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc';
import range from 'lodash/range';
import classNames from 'classnames';
import './style.css';

function getItems(count) {
    return range(count).map((value) => {
        return {
            value: value + 1,
        };
    });
}

const Item = SortableElement((props) => {
    const {children} = props;
    return (
        <div
            className={classNames('horizontal-item', props.className)}
            style={props.style}
        >
            {children}
        </div>
    );
});

const SortableList = SortableContainer(props => {
    const {className, items, itemClass, onClose} = props;
    return (
        <div className={classNames('root', className)}>
            {items.map((item, index) => {
                const {value} = item;

                return (
                    <Item
                        key={`item-${value}`}
                        className={itemClass}
                        index={index}
                    >
                        <Icon type="smile"/>
                        <div className="item-inner">
                            {`${value} Item Item Item Item`}
                            <span style={{display: 'inline-block'}}>妈的我是span内容</span>
                        </div>
                        <Icon type="close" onClick={() => onClose(item)}/>
                    </Item>
                );
            })}
        </div>
    );
});

class DraggableTabsBar extends Component {
    state = {
        items: getItems(15, 50),
        isSorting: false,
    };

    static propTypes = {
        items: PropTypes.array,
        className: PropTypes.string,
        onSortStart: PropTypes.func,
        onSortEnd: PropTypes.func,
        component: PropTypes.func,
    };

    static defaultProps = {
        className: classNames('list', 'stylizedList'),
    };

    onSortStart = () => {
        const {onSortStart} = this.props;
        this.setState({isSorting: true});

        if (onSortStart) {
            onSortStart(this.refs.component);
        }
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        const {onSortEnd} = this.props;
        const {items} = this.state;

        this.setState({
            items: arrayMove(items, oldIndex, newIndex),
            isSorting: false,
        });

        if (onSortEnd) {
            onSortEnd(this.refs.component);
        }
    };

    onClose = (item) => {
        const {value} = item;
        console.log(value);
        const {items} = this.state;
        items.splice(value, 1);
        this.setState({items});
    };

    render() {
        const {items, isSorting} = this.state;
        const props = {
            isSorting,
            items,
            onSortEnd: this.onSortEnd,
            onSortStart: this.onSortStart,
            axis: 'x',
            distance: 1,
            ref: 'component',
            onClose: this.onClose,
        };

        return <SortableList {...props} />;
    }
}


export const PAGE_ROUTE = '/example/draggable-tabs';

export default class App extends Component {

    render() {
        return (
            <div style={{marginTop: 50, overflow: 'hidden'}}>
                <DraggableTabsBar/>
            </div>
        );

    }
}
