import {
  AppstoreOutlined,
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Col, Input, Row } from 'antd';
import React from 'react';

const TicketHeader: React.FC = () => {
  return (
    <Row justify="space-between">
      <Col>
        <MenuOutlined /> <span>Tickets</span>
      </Col>
      <Col>
        <Input placeholder="Enter your username" prefix={<SearchOutlined />} />
      </Col>
      <Col>
        <AppstoreOutlined />
        <SettingOutlined />
        <BellOutlined />
        <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: 12 }} />
      </Col>
    </Row>
  );
};

export default TicketHeader;
