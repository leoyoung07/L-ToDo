import { Card } from 'antd';
import React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd';
import Task, { TaskState } from './Task';

interface IDraggableCardProps {
  task: Task;

  handleTaskStateChange: (taskId: string, newState: TaskState) => void;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
}

interface IDraggableCardState {}

const boxSource = {
  beginDrag(props: IDraggableCardProps) {
    return {
      task: props.task
    };
  },

  endDrag(
    props: IDraggableCardProps,
    monitor: DragSourceMonitor,
    component: DraggableCard
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
class DraggableCard extends React.Component<
  IDraggableCardProps,
  IDraggableCardState
> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource
      ? connectDragSource(
          <div style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card
              className="draggable-card"
              title={this.props.task.Title}
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

export default DraggableCard;
