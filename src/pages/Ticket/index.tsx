import { Card } from 'antd';
import React, { useState } from 'react';
import ListTabs from './components/ListTabs';
import NavigationList from './components/NavigationList';
import TicketHeader from './components/TicketHeader';
import TicketList from './components/TicketList';
<<<<<<< HEAD
import TopControl from './components/TopControl';
import { ListType } from './enum';

const Ticket: React.FC = () => {
  const [navigationListVisible, setNavigationListVisible] = useState<boolean>(false); // 左侧导航栏显隐
=======
import { ListType } from './enum';

const Ticket: React.FC = () => {
  const [navigationListVisible, setNavigationListVisible] = useState<boolean>(false);
>>>>>>> 1022a7014dc614804d3edaccde4ba873e38fccfe

  return (
    <>
      <Card style={{ minHeight: 1000 }}>
        {/* 头部 */}
        <TicketHeader
          navigationListVisible={navigationListVisible}
          setNavigationListVisible={setNavigationListVisible}
        />
        {/* Tab页 */}
        <ListTabs />
        {/* 导航列表 */}
        {navigationListVisible ? (
          <div style={{ width: '20%', float: 'left' }}>
            <NavigationList />
          </div>
        ) : null}
        {/* 列表 */}
        <div style={{ width: navigationListVisible ? '75%' : '100%', float: 'right' }}>
<<<<<<< HEAD
          {/* 顶部控制项 */}
          <TopControl />
=======
>>>>>>> 1022a7014dc614804d3edaccde4ba873e38fccfe
          {/* level3 */}
          <TicketList themeType={ListType.DANGER} />
          {/* level2 */}
          <TicketList themeType={ListType.WARN} />
          {/* level1 */}
          <TicketList themeType={ListType.COMMON} />
          {/* 正常 */}
          <TicketList themeType={ListType.NORMAL} />
        </div>
      </Card>
    </>
  );
};

export default Ticket;
