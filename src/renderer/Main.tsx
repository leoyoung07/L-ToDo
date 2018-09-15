import { Breadcrumb, Button, Icon, Layout } from 'antd';
import moment from 'moment';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SideBar, { ISideBarItem } from './SideBar';
import TaskPanel from './TaskPanel';

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
      })
    };

    this.handleSiderCollapse = this.handleSiderCollapse.bind(this);
  }
  render() {
    return (
      <Layout>
        <Layout>
          <SideBar collapsed={this.state.siderCollapsed} items={this.state.sideBarItems}/>
          <Layout style={{ padding: '0 24px 24px' }}>
            <div className="main__header">
              <Button type="primary" onClick={this.handleSiderCollapse}>
                <Icon type={this.state.siderCollapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button>
              <div className="main__header-text">
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>L-ToDo</Breadcrumb.Item>
                  <Breadcrumb.Item>2018-09-02</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <Content className="main__content">
              <TaskPanel />
            </Content>
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
}

export default Main;
