import React from 'react';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from 'react-dnd';
import Task, { TaskState } from '../common/Task';
import TaskCard from './TaskCard';

const boxTarget = {
  drop(props: ITaskListProps) {
    return { state: props.state };
  }
};

export interface ITaskListProps {
  tasks: Task[];
  state: TaskState;

  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  handleTaskStateChange: (taskId: string, newState: TaskState) => void;
  handleEditBtnClick(task: Task): void;
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
class TaskList extends React.Component<ITaskListProps> {
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
                    <TaskCard
                      key={task.Id}
                      task={task}
                      handleTaskStateChange={this.props.handleTaskStateChange}
                      handleEditBtnClick={this.props.handleEditBtnClick}
                    />
                  );
                })}
          </div>
        )
      : null;
  }
}

export default TaskList;
