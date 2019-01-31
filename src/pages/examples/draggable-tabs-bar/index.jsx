import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
            value,
        };
    });
}

const Item = SortableElement((props) => {
    return (
        <div
            className={classNames('horizontal-item', props.className)}
            style={props.style}
        >
            Item{props.value}
        </div>
    );
});

const SortableList = SortableContainer(options => {
    const {className, items, itemClass} = options;
    return (
        <div className={classNames('root', className)}>
            <div className="wrapper" id="wrapper">
                {items.map(({value}, index) => (
                    <Item
                        key={`item-${value}`}
                        className={itemClass}
                        index={index}
                        value={value}
                    />
                ))}
            </div>
        </div>
    );
});


export const PAGE_ROUTE = '/example/draggable-tabs';

export default class DraggableTabsBar extends Component {
    state = {
        items: getItems(20, 50),
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

    render() {
        const {items, isSorting} = this.state;
        const props = {
            isSorting,
            items,
            onSortEnd: this.onSortEnd,
            onSortStart: this.onSortStart,
            axis: 'x',
            ref: 'component',
        };

        return <SortableList {...this.props} {...props} />;
    }
}
