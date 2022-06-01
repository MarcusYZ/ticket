import { getTicketList } from '@/services/swagger/ticket';
import { Card, Col, Row } from 'antd';
import React from 'react';
import { useRequest } from 'umi';
import ListTabs from './components/ListTabs';
import NavigationList from './components/NavigationList';
import TicketHeader from './components/TicketHeader';
import TicketList from './components/TicketList';

const Ticket: React.FC = () => {
  const { data } = useRequest(getTicketList);

  console.log(data, 'Data');

  return (
    <>
      <Card style={{ minHeight: 1000 }}>
        <TicketHeader />
        <ListTabs />
        {/* TODO 处理右侧有多的 */}
        <Row>
          <Col>
            <NavigationList />
          </Col>
          <Col offset={1}>
            <TicketList />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Ticket;
