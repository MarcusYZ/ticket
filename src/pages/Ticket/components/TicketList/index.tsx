import { getTicketList } from '@/services/swagger/ticket';
import {
  ControlOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExpandOutlined,
  FieldTimeOutlined,
  FunnelPlotOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Col, Dropdown, List, Menu, Popover, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { ListType } from '../../enum';
import { getTypeColor } from '../../util';
import TicketInfoCard from '../TicketInfoCard';
import UserInfoCard from '../UserInfoCard';
import styles from './index.less';
import ListHeader from './ListHeader';
const LEVEL_THREE_NUM = 8;

interface TicketListProps {
  themeType: API.ListType; // 颜色
}

const TicketList: React.FC<TicketListProps> = (props) => {
  const { themeType } = props;
  const [list, setList] = useState([]); // 列表
  const { data, loading } = useRequest(getTicketList);
  const [handleLoading, setHandleLoading] = useState<boolean>(false);

  // 更新
  useEffect(() => {
    setList(data || []);
  }, [data]);

  // 等待
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  // 加载更多
  const onLoadMore = async () => {
    const newData = list.concat(data);
    setHandleLoading(true);
    await waitTime(1000);
    setList(newData);
    setHandleLoading(false);
  };

  // 下拉框
  const menu = (
    <Menu
      items={[
        {
          label: '编辑',
          key: 'edit',
          disabled: true,
        },
        {
          label: '删除',
          key: 'delete',
          disabled: true,
        },
      ]}
    />
  );

  // title
  const TitleRender = () => (
    <Row gutter={8} style={{ marginBottom: 8 }}>
      <Col span={7} />
      <Col className="gutter-row" span={4}>
        <div className={styles.listTitle}>状态</div>
      </Col>
      <Col className="gutter-row" span={2}>
        <div className={styles.listTitle}>优先级</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div className={styles.listTitle}>发起时间</div>
      </Col>
      <Col className="gutter-row" span={5}>
        <div className={styles.listTitle}>耗时</div>
      </Col>
      <Col className="gutter-row" span={2}>
        <div className={styles.listTitle}>操作</div>
      </Col>
    </Row>
  );

  // 加载按钮
  const loadMore =
    list.length < LEVEL_THREE_NUM ? (
      <div
        style={{
          textAlign: 'right',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore} style={{ borderRadius: 15 }}>
          <DownOutlined />
          还有4条
        </Button>
      </div>
    ) : null;

  // 顶部功能
  const TopFunction = () => {
    return (
      <Row justify="end">
        <Col>
          <Button type="text">
            <ExpandOutlined />
          </Button>
          <Button type="text">
            <ControlOutlined />
          </Button>
          <Button type="text">
            <FunnelPlotOutlined />
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <div style={{ marginBottom: 64 }}>
      <TopFunction />
      <ListHeader num={LEVEL_THREE_NUM} text="Escalation Level 3" type={themeType} />
      <TitleRender />
      <List
        className="demo-loadmore-list"
        loading={loading || handleLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            style={{
              borderLeft: '4px solid',
              borderLeftColor: getTypeColor(themeType),
              paddingLeft: 20,
              borderRadius: '3px 0 0 3px',
              marginBottom: 4,
              padding: 0,
              borderBottom: 0,
              height: 82,
            }}
          >
            <ProCard ghost gutter={8}>
              <ProCard
                colSpan={7}
                className={styles.cardText}
                layout="center"
                bordered
                style={{ background: '#fafafa' }}
              >
                <Popover mouseEnterDelay={3} content={<UserInfoCard />}>
                  <Avatar src={item.avatarUrl} style={{ marginRight: 12 }} />
                </Popover>
                <Popover mouseEnterDelay={3} content={<TicketInfoCard />}>
                  {item.info}
                </Popover>
              </ProCard>
              <ProCard
                colSpan={4}
                layout="center"
                bordered
                style={{ background: '#fafafa', height: 82, justifyContent: 'center' }}
              >
                <FieldTimeOutlined style={{ marginRight: 4 }} /> 待运维处理
              </ProCard>
              <ProCard
                colSpan={2}
                layout="center"
                bordered
                style={{
                  background: getTypeColor(ListType.NORMAL),
                  height: 82,
                  color: '#ffffff',
                }}
              >
                低
              </ProCard>
              <ProCard
                colSpan={4}
                layout="center"
                bordered
                style={{ background: '#fafafa', height: 82 }}
              >
                2021-04-08 01:18
              </ProCard>
              <ProCard
                colSpan={5}
                layout="center"
                bordered
                style={{ background: '#fafafa', height: 82 }}
              >
                逾期 3 天 22 小时 24 分
              </ProCard>
              <ProCard
                colSpan={2}
                layout="center"
                bordered
                style={{ background: '#fafafa', height: 82 }}
              >
                <Dropdown overlay={menu}>
                  <EllipsisOutlined style={{ transform: 'rotate(90deg)' }} />
                </Dropdown>
              </ProCard>
            </ProCard>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TicketList;
