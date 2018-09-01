import { Breadcrumb, Col, Layout, Menu, Row } from 'antd';
import React from 'react';

const { Content, Sider } = Layout;

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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">ToDo</div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">Doing</div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">Done</div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
