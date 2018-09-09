import { Layout, Menu } from 'antd';
import React from 'react';

const { Sider } = Layout;

interface ISideBarProps {
  collapsed: boolean;
}

class SideBar extends React.Component<ISideBarProps> {
  render() {
    return (
      <Sider
        collapsible={true}
        collapsedWidth={0}
        trigger={null}
        collapsed={this.props.collapsed}
        width={200}
        style={{ background: '#fff' }}
      >
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
    );
  }
}

export default SideBar;
