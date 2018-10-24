import { Card, Icon, Tag } from 'antd';
import React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd';
import Task, { TaskPriority, TaskState } from '../common/Task';

interface ITaskCardProps {
  task: Task;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;

  handleTaskStateChange(taskId: string, newState: TaskState): void;
  handleEditBtnClick(task: Task): void;
  handleDeleteBtnClick(task: Task): void;
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
    const mapPriorityColor = (priority: TaskPriority) => {
      switch (priority) {
        case TaskPriority.HIGH:
          return 'red';
        case TaskPriority.MIDDLE:
          return 'blue';
        case TaskPriority.LOW:
          return 'green';
        default:
          return 'blue';
      }
    };
    const cardTitle = (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>{this.props.task.Title}</span>
          <span>
            <a
              href="#"
              onClick={() => {
                this.props.handleEditBtnClick(this.props.task);
              }}
            >
              <Icon type="edit" style={{ marginRight: '8px' }} />
            </a>
            <a
              href="#"
              onClick={() => {
                this.props.handleDeleteBtnClick(this.props.task);
              }}
            >
              <Icon type="delete" />
            </a>
          </span>
        </div>
        <div>
          {this.props.task.Priority ? (
            <Tag
              color={mapPriorityColor(this.props.task.Priority)}
              onClick={() => {
                this.props.handleEditBtnClick(this.props.task);
              }}
            >
              {this.props.task.Priority}
            </Tag>
          ) : null}
          {this.props.task.DueTimeBegin || this.props.task.DueTimeEnd ? (
            <span className="task-card__due-time">
              <span>{this.props.task.DueTimeBegin}</span>-
              <span>{this.props.task.DueTimeEnd}</span>
            </span>
          ) : null}
        </div>
      </div>
    );
    return connectDragSource
      ? connectDragSource(
          <div style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card className="task-card" title={cardTitle} hoverable={true}>
              <p>{this.props.task.Content}</p>
            </Card>
          </div>
        )
      : null;
  }
}

export default TaskCard;
