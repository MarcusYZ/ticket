import { DownOutlined, ExclamationCircleFilled, IdcardOutlined } from '@ant-design/icons';
import { Avatar, Divider, List } from 'antd';
import styles from './index.less';

const NavigationList = () => (
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
    <List split={false}>
      <List.Item className={styles.recentTicket}>近期工单</List.Item>
      <List.Item>
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          style={{ marginRight: 21, marginLeft: 25, width: 20, height: 20 }}
        />
        <h4
          style={{ width: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          咖啡机损坏
        </h4>
      </List.Item>
      <List.Item>
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          style={{ marginRight: 21, marginLeft: 25, width: 20, height: 20 }}
        />
        <h4
          style={{ width: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          咖啡机损坏
        </h4>
      </List.Item>
      <List.Item>
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          style={{ marginRight: 21, marginLeft: 25, width: 20, height: 20 }}
        />
        <h4
          style={{ width: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          咖啡机损坏
        </h4>
      </List.Item>
      <List.Item>
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          style={{ marginRight: 21, marginLeft: 25, width: 20, height: 20 }}
        />
        <h4
          style={{ width: 120, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        >
          咖啡机损坏
        </h4>
      </List.Item>
      <List.Item>
        <DownOutlined style={{ marginRight: 21, marginLeft: 25 }} />
        更多
      </List.Item>
    </List>
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

export default NavigationList;
