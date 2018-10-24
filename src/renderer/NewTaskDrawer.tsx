import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  TimePicker
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import moment, { Moment } from 'moment';
import React from 'react';
import Task, { TaskPriority } from '../common/Task';

interface INewTaskDrawerStatus {
  draftTask: Task;
}

interface INewTaskDrawerProps {
  drawerVisible: boolean;

  isNewMode: boolean;
  draftTask: Task;
  handleCreateTaskBtnClick(draftTask: Task): void;
  handleSaveTaskBtnClick(draftTask: Task): void;
  handleDrawerClose(): void;
}

class NewTaskDrawer extends React.Component<
  INewTaskDrawerProps,
  INewTaskDrawerStatus
> {
  constructor(props: INewTaskDrawerProps) {
    super(props);
    this.state = {
      draftTask: props.draftTask
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDueTimeBeginChange = this.handleDueTimeBeginChange.bind(this);
    this.handleDueTimeEndChange = this.handleDueTimeEndChange.bind(this);
  }
  render() {
    const BottomButtons = () => {
      if (this.props.isNewMode) {
        return (
          <Button
            onClick={() => {
              this.props.handleCreateTaskBtnClick(this.state.draftTask);
            }}
            type="primary"
          >
            Add
          </Button>
        );
      } else {
        return (
          <Button
            onClick={() => {
              this.props.handleSaveTaskBtnClick(this.state.draftTask);
            }}
            type="primary"
          >
            Save
          </Button>
        );
      }
    };
    return (
      <Drawer
        title={this.props.isNewMode ? 'Add New Task' : 'Edit Task'}
        width={500}
        placement="right"
        onClose={this.props.handleDrawerClose}
        maskClosable={false}
        visible={this.props.drawerVisible}
        style={{
          overflow: 'auto'
        }}
      >
        <Form layout="vertical" hideRequiredMark={true}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Title">
                <Input
                  value={this.state.draftTask.Title}
                  placeholder="Something to do..."
                  onChange={this.handleTitleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Date">
                <DatePicker
                  value={moment(this.state.draftTask.DueDate)}
                  style={{ width: '100%' }}
                  placeholder="Task deadline"
                  onChange={this.handleDueDateChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Begin Time">
                <TimePicker
                  value={
                    this.props.draftTask.DueTimeBegin
                      ? moment(this.state.draftTask.DueTimeBegin, 'HH:mm:ss')
                      : moment('00:00:00', 'HH:mm:ss')
                  }
                  style={{ width: '100%' }}
                  placeholder="Task Begin Time"
                  onChange={this.handleDueTimeBeginChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Time">
                <TimePicker
                  value={
                    this.props.draftTask.DueTimeEnd
                      ? moment(this.state.draftTask.DueTimeEnd, 'HH:mm:ss')
                      : moment('23:59:59', 'HH:mm:ss')
                  }
                  style={{ width: '100%' }}
                  placeholder="Task End Time"
                  onChange={this.handleDueTimeEndChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Description">
                <Input.TextArea
                  rows={4}
                  placeholder="Describe the task..."
                  value={this.state.draftTask.Content}
                  onChange={this.handleDescriptionChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Priority">
                <Radio.Group
                  value={this.state.draftTask.Priority}
                  defaultValue={TaskPriority.MIDDLE}
                  buttonStyle="solid"
                  onChange={this.handlePriorityChange}
                >
                  <Radio.Button value={TaskPriority.HIGH}>
                    {TaskPriority.HIGH}
                  </Radio.Button>
                  <Radio.Button value={TaskPriority.MIDDLE}>
                    {TaskPriority.MIDDLE}
                  </Radio.Button>
                  <Radio.Button value={TaskPriority.LOW}>
                    {TaskPriority.LOW}
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="new-task-drawer__footer">
          <BottomButtons />
        </div>
      </Drawer>
    );
  }

  private handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const draftTask = { ...this.state.draftTask };
    draftTask.Title = e.target.value;
    this.setState({
      draftTask
    });
  }

  private handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const draftTask = { ...this.state.draftTask };
    draftTask.Content = e.target.value;
    this.setState({
      draftTask
    });
  }

  private handleDueDateChange(date: Moment) {
    const draftTask = { ...this.state.draftTask };
    draftTask.DueDate = date.format('YYYY-MM-DD');
    this.setState({
      draftTask
    });
  }

  private handleDueTimeBeginChange(time: Moment) {
    const draftTask = { ...this.state.draftTask };
    draftTask.DueTimeBegin = time.format('HH:mm:ss');
    if (!draftTask.DueTimeEnd || draftTask.DueTimeBegin > draftTask.DueTimeEnd) {
      draftTask.DueTimeEnd = draftTask.DueTimeBegin;
    }
    this.setState({
      draftTask
    });
  }

  private handleDueTimeEndChange(time: Moment) {
    const draftTask = { ...this.state.draftTask };
    draftTask.DueTimeEnd = time.format('HH:mm:ss');
    if (!draftTask.DueTimeBegin || draftTask.DueTimeBegin > draftTask.DueTimeEnd) {
      draftTask.DueTimeBegin = draftTask.DueTimeEnd;
    }
    this.setState({
      draftTask
    });
  }

  private handlePriorityChange(e: RadioChangeEvent) {
    const draftTask = { ...this.state.draftTask };
    draftTask.Priority = e.target.value
      ? (e.target.value as TaskPriority)
      : draftTask.Priority;
    this.setState({
      draftTask
    });
  }
}

export default NewTaskDrawer;
