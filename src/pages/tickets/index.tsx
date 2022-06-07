import { Button, Card } from 'antd';
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
  const [createFormVisible, setCreateFormVisible] = useState<boolean>();

  const createButton = () => (
    <Button
      onClick={() => setCreateFormVisible(true)}
      shape="circle"
      type="primary"
      style={{
        background: '#333333',
        position: 'sticky',
        float: 'right',
        right: 40,
        bottom: 52,
      }}
    >
      <span style={{ fontSize: 22, lineHeight: '20px' }}>+</span>
    </Button>
  );

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
          <TicketList themeType={ListType.DANGER} setVisible={setCreateFormVisible} />
          {/* level2 */}
          <TicketList themeType={ListType.WARN} setVisible={setCreateFormVisible} />
          {/* level1 */}
          <TicketList themeType={ListType.COMMON} setVisible={setCreateFormVisible} />
          {/* 正常 */}
          <TicketList themeType={ListType.NORMAL} setVisible={setCreateFormVisible} />
        </div>
        <TicketCreateAndEdit
          visible={createFormVisible}
          setVisible={setCreateFormVisible}
          trigger={createButton()}
        />
      </Card>
    </div>
  );
};

export default Ticket;
