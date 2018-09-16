import { Button, Col, DatePicker, Drawer, Form, Input, Row } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';
import Task from './Task';

export interface INewTask {
  title: string;
  description: string;
  dueDate: Moment;
}

interface INewTaskDrawerStatus {
  newTask: INewTask;
}

interface INewTaskDrawerProps {
  drawerVisible: boolean;

  current?: Task;
  handleCreateTaskBtnClick(newTask: INewTask): void;
  handleSaveTaskBtnClick(id: string, newTask: INewTask): void;
  handleDrawerClose(): void;
}

class NewTaskDrawer extends React.Component<
  INewTaskDrawerProps,
  INewTaskDrawerStatus
> {
  constructor(props: INewTaskDrawerProps) {
    super(props);
    this.state = {
      newTask: {
        title: '',
        description: '',
        dueDate: moment()
      }
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps: INewTaskDrawerProps) {
    if (nextProps.current) {
      const newTask: INewTask = {
        title: nextProps.current.Title,
        description: nextProps.current.Content ? nextProps.current.Content : '',
        dueDate: moment(nextProps.current.DueDate)
      };
      this.setState({
        newTask: newTask
      });
    }
  }

  render() {
    const BottomButtons = () => {
      if (this.props.current) {
        return (
          <Button
            onClick={() => {
              this.props.handleSaveTaskBtnClick(
                this.props.current!.Id,
                this.state.newTask
              );
            }}
            type="primary"
          >
            Save
          </Button>
        );
      } else {
        return (
          <Button
            onClick={() => {
              this.props.handleCreateTaskBtnClick(this.state.newTask);
            }}
            type="primary"
          >
            Add
          </Button>
        );
      }
    };
    return (
      <Drawer
        title={this.props.current ? 'Edit Task' : 'Add New Task'}
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
                  value={this.state.newTask.title}
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
                  placeholder="Describe the task..."
                  value={this.state.newTask.description}
                  onChange={this.handleDescriptionChange}
                />
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
    const newTask = { ...this.state.newTask };
    newTask.title = e.target.value;
    this.setState({
      newTask
    });
  }

  private handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newTask = { ...this.state.newTask };
    newTask.description = e.target.value;
    this.setState({
      newTask
    });
  }

  private handleDueDateChange(date: Moment) {
    const newTask = { ...this.state.newTask };
    newTask.dueDate = date;
    this.setState({
      newTask
    });
  }
}

export default NewTaskDrawer;
