import { Button, Col, Divider, Row } from 'antd';
import React from 'react';
import Task, { TaskState } from '../common/Task';
import TaskList from './TaskList';

interface ITaskPanelProps {
  tasks: Task[];
  handleAddBtnClick(): void;
  handleTaskStateChange(id: string, state: TaskState): void;
  handleEditBtnClick(task: Task): void;
  handleDeleteBtnClick(task: Task): void;
}
interface ITaskPanelState {

}

class TaskPanel extends React.Component<ITaskPanelProps, ITaskPanelState> {
  constructor(props: ITaskPanelProps) {
    super(props);
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
                  onClick={this.props.handleAddBtnClick}
                />
              </h3>
              <Divider className="main__split-panel-divider" />
              <TaskList
                state={TaskState.TODO}
                tasks={this.props.tasks}
                handleTaskStateChange={this.props.handleTaskStateChange}
                handleEditBtnClick={this.props.handleEditBtnClick}
                handleDeleteBtnClick={this.props.handleDeleteBtnClick}
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
                handleEditBtnClick={this.props.handleEditBtnClick}
                handleTaskStateChange={this.props.handleTaskStateChange}
                handleDeleteBtnClick={this.props.handleDeleteBtnClick}
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
                handleEditBtnClick={this.props.handleEditBtnClick}
                handleTaskStateChange={this.props.handleTaskStateChange}
                handleDeleteBtnClick={this.props.handleDeleteBtnClick}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TaskPanel;
