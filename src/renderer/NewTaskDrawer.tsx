import { Button, Col, DatePicker, Drawer, Form, Input, Row } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';

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
  handleCreateTaskBtnClick(newTask: INewTask): void;
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
  render() {
    return (
      <Drawer
        title="Add New Task"
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
        <div className="new-task-drawer__footer">
          <Button
            onClick={() => {
              this.props.handleCreateTaskBtnClick(this.state.newTask);
            }}
            type="primary"
          >
            Add
          </Button>
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
