import { Button, Col, Divider, Row } from 'antd';
import React from 'react';
import NewTaskDrawer, { INewTask } from './NewTaskDrawer';
import Task, { TaskState } from './Task';
import TaskList from './TaskList';
import { DeepClone } from './Util';

interface ITaskPanelProps {}
interface ITaskPanelState {
  tasks: Task[];
  drawerVisible: boolean;
}

class TaskPanel extends React.Component<ITaskPanelProps, ITaskPanelState> {
  constructor(props: ITaskPanelProps) {
    super(props);
    this.state = {
      tasks: [],
      drawerVisible: false
    };
    this.handleTaskStateChange = this.handleTaskStateChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleCreateTaskBtnClick = this.handleCreateTaskBtnClick.bind(this);
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
                  onClick={this.handleDrawerOpen}
                />
              </h3>
              <Divider className="main__split-panel-divider" />
              <TaskList
                state={TaskState.TODO}
                tasks={this.state.tasks}
                handleTaskStateChange={this.handleTaskStateChange}
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
                tasks={this.state.tasks}
                handleTaskStateChange={this.handleTaskStateChange}
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
                tasks={this.state.tasks}
                handleTaskStateChange={this.handleTaskStateChange}
              />
            </div>
          </Col>
        </Row>
        <NewTaskDrawer
          drawerVisible={this.state.drawerVisible}
          handleCreateTaskBtnClick={this.handleCreateTaskBtnClick}
          handleDrawerClose={this.handleDrawerClose}
        />
      </div>
    );
  }

  private handleTaskStateChange(id: string, state: TaskState) {
    const newTasks = DeepClone(this.state.tasks);
    const currentTask = newTasks.find(t => t.Id === id);
    if (currentTask) {
      currentTask.State = state;
      this.setState({
        tasks: newTasks
      });
    }
  }

  private handleDrawerOpen() {
    this.setState({
      drawerVisible: true
    });
  }
  private handleDrawerClose() {
    this.setState({
      drawerVisible: false
    });
  }

  private handleCreateTaskBtnClick(newTask: INewTask) {
    const task = new Task(
      newTask.title,
      newTask.dueDate.format('YYYY-MM-DD'),
      newTask.description
    );
    this.setState({
      tasks: this.state.tasks.concat([task])
    });
    this.handleDrawerClose();
  }
}

export default TaskPanel;
