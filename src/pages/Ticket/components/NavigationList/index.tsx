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
  const { data } = useRequest(getNearestTicketList);
  const [currentTicketsData, setCurrentTicketsData] = useState<TicketItem[]>(data);

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

  return (
    <div style={{ width: 200, display: 'inline' }}>
      <List split={false} className={styles.menuItem}>
        <Menu
          onClick={onMenuClick}
          style={{ width: 242, borderRightWidth: 0 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </List>
      <Divider orientation="left" />
      <List.Item className={styles.recentTicket}>近期工单</List.Item>
      <List
        split={false}
        dataSource={currentTicketsData}
        renderItem={(item, index) => (
          <>
            <List.Item>
              <Avatar
                src={item.avatarUrl}
                style={{ marginRight: 21, marginLeft: 25, width: 20, height: 20 }}
              />
              <h4
                style={{
                  width: 120,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.info}
              </h4>
            </List.Item>
            {index < data.length - 1 &&
            index === currentTicketsData.length - 1 &&
            currentTicketsData.length !== 0 ? (
              <List.Item>
                <Button
                  type="text"
                  onClick={() => setCurrentTicketsData(data)}
                  style={{ marginRight: 21, marginLeft: 10 }}
                >
                  <DownOutlined />
                  更多
                </Button>
              </List.Item>
            ) : null}
          </>
        )}
      />
      <Divider orientation="left" />
      <List split={false} style={{ cursor: 'pointer' }}>
        <List.Item className={styles.recentTicket}>常用场景</List.Item>
        <List.Item className={styles.recentTicket}>新系统问题反馈</List.Item>
        <List.Item className={styles.recentTicket}>日常运营</List.Item>
        <List.Item className={styles.recentTicket}>QA 反馈</List.Item>
        <List.Item className={styles.recentTicket}>问题反馈</List.Item>
      </List>
    </div>
  );
};

export default NavigationList;
