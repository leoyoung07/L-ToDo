import React from 'react';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from 'react-dnd';
import DraggableCard from './DraggableCard';
import Task, { TaskState } from './Task';

const boxTarget = {
  drop(props: IDroppableBox) {
    return { state: props.state };
  }
};

export interface IDroppableBox {
  tasks: Task[];
  state: TaskState;

  handleTaskStateChange: (taskId: string, newState: TaskState) => void;
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
              {this.props.tasks
                .filter(t => t.State === this.props.state)
                .map(task => {
                  return (
                    <DraggableCard
                      key={task.Id}
                      task={task}
                      handleTaskStateChange={this.props.handleTaskStateChange}
                    />
                  );
                })}
          </div>
        )
      : null;
  }
}

export default DroppableBox;
