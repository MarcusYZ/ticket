import { Button, Card } from 'antd';
import React, { useRef, useState } from 'react';
import NavigationList from './components/NavigationList';
import TicketHeader from './components/TicketHeader';
import TicketList from './components/TicketList';
import TicketCreateAndEdit from './components/TicketsCreateAndEdit';
import TopControl from './components/TopControl';
import { ListType } from './enum';
import styles from './index.less';
import type { TICKET } from './typings';

const Ticket: React.FC = () => {
  const [navigationListVisible, setNavigationListVisible] = useState<boolean>(false); // 左侧导航栏显隐
  const [createAndEditFormVisible, setCreateAndEditFormVisible] = useState<boolean>();
  const [ticketData, setTicketData] = useState<TICKET.TicketItem>();
  const [currentType, setCurrentType] = useState<ListType>();

  const refLevel3 = useRef();
  const refLevel2 = useRef();
  const refLevel1 = useRef();
  const refLevel0 = useRef();

  const updateList = () => {
    switch (currentType) {
      case ListType.DANGER:
        return refLevel3.current.run();
      case ListType.WARN:
        return refLevel2.current.run();
      case ListType.COMMON:
        return refLevel1.current.run();
      case ListType.NORMAL:
        return refLevel0.current.run();
      default:
        break;
    }
  };

  const createButtonRender = () => (
    <Button
      onClick={() => {
        setTicketData(undefined);
        setCreateAndEditFormVisible(true);
      }}
      shape="circle"
      type="primary"
      style={{
        background: '#333333',
        position: 'fixed',
        float: 'right',
        right: 40,
        bottom: 52,
      }}
    >
      <span style={{ fontSize: 22, lineHeight: '20px' }}>+</span>
    </Button>
  );

  // 当前列表
  const Lists = [
    { ListType: ListType.DANGER, ref: refLevel3 },
    { ListType: ListType.WARN, ref: refLevel2 },
    { ListType: ListType.COMMON, ref: refLevel1 },
    { ListType: ListType.NORMAL, ref: refLevel0 },
  ];

  return (
    <div className={styles.cardWrapper}>
      <Card style={{ minHeight: 1000, paddingTop: 0 }}>
        {/* 头部 */}
        <TicketHeader
          navigationListVisible={navigationListVisible}
          setNavigationListVisible={setNavigationListVisible}
        />
        <div style={{ display: 'flex' }}>
          {/* 导航列表 */}
          {navigationListVisible ? (
            <div className={styles.navigationPercent}>
              <NavigationList />
            </div>
          ) : null}
          {/* 列表 */}
          <div className={styles.ticketList} style={{ width: '100%' }}>
            {/* 顶部控制项 */}
            <TopControl />
            {Lists.map((item, index) => (
              <TicketList
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                ref={item.ref}
                themeType={item.ListType}
                setVisible={setCreateAndEditFormVisible}
                getTicketData={setTicketData}
                setCurrentType={setCurrentType}
              />
            ))}
          </div>
        </div>
        <TicketCreateAndEdit
          visible={createAndEditFormVisible}
          setVisible={setCreateAndEditFormVisible}
          trigger={createButtonRender()}
          updateList={updateList}
          data={ticketData}
        />
      </Card>
    </div>
  );
};

export default Ticket;
