import { Card } from 'antd';
import React from 'react';
class DraggableCard extends React.Component {
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
