import { Breadcrumb, Button, Icon, Layout, Menu } from 'antd';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TaskPanel from './TaskPanel';

const { Content, Sider } = Layout;

@DragDropContext(HTML5Backend)
class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <div className="main__header">
              <Button type="primary">
                <Icon type="menu-unfold" />
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
}

export default Main;
