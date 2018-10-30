import { Breadcrumb, Button, Icon, Layout } from 'antd';
import { ipcRenderer } from 'electron';
import moment, { Moment } from 'moment';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ErrorCode from '../common/ErrorCode';
import {
  IpcActions,
  IpcResponse,
  IpcResponseError,
  IpcResponseSuccess
} from '../common/IPC';
import Task, { TaskState } from '../common/Task';
import NewTaskDrawer from './NewTaskDrawer';
import SideBar, { ISideBarItem } from './SideBar';
import TaskPanel from './TaskPanel';
import { DeepClone } from './Util';

const { Content } = Layout;

function getDaysOfWeek(now: Moment) {
  const days = [];
  for (let index = 1; index <= 7; index++) {
    const day = now.isoWeekday(index);
    days.push(day.format('YYYY-MM-DD'));
  }
  return days;
}

function getSideBarDays(
  tasks: Task[],
  date: Moment = moment()
): ISideBarItem[] {
  const days = getDaysOfWeek(date);
  return days.map(day => {
    const toDosOfDay = tasks.reduce((totalToDos, currentTask) => {
      return currentTask.DueDate === day && currentTask.State === TaskState.TODO
        ? totalToDos + 1
        : totalToDos;
    }, 0);
    return {
      text: day,
      value: day,
      badgeValue: toDosOfDay
    };
  });
}

interface IMainProps {}

interface IMainState {
  siderCollapsed: boolean;
  sideBarItems: ISideBarItem[];

  drawerVisible: boolean;
  tasks: Task[];
  date: string;
  draftTask: Task;
  isNewMode: boolean;
}

