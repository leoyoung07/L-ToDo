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
import moment, { Moment } from 'moment';
import React from 'react';
import Task, { TaskState } from './Task';
import TaskList from './TaskList';
import { DeepClone } from './Util';

interface ITaskPanelProps {}
interface ITaskPanelState {
  newTask: { title: string; description: string; dueDate: Moment };
  tasks: Task[];
  drawerVisible: boolean;
}

class TaskPanel extends React.Component<ITaskPanelProps, ITaskPanelState> {
  constructor(props: ITaskPanelProps) {
    super(props);
    this.state = {
      newTask: {
        title: '',
        description: '',
        dueDate: moment()
      },
      tasks: [],
      drawerVisible: false
    };
    this.handleTaskStateChange = this.handleTaskStateChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleCreateTaskBtnClick = this.handleCreateTaskBtnClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
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
                  <Input
                    value={this.state.newTask.title}
                    placeholder="Something to do..."
                    onChange={this.handleTitleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="DateTime">
                  <DatePicker
                    value={this.state.newTask.dueDate}
                    style={{ width: '100%' }}
                    placeholder="Task deadline"
                    onChange={this.handleDueDateChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  <Input.TextArea
                    rows={4}
                    placeholder="describe the task..."
                    value={this.state.newTask.description}
                    onChange={this.handleDescriptionChange}
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
            <Button onClick={this.handleCreateTaskBtnClick} type="primary">
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

  private handleCreateTaskBtnClick() {
    const taskVal = this.state.newTask;
    const task = new Task(
      taskVal.title,
      taskVal.dueDate.format('YYYY-MM-DD'),
      taskVal.description
    );
    this.setState({
      tasks: this.state.tasks.concat([task])
    });
    this.handleDrawerClose();
  }

  private handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTask = {...this.state.newTask};
    newTask.title = e.target.value;
    this.setState({
      newTask
    });
  }

  private handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newTask = {...this.state.newTask};
    newTask.description = e.target.value;
    this.setState({
      newTask
    });
  }

  private handleDueDateChange(date: Moment, dateString: string) {
    const newTask = {...this.state.newTask};
    newTask.dueDate = date;
    this.setState({
      newTask
    });
  }
}

export default TaskPanel;
