import { getNearestTicketList } from '@/services/swagger/ticket';
import { DownOutlined, ExclamationCircleFilled, IdcardOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, List, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';

// 工单
type TicketItem = {
  info: string; // 信息
  avatarUrl: string; // 头像地址
};

const NavigationList: React.FC = () => {
  const { data } = useRequest(getNearestTicketList); // 获取近期工单
  const [currentTicketsData, setCurrentTicketsData] = useState<TicketItem[]>(data); // 控制近期工单的展示

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
    <List.Item>
      <Button type="text" onClick={() => setCurrentTicketsData(data)} className={styles.moreButton}>
        <DownOutlined />
        更多
      </Button>
    </List.Item>
  );

  // 自定义列表项
  const renderItem = (item: TicketItem, index: number) => (
    <>
      <List.Item>
        <Avatar src={item.avatarUrl} className={styles.sceneAvatar} />
        <h4 className={styles.sceneText}>{item.info}</h4>
      </List.Item>
      {index < data.length - 1 &&
      index === currentTicketsData.length - 1 &&
      currentTicketsData.length !== 0
        ? moreButton
        : null}
    </>
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
