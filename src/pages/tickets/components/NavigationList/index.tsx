import { getNearestTicketList } from '@/services/swagger/ticket';
import {
  DownOutlined,
  ExclamationCircleFilled,
  IdcardOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, List, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import type { TICKET } from '../../typings';
import styles from './index.less';

const NavigationList: React.FC = () => {
  const { data } = useRequest(getNearestTicketList); // 获取近期工单
  const [currentTicketsData, setCurrentTicketsData] = useState<TICKET.TicketItem[]>(data || []); // 控制近期工单的展示

  useEffect(() => {
    if (data) setCurrentTicketsData([...data].splice(0, 4));
  }, [data]);

  // 表单点击方法
  const onMenuClick = () => {
    console.log(1);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: any[], // TODO 类型调整
    type?: 'group',
  ): any {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as any;
  }

  const items: any[] = [
    getItem('事件', '1', <ExclamationCircleFilled />),
    getItem('报备', '2', <IdcardOutlined />),
  ];

  // 常用场景
  const commonSceneRender = (
    <>
      <Divider orientation="left" />
      <List className={styles.scene} split={false}>
        <List.Item className={styles.recentTicket}>常用场景</List.Item>
        <List.Item className={styles.recentTicket}>新系统问题反馈</List.Item>
        <List.Item className={styles.recentTicket}>日常运营</List.Item>
        <List.Item className={styles.recentTicket}>QA 反馈</List.Item>
        <List.Item className={styles.recentTicket}>问题反馈</List.Item>
      </List>
    </>
  );

  // 更多按钮
  const moreButton = (
    <List.Item onClick={() => setCurrentTicketsData(data)}>
      {/* <Button type="text" onClick={() => setCurrentTicketsData(data)} className={styles.moreButton}> */}
      <DownOutlined className={`${styles.sceneLeftMore} ${styles.sceneLeft}`} />
      <h4 className={styles.sceneText}>更多</h4>
      {/* </Button> */}
    </List.Item>
  );

  // 收起按钮
  const stowButton = (
    <List.Item onClick={() => setCurrentTicketsData([...data].splice(0, 4))}>
      <UpOutlined className={`${styles.sceneLeftMore} ${styles.sceneLeft}`} />
      <h4 className={styles.sceneText}>收起</h4>
    </List.Item>
  );

  const ButtonRender = currentTicketsData.length === 4 ? moreButton : stowButton;

  // 自定义列表项
  const renderItem = (item: TICKET.TicketItem, index: number) => (
    <div className={styles.nearListTicketItem}>
      <List.Item>
        <Avatar src={item.avatarUrl} className={styles.sceneLeft} />
        <h4 className={styles.sceneText}>{item.question}</h4>
      </List.Item>
      <div className={styles.nearListTicketButton}>
        {index === currentTicketsData.length - 1 && data.length > 4 ? ButtonRender : null}
      </div>
    </div>
  );

  return (
    <div className={styles.navigationWrapper}>
      {/* 菜单项 */}
      <List split={false} className={styles.menuItem}>
        <Menu
          onClick={onMenuClick}
          className={styles.navigationMenu}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </List>
      <Divider orientation="left" />
      {/* 近期工单 */}
      <List.Item className={styles.recentTicket}>近期工单</List.Item>
      <List split={false} dataSource={currentTicketsData} renderItem={renderItem} />
      {/* 常用场景 */}
      {commonSceneRender}
    </div>
  );
};

export default NavigationList;
