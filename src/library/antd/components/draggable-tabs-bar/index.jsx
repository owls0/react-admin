import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from 'react-sortable-hoc';
import classNames from 'classnames';
import './style.less';


const SortableItem = SortableElement((props) => {
    const {children} = props;
    return (
        <div
            className={classNames('draggable-tabs-bar-horizontal-item', props.className)}
            style={props.style}
        >
            {children}
        </div>
    );
});

const SortableContainerList = SortableContainer(props => {
    const {
        className,
        dataSource,
        activeKey,
        itemClass,
        onClose,
        onClick,
        itemWrapper,
        isSorting,
    } = props;

    return (
        <div className={classNames('draggable-tabs-bar-root', className, {sorting: isSorting})}>
            {dataSource.map((item, index) => {
                const {key, title, closable} = item;
                const isActive = activeKey === key;
                let itemJsx = [
                    (
                        <div key="item" className="item-inner" onClick={(e) => onClick && onClick(item, e)}>
                            {title}
                        </div>
                    ),
                    (
                        closable ? (
                            <div key="close" className="close-wrapper" onClick={(e) => onClose && onClose(item, e)}>
                                <Icon type="close"/>
                            </div>
                        ) : null
                    )
                ];

                if (itemWrapper) {
                    itemJsx = itemWrapper(itemJsx, item);
                }
                return (
                    <SortableItem
                        key={key}
                        className={classNames(itemClass, {'active': isActive})}
                        index={index}
                    >
                        {itemJsx}
                    </SortableItem>
                );
            })}
        </div>
    );
});

export default class DraggableTabsBar extends Component {
    state = {
        itemLength: 0,
        isSorting: false,
    };

    static propTypes = {
        dataSource: PropTypes.array,
        className: PropTypes.string,
        activeKey: PropTypes.any,
        onSortStart: PropTypes.func,
        onSortEnd: PropTypes.func,
        onClose: PropTypes.func,
        onClick: PropTypes.func,
        itemWrapper: PropTypes.func,
    };

    static defaultProps = {
        className: classNames('list', 'stylizedList'),
    };


    componentDidUpdate(prevProps) {
        const {dataSource} = this.props;
        const {dataSource: prevDataSource} = prevProps;

        if (prevDataSource.length !== dataSource.length) {
            const maxWidth = 180;
            const items = document.querySelectorAll('.draggable-tabs-bar-horizontal-item');
            const rootContainer = document.querySelector('.draggable-tabs-bar-root');
            const itemCount = items.length;
            const rootContainerWidth = rootContainer.clientWidth;
            const maxCount = Math.floor(rootContainerWidth / maxWidth);

            if (itemCount < maxCount) {
                items.forEach(itemNode => {
                    itemNode.style.width = `${maxWidth}px`;
                });
            } else {
                if (dataSource.length < prevDataSource.length) {
                    console.log('删除操作');
                    if (this.ST) window.clearTimeout(this.ST);
                    this.ST = setTimeout(() => {
                        items.forEach(itemNode => {
                            itemNode.style.width = `${rootContainerWidth / itemCount}px`;
                        });
                    }, 2000);
                } else {
                    items.forEach(itemNode => {
                        itemNode.style.width = `${rootContainerWidth / itemCount}px`;
                    });
                }
            }
        }
    }

    onSortStart = (info, event) => {
        const {index} = info;
        const {onSortStart, dataSource} = this.props;
        const item = dataSource[index];
        this.setState({isSorting: true});

        if (onSortStart) {
            onSortStart(item, info, event);
        }
    };

    onSortEnd = (info, event) => {
        const {oldIndex, newIndex} = info;
        const {onSortEnd} = this.props;
        const dataSource = [...this.props.dataSource];
        const sortedDataSource = arrayMove(dataSource, oldIndex, newIndex);

        this.setState({isSorting: false});

        if (onSortEnd) {
            onSortEnd(sortedDataSource, info, event);
        }
    };

    render() {
        const {
            dataSource,
            activeKey,
            onClose,
            onClick,
            itemWrapper,
        } = this.props;
        const {isSorting} = this.state;
        const props = {
            isSorting,
            dataSource,
            activeKey,
            onSortEnd: this.onSortEnd,
            onSortStart: this.onSortStart,
            axis: 'x',
            distance: 1,
            ref: 'component',
            onClose,
            onClick,
            itemWrapper,
        };

        return <SortableContainerList {...props} />;
    }
}
