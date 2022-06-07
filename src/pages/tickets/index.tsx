import { Card } from 'antd';
import React, { useState } from 'react';
import NavigationList from './components/NavigationList';
import TicketHeader from './components/TicketHeader';
import TicketList from './components/TicketList';
import TicketCreateAndEdit from './components/TicketsCreateAndEdit';
import TopControl from './components/TopControl';
import { ListType } from './enum';
import styles from './index.less';

const Ticket: React.FC = () => {
  const [navigationListVisible, setNavigationListVisible] = useState<boolean>(false); // 左侧导航栏显隐

  return (
    <div className={styles.cardWrapper}>
      <Card style={{ minHeight: 1000, paddingTop: 0 }}>
        {/* 头部 */}
        <TicketHeader
          navigationListVisible={navigationListVisible}
          setNavigationListVisible={setNavigationListVisible}
        />
        {/* 导航列表 */}
        {navigationListVisible ? (
          <div className={styles.navigationPercent}>
            <NavigationList />
          </div>
        ) : null}
        {/* 列表 */}
        <div
          className={styles.ticketList}
          style={{ width: navigationListVisible ? '75%' : '100%' }}
        >
          {/* 顶部控制项 */}
          <TopControl />
          {/* level3 */}
          <TicketList themeType={ListType.DANGER} />
          {/* level2 */}
          <TicketList themeType={ListType.WARN} />
          {/* level1 */}
          <TicketList themeType={ListType.COMMON} />
          {/* 正常 */}
          <TicketList themeType={ListType.NORMAL} />
        </div>
        <TicketCreateAndEdit />
      </Card>
    </div>
  );
};

export default Ticket;
