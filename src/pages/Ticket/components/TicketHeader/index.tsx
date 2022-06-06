import {
  AppstoreOutlined,
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row, Tabs } from 'antd';
import React from 'react';
import styles from './index.less';
const { TabPane } = Tabs;

interface TicketHeaderProps {
  navigationListVisible: boolean; // 侧边栏是否收起
  setNavigationListVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置侧边栏是否收起
}
const TicketHeader: React.FC<TicketHeaderProps> = (props) => {
  const { navigationListVisible, setNavigationListVisible } = props;

  return (
    <div style={{ height: 100 }}>
      <div
        style={{
          position: 'fixed',
          top: -1,
          background: '#ffffff',
          width: '100%',
          paddingTop: 24,
          zIndex: 999,
        }}
      >
        <Row justify="space-between">
          {/* 控制导航栏展示隐藏 */}
          <Col>
            <Button
              type="text"
              shape="circle"
              icon={<MenuOutlined />}
              onClick={() => setNavigationListVisible(!navigationListVisible)}
            />
            <span className={styles.headerTitleText}>Tickets</span>
          </Col>
          {/* 搜索栏 */}
          <Col span={12}>
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Col>
          {/* 头像等按钮 */}
          <Col>
            <Button type="text" shape="circle" icon={<AppstoreOutlined />} />
            <Button type="text" shape="circle" icon={<SettingOutlined />} />
            <Button type="text" shape="circle" icon={<BellOutlined />} />
            <Avatar src="https://joeschmoe.io/api/v1/random" className={styles.headerAvatar} />
          </Col>
        </Row>
        {/* Tab页 */}
        <Tabs defaultActiveKey="1" centered style={{ marginBottom: 0 }}>
          <TabPane tab="待我处理" key="1" />
          <TabPane tab="我发起的" key="2" />
          <TabPane tab="我参与的" key="3" />
          <TabPane tab="全部" key="4" />
          <TabPane tab="草稿" key="5" />
        </Tabs>
      </div>
    </div>
  );
};

export default TicketHeader;
