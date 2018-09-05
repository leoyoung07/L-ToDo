import { Card } from 'antd';
import React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd';

export interface IBoxProps {
  name: string;
  isDragging?: boolean;
  connectDragSource?: ConnectDragSource;
}

const boxSource = {
  beginDrag(props: IBoxProps) {
    return {
      name: props.name
    };
  },

  endDrag(props: IBoxProps, monitor: DragSourceMonitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`);
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
    return (
      <Card
        className="draggable-card"
        title="Card title"
        extra={<a href="#">More</a>}
        hoverable={true}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}

export default DraggableCard;
