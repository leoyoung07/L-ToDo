import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row
} from 'antd';
import React from 'react';
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
      tasks: [new Task('Test...', 'Something to do...')],
      drawerVisible: false
    };
    this.handleTaskStateChange = this.handleTaskStateChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
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
        <Drawer
          title="Add New Task"
          width={500}
          placement="right"
          onClose={this.handleDrawerClose}
          maskClosable={false}
          visible={this.state.drawerVisible}
          style={{
            overflow: 'auto'
          }}
        >
          <Form layout="vertical" hideRequiredMark={true}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Title">
                  <Input placeholder="please enter title" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="DateTime">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right'
            }}
          >
            <Button
              onClick={this.handleDrawerClose}
              type="primary"
            >
              Add
            </Button>
          </div>
        </Drawer>
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
}

export default TaskPanel;
