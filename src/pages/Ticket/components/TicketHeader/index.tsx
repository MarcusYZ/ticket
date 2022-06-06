import {
  AppstoreOutlined,
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row } from 'antd';
import React from 'react';
import styles from './index.less';

interface TicketHeaderProps {
  navigationListVisible: boolean; // 侧边栏是否收起
  setNavigationListVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置侧边栏是否收起
}
const TicketHeader: React.FC<TicketHeaderProps> = (props) => {
  const { navigationListVisible, setNavigationListVisible } = props;

  return (
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
  );
};

export default TicketHeader;
