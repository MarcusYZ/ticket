import { getTicketList } from '@/services/swagger/ticket';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import ListTabs from './components/ListTabs';
import NavigationList from './components/NavigationList';
import TicketHeader from './components/TicketHeader';
import TicketList from './components/TicketList';

const Ticket: React.FC = () => {
  const [navigationListVisible, setNavigationListVisible] = useState<boolean>(false);
  const { data } = useRequest(getTicketList);

  useEffect(() => {
    console.log(navigationListVisible, 'navigationListVisible');
  }, [navigationListVisible]);

  console.log(data, 'Data');

  return (
    <>
      <Card style={{ minHeight: 1000 }}>
        <TicketHeader
          navigationListVisible={navigationListVisible}
          setNavigationListVisible={setNavigationListVisible}
        />
        <ListTabs />
        {/* TODO 处理右侧有多的 */}
        <Row>
          {navigationListVisible ? (
            <Col>
              <NavigationList />
            </Col>
          ) : null}
          <Col offset={navigationListVisible ? 1 : 0}>
            <TicketList />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Ticket;
