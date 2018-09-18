import { Breadcrumb, Button, Icon, Layout } from 'antd';
import moment from 'moment';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NewTaskDrawer from './NewTaskDrawer';
import SideBar, { ISideBarItem } from './SideBar';
import Task, { TaskState } from './Task';
import TaskPanel from './TaskPanel';
import { DeepClone } from './Util';

const { Content } = Layout;

function getDaysOfWeek() {
  const days = [];
  for (let index = 1; index <= 7; index++) {
    const day = moment().isoWeekday(index);
    days.push(day.format('YYYY-MM-DD'));
  }
  return days;
}

interface IMainProps {}

interface IMainState {
  siderCollapsed: boolean;
  sideBarItems: ISideBarItem[];

  drawerVisible: boolean;
  tasks: Task[];
  date: string;
  currentEditingTask?: Task;
}

@DragDropContext(HTML5Backend)
class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    const days = getDaysOfWeek();
    this.state = {
      siderCollapsed: true,
      sideBarItems: days.map(day => {
        return {
          text: day,
          value: day
        };
      }),
      drawerVisible: false,
      tasks: [],
      date: moment().format('YYYY-MM-DD')
    };

    this.handleSiderCollapse = this.handleSiderCollapse.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleCreateTaskBtnClick = this.handleCreateTaskBtnClick.bind(this);
    this.handleTaskStateChange = this.handleTaskStateChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    this.handleSaveTaskBtnClick = this.handleSaveTaskBtnClick.bind(this);

    (async () => {
      const tasks = await this.readFromFile();
      this.setState({
        tasks
      });
    })();
  }
  render() {
    return (
      <Layout>
        <Layout>
          <SideBar
            collapsed={this.state.siderCollapsed}
            items={this.state.sideBarItems}
            handleItemClick={this.handleItemClick}
            current={this.state.date}
          />
          <Layout style={{ padding: '0 24px 24px' }}>
            <div className="main__header">
              <Button type="primary" onClick={this.handleSiderCollapse}>
                <Icon
                  type={this.state.siderCollapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </Button>
              <div className="main__header-text">
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>L-ToDo</Breadcrumb.Item>
                  <Breadcrumb.Item>{this.state.date}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <Content className="main__content">
              <TaskPanel
                tasks={this.state.tasks.filter(
                  task => task.DueDate === this.state.date
                )}
                handleAddBtnClick={this.handleAddBtnClick}
                handleEditBtnClick={this.handleEditBtnClick}
                handleTaskStateChange={this.handleTaskStateChange}
              />
            </Content>
            <NewTaskDrawer
              drawerVisible={this.state.drawerVisible}
              handleCreateTaskBtnClick={this.handleCreateTaskBtnClick}
              handleSaveTaskBtnClick={this.handleSaveTaskBtnClick}
              handleDrawerClose={this.handleDrawerClose}
              current={this.state.currentEditingTask}
            />
          </Layout>
        </Layout>
      </Layout>
    );
  }

  private handleSiderCollapse(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      siderCollapsed: !this.state.siderCollapsed
    });
  }

  private handleAddBtnClick() {
    this.setState({
      currentEditingTask: undefined,
      drawerVisible: true
    });
  }
  private handleDrawerClose() {
    this.setState({
      drawerVisible: false
    });
  }
  private async handleCreateTaskBtnClick(newTask: Task) {
    const newTasks = this.state.tasks.concat([newTask]);
    this.setState({
      tasks: newTasks
    });
    this.handleDrawerClose();
    await this.saveToFile(newTasks);
  }

  private async handleSaveTaskBtnClick(id: string, newTask: Task) {
    const tasks = DeepClone(this.state.tasks);
    const task = tasks.find(t => t.Id === id);
    if (task) {
      task.Title = newTask.Title;
      task.Content = newTask.Content;
      task.DueDate = newTask.DueDate;
      this.setState({
        tasks: tasks
      });
      this.handleDrawerClose();
      await this.saveToFile(tasks);
    }
  }
  private async handleTaskStateChange(id: string, state: TaskState) {
    const newTasks = DeepClone(this.state.tasks);
    const currentTask = newTasks.find(t => t.Id === id);
    if (currentTask) {
      currentTask.State = state;
      this.setState({
        tasks: newTasks
      });
      await this.saveToFile(newTasks);
    }
  }

  private handleItemClick(key: string) {
    this.setState({
      date: key
    });
  }

  private handleEditBtnClick(task: Task) {
    this.setState({
      currentEditingTask: task,
      drawerVisible: true
    });
  }

  private async saveToFile(tasks: Task[]) {
    // TODO tell main process to save to file
    // tslint:disable-next-line:no-console
    console.log('save to file...');
    return Promise.resolve();
  }

  private async readFromFile(): Promise<Task[]> {
    // TODO tell main process to read from file
    // tslint:disable-next-line:no-console
    console.log('read from file...');
    return Promise.resolve([]);
  }
}

export default Main;
