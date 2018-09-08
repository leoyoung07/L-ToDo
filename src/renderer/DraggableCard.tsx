import { Card } from 'antd';
import React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd';
import Task from './Task';

export interface IBoxProps {
  task: Task;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
}

const boxSource = {
  beginDrag(props: IBoxProps) {
    return {
      task: props.task
    };
  },

  endDrag(props: IBoxProps, monitor: DragSourceMonitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      alert(`You dropped ${item.task.Id} into ${dropResult.name}!`);
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
class DraggableCard extends React.Component<IBoxProps> {
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
