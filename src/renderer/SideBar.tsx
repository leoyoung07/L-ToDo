import { Badge, DatePicker, Layout, Menu } from 'antd';
import moment, { Moment } from 'moment';
import React from 'react';

const { Sider } = Layout;

export interface ISideBarItem {
  text: string;
  value: string;
  badgeValue: number;
}

interface ISideBarProps {
  collapsed: boolean;
  items: ISideBarItem[];
  current: string;
  handleItemClick(key: string): void;
  handleWeekChange(date: Moment, dateString: string): void;
}

class SideBar extends React.Component<ISideBarProps> {
  render() {
    return (
      <Sider
        collapsible={true}
        collapsedWidth={0}
        trigger={null}
        collapsed={this.props.collapsed}
        width={150}
        style={{ background: '#fff' }}
      >
        <div>
          <DatePicker.WeekPicker
            value={moment(this.props.current)}
            onChange={this.props.handleWeekChange}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[this.props.current]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={e => {
            this.props.handleItemClick(e.key);
          }}
        >
          {this.props.items.map(item => (
            <Menu.Item key={item.value}>
              <span>{item.text}</span>
              <Badge style={{margin: '0 10px', backgroundColor: '#40a9ff'}} count={item.badgeValue} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