@DragDropContext(HTML5Backend)
class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    const tasks: Task[] = [];
    this.state = {
      siderCollapsed: true,
      sideBarItems: getSideBarDays(tasks),
      drawerVisible: false,
      tasks: tasks,
      date: moment().format('YYYY-MM-DD'),
      isNewMode: true,
      draftTask: new Task()
    };

    this.handleSiderCollapse = this.handleSiderCollapse.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleCreateTaskBtnClick = this.handleCreateTaskBtnClick.bind(this);
    this.handleTaskStateChange = this.handleTaskStateChange.bind(this);
    this.handleSideBarItemClick = this.handleSideBarItemClick.bind(this);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleSaveTaskBtnClick = this.handleSaveTaskBtnClick.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on(
      IpcActions.UPDATE,
      async (event: Electron.Event, res: IpcResponse) => {
        if (res.code === ErrorCode.SUCCESS) {
          res = res as IpcResponseSuccess;
          await this.updateTasks();
        } else {
          throw (res as IpcResponseError).error;
        }
      }
    );
    (async () => {
      await this.updateTasks();
    })();
  }

  render() {
    return (
      <Layout>
        <Layout>
          <SideBar
            collapsed={this.state.siderCollapsed}
            items={this.state.sideBarItems}
            current={this.state.date}
            handleItemClick={this.handleSideBarItemClick}
            handleWeekChange={this.handleWeekChange}
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
                handleDeleteBtnClick={this.handleDeleteBtnClick}
                handleTaskStateChange={this.handleTaskStateChange}
              />
            </Content>
            <NewTaskDrawer
              drawerVisible={this.state.drawerVisible}
              handleCreateTaskBtnClick={this.handleCreateTaskBtnClick}
              handleSaveTaskBtnClick={this.handleSaveTaskBtnClick}
              handleDrawerClose={this.handleDrawerClose}
              draftTask={this.state.draftTask}
              isNewMode={this.state.isNewMode}
              key={this.state.draftTask.Id}
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
  private handleDrawerClose() {
    this.setState({
      drawerVisible: false
    });
  }
  private async handleCreateTaskBtnClick(newTask: Task) {
    const tasks = DeepClone(this.state.tasks);
    tasks.push(newTask);
    this.setTasksState(tasks);
    this.handleDrawerClose();
    await this.saveTasks(tasks);
  }

  private async handleSaveTaskBtnClick(draftTask: Task) {
    const tasks = DeepClone(this.state.tasks);
    const index = tasks.findIndex(t => t.Id === draftTask.Id);
    if (index >= 0) {
      tasks[index] = draftTask;
      this.setTasksState(tasks);
      await this.saveTasks(tasks);
    }
    this.handleDrawerClose();
  }
  private async handleTaskStateChange(id: string, state: TaskState) {
    const tasks = DeepClone(this.state.tasks);
    const currentTask = tasks.find(t => t.Id === id);
    if (currentTask) {
      currentTask.State = state;
      this.setTasksState(tasks);
      await this.saveTasks(tasks);
    }
  }

  private handleSideBarItemClick(key: string) {
    this.setState({
      date: key
    });
  }

  private handleWeekChange(date: Moment, dateString: string) {
    this.setState({
      date: date.format('YYYY-MM-DD'),
      sideBarItems: getSideBarDays(this.state.tasks, date)
    });
  }

  private handleAddBtnClick() {
    this.setState({
      draftTask: new Task(),
      drawerVisible: true,
      isNewMode: true
    });
  }
  private handleEditBtnClick(task: Task) {
    this.setState({
      draftTask: DeepClone(task),
      drawerVisible: true,
      isNewMode: false
    });
  }

  private async handleDeleteBtnClick(task: Task) {
    const tasks = DeepClone(this.state.tasks);
    const index = tasks.findIndex(t => t.Id === task.Id);
    if (index >= 0) {
      tasks.splice(index, 1);
      this.setTasksState(tasks);
      await this.saveTasks(tasks);
    }
  }

  private async saveTasks(tasks: Task[]) {
    await this.saveToFile(tasks);
    await this.uploadToServer();
  }

  private async saveToFile(tasks: Task[]) {
    // tslint:disable-next-line:no-console
    console.log('save to file...');
    return await this.sendMsgToMain<null>(IpcActions.SAVE, tasks);
  }

  private async readTasks(): Promise<Task[]> {
    const tasks = await this.downloadFromServer();
    if (tasks) {
      await this.saveToFile(tasks);
    }
    return await this.readFromFile();
  }

  private async readFromFile(): Promise<Task[]> {
    // tslint:disable-next-line:no-console
    console.log('read from file...');
    return await this.sendMsgToMain<Task[]>(IpcActions.READ);
  }

  private async uploadToServer() {
    // tslint:disable-next-line:no-console
    console.log('upload to server...');
    return await this.sendMsgToMain<null>(IpcActions.SERVER_UPLOAD);
  }

  private async downloadFromServer() {
    // tslint:disable-next-line:no-console
    console.log('download from server...');
    return await this.sendMsgToMain<Task[]>(IpcActions.SERVER_DOWNLOAD);
  }

  private async updateTasks() {
    const tasks = await this.readTasks();
    this.setTasksState(tasks);
  }

  private setTasksState(tasks: Task[], callback?: () => void) {
    this.setState(
      {
        tasks,
        sideBarItems: getSideBarDays(tasks, moment(this.state.date))
      },
      callback
    );
  }

  private sendMsgToMain<T>(
    channel: string,
    // tslint:disable-next-line:no-any
    message?: any,
    timeout: number = 5000
  ) {
    return new Promise<T>((resolve, reject) => {
      // tslint:disable-next-line:no-any
      ipcRenderer.once(channel, (event: Electron.Event, res: IpcResponse) => {
        if (res.code === ErrorCode.SUCCESS) {
          res = res as IpcResponseSuccess;
          resolve(res.data as T);
        } else {
          res = res as IpcResponseError;
          reject(res.error);
        }
      });
      ipcRenderer.send(channel, message);
      setTimeout(() => {
        reject(`Send message timeout ${timeout} ms`);
      }, timeout);
    });
  }
}

export default Main;
