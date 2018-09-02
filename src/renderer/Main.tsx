import { Breadcrumb, Card, Col, Divider, Layout, Menu, Row } from 'antd';
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
            <Content className="main__content">
              <div className="main__split-panel">
                <Row
                  className="main__split-panel-row"
                  gutter={16}
                  type="flex"
                  justify="space-around"
                >
                  <Col className="main__split-panel-col" span={8}>
                    <div className="main__split-panel-box">
                      <Divider>To Do</Divider>
                      <Card
                        className="main__split-panel-card"
                        title="Card title"
                        extra={<a href="#">More</a>}
                        hoverable={true}
                      >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                      <Card
                        className="main__split-panel-card"
                        title="Card title"
                        extra={<a href="#">More</a>}
                        hoverable={true}
                      >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                      <Card
                        className="main__split-panel-card"
                        title="Card title"
                        extra={<a href="#">More</a>}
                        hoverable={true}
                      >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                      <Card
                        className="main__split-panel-card"
                        title="Card title"
                        extra={<a href="#">More</a>}
                        hoverable={true}
                      >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                    </div>
                  </Col>
                  <Col className="main__split-panel-col" span={8}>
                    <div className="main__split-panel-box">
                      <Divider>Doing</Divider>
                      <Card
                        className="main__split-panel-card"
                        title="Card title"
                        extra={<a href="#">More</a>}
                        hoverable={true}
                      >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                    </div>
                  </Col>
                  <Col className="main__split-panel-col" span={8}>
                    <div className="main__split-panel-box">
                      <Divider>Done</Divider>
                    </div>
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
