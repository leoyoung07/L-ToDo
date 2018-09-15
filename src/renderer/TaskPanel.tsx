import { Button, Col, Divider, Row } from 'antd';
import React from 'react';
import Task, { TaskState } from './Task';
import TaskList from './TaskList';

interface ITaskPanelProps {
  tasks: Task[];
  handleDrawerOpen(): void;
  handleTaskStateChange(id: string, state: TaskState): void;
}
interface ITaskPanelState {

}

class TaskPanel extends React.Component<ITaskPanelProps, ITaskPanelState> {
  constructor(props: ITaskPanelProps) {
    super(props);
    this.state = {
      tasks: [],
    };
  }
  render() {
    return (
      <div className="main__split-panel">
        <Row
          className="main__split-panel-row"
          gutter={16}
          type="flex"
          justify="space-around"
        >
          <Col className="main__split-panel-col" span={8}>
            <div className="main__split-panel-box">
              <h3 className="main__split-panel-title">
                <span>To Do</span>
                <Button
                  shape="circle"
                  icon="plus"
                  type="primary"
                  size="small"
                  className="main__split-panel-icon-btn"
                  onClick={this.props.handleDrawerOpen}
                />
              </h3>
              <Divider className="main__split-panel-divider" />
              <TaskList
                state={TaskState.TODO}
                tasks={this.props.tasks}
                handleTaskStateChange={this.props.handleTaskStateChange}
              />
            </div>
          </Col>
          <Col className="main__split-panel-col" span={8}>
            <div className="main__split-panel-box">
              <h3 className="main__split-panel-title">
                <span>Doing</span>
              </h3>
              <Divider className="main__split-panel-divider" />
              <TaskList
                state={TaskState.DOING}
                tasks={this.props.tasks}
                handleTaskStateChange={this.props.handleTaskStateChange}
              />
            </div>
          </Col>
          <Col className="main__split-panel-col" span={8}>
            <div className="main__split-panel-box">
              <h3 className="main__split-panel-title">
                <span>Done</span>
              </h3>
              <Divider className="main__split-panel-divider" />
              <TaskList
                state={TaskState.DONE}
                tasks={this.props.tasks}
                handleTaskStateChange={this.props.handleTaskStateChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TaskPanel;
