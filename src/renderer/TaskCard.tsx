import { Card } from 'antd';
import React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd';
import Task, { TaskState } from './Task';

interface ITaskCardProps {
  task: Task;

  handleTaskStateChange: (taskId: string, newState: TaskState) => void;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
}

interface ITaskCardState {}

const boxSource = {
  beginDrag(props: ITaskCardProps) {
    return {
      task: props.task
    };
  },

  endDrag(
    props: ITaskCardProps,
    monitor: DragSourceMonitor,
    component: TaskCard
  ) {
    const item = monitor.getItem() as { task: Task };
    const dropResult = monitor.getDropResult() as { state: TaskState };
    if (dropResult) {
      component.props.handleTaskStateChange(item.task.Id, dropResult.state);
    }
  }
};

@DragSource(
  'card',
  boxSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)
class TaskCard extends React.Component<ITaskCardProps, ITaskCardState> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const cardTitle = (
      <div>
        {this.props.task.Title}
        <span className="task-card__due-date">{this.props.task.DueDate}</span>
      </div>
    );
    return connectDragSource
      ? connectDragSource(
          <div style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card
              className="task-card"
              title={cardTitle}
              extra={<a href="#">More</a>}
              hoverable={true}
            >
              <p>{this.props.task.Content}</p>
            </Card>
          </div>
        )
      : null;
  }
}

export default TaskCard;
