import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Icon,
  Layout,
  Menu,
  Row
} from 'antd';
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
              <div className="main__split-panel">
                <Row
                  className="main__split-panel-row"
                  gutter={16}
                  type="flex"
                  justify="space-around"
                >
                  <Col className="main__split-panel-col" span={8}>
                    <div className="main__split-panel-box">
                      <h3 className="main__split-panel-title">
                        <span>To Do</span>
                        <Button
                          shape="circle"
                          icon="plus"
                          type="primary"
                          size="small"
                          className="main__split-panel-icon-btn"
                        />
                      </h3>
                      <Divider className="main__split-panel-divider" />
                      <div className="main__split-panel-content">
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
