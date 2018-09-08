import React from 'react';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from 'react-dnd';

const boxTarget = {
  drop() {
    return { name: 'DroppableBox' };
  }
};

export interface IDroppableBox {
  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
}

@DropTarget(
  'card',
  boxTarget,
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)
class DroppableBox extends React.Component<IDroppableBox> {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    const classNames = ['main__split-panel-content'];
    if (isActive) {
      classNames.push('active');
    }
    return connectDropTarget
      ? connectDropTarget(
          <div className={classNames.join(' ')}>
            {this.props.children}
          </div>
        )
      : null;
  }
}

export default DroppableBox;
