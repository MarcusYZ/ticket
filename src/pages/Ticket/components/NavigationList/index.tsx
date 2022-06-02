import { getNearestTicketList } from '@/services/swagger/ticket';
import { DownOutlined, ExclamationCircleFilled, IdcardOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, List } from 'antd';
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
    console.log(data, currentTicketsData, 'test');
  }, [data]);

  return (
    <div style={{ width: 200, display: 'inline' }}>
      <List split={false}>
        <List.Item>
          <ExclamationCircleFilled style={{ marginRight: 21, marginLeft: 25 }} /> 事件
        </List.Item>
        <List.Item>
          <IdcardOutlined style={{ marginRight: 21, marginLeft: 25 }} /> 报备
        </List.Item>
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
                src="https://joeschmoe.io/api/v1/random"
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
                咖啡机损坏
              </h4>
            </List.Item>
            {console.log(
              index < data.length - 1 &&
                index === currentTicketsData.length - 1 &&
                currentTicketsData.length !== 0,
              index,
              'index',
            )}
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
      <List split={false}>
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
