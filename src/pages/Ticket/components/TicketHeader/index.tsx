import {
  AppstoreOutlined,
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Input, Row } from 'antd';
import React from 'react';

const TicketHeader: React.FC = () => {
  return (
    <Row justify="space-between">
      <Col>
        <Button type="text" shape="circle" icon={<MenuOutlined />} /> <span>Tickets</span>
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
