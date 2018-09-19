import { Button, Col, DatePicker, Drawer, Form, Input, Row } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';
import Task from '../common/Task';

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
              this.props.handleSaveTaskBtnClick(
                this.state.draftTask
              );
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
}

export default NewTaskDrawer;
