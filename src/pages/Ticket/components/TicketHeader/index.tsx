import {
  AppstoreOutlined,
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row } from 'antd';
import React from 'react';

interface TicketHeaderProps {
  navigationListVisible: boolean; // 侧边栏是否收起
  setNavigationListVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置侧边栏是否收起
}
const TicketHeader: React.FC<TicketHeaderProps> = (props) => {
  const { navigationListVisible, setNavigationListVisible } = props;

  return (
    <Row justify="space-between">
      <Col>
        <Button
          type="text"
          shape="circle"
          icon={<MenuOutlined />}
          onClick={() => setNavigationListVisible(!navigationListVisible)}
        />{' '}
        <span>Tickets</span>
      </Col>
      <Col span={12}>
        <Input placeholder="Search" prefix={<SearchOutlined />} />
      </Col>
      <Col>
        <Button type="text" shape="circle" icon={<AppstoreOutlined />} />
        <Button type="text" shape="circle" icon={<SettingOutlined />} />
        <Button type="text" shape="circle" icon={<BellOutlined />} />
        <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: 12 }} />
      </Col>
    </Row>
  );
};

export default TicketHeader;
