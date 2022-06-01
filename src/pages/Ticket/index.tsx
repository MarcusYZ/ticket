import { getTicketList } from '@/services/swagger/ticket';
import { Card } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'umi';
import ListTabs from './components/ListTabs';
import NavigationList from './components/NavigationList';
import TicketHeader from './components/TicketHeader';
import TicketList from './components/TicketList';

const Ticket: React.FC = () => {
  const [navigationListVisible, setNavigationListVisible] = useState<boolean>(false);
  const { data } = useRequest(getTicketList);

  console.log(data, 'Data');

  return (
    <>
      <Card style={{ minHeight: 1000 }}>
        <TicketHeader
          navigationListVisible={navigationListVisible}
          setNavigationListVisible={setNavigationListVisible}
        />
        <ListTabs />
        {navigationListVisible ? (
          <div style={{ width: '20%', float: 'left' }}>
            <NavigationList />
          </div>
        ) : null}
        <div style={{ width: navigationListVisible ? '75%' : '100%', float: 'right' }}>
          <TicketList />
          {/* <TicketList />
          <TicketList />
          <TicketList /> */}
        </div>
      </Card>
    </>
  );
};

export default Ticket;
