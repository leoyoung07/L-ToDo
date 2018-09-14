import { Layout, Menu } from 'antd';
import React from 'react';

const { Sider } = Layout;

export interface ISideBarItem {
  text: string;
  value: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

interface ISideBarProps {
  collapsed: boolean;
  items: ISideBarItem[];
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
          {this.props.items.map(item => {
            return <Menu.Item key={item.value} onKeyDown={item.onClick}>{item.text}</Menu.Item>;
          })}
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
