import { getTicketList } from '@/services/swagger/ticket';
import { DownOutlined, EllipsisOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Col, Dropdown, List, Menu, Popover, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { ListType } from '../../enum';
import type { TicketItem } from '../../typings';
import { getPriorityText, getTypeColor } from '../../util';
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
    <Row gutter={8} className={styles.title}>
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
      <div className={styles.moreButtonWrapper}>
        <Button loading={handleLoading} className={styles.moreButton} onClick={onLoadMore}>
          <DownOutlined />
          还有4条
        </Button>
      </div>
    ) : null;

  return (
    <div className={styles.listWrapper}>
      <ListHeader num={LEVEL_THREE_NUM} type={themeType} />
      <TitleRender />
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item: TicketItem) => (
          <List.Item
            style={{
              borderLeft: themeType !== ListType.NORMAL ? '4px solid' : 0,
              borderLeftColor: getTypeColor(themeType),
            }}
            className={styles.listItem}
          >
            <ProCard ghost gutter={8}>
              <ProCard colSpan={7} className={styles.cardText} layout="center" bordered>
                <Popover mouseEnterDelay={3} content={<UserInfoCard />}>
                  <Avatar src={item.avatarUrl} className={styles.listItemAvatar} />
                </Popover>
                <Popover mouseEnterDelay={3} content={<TicketInfoCard />}>
                  {item.info}
                </Popover>
              </ProCard>
              <ProCard colSpan={4} layout="center" bordered className={styles.listItemCard_status}>
                <FieldTimeOutlined className={styles.listItemIcon} /> {item.status}
              </ProCard>
              <ProCard
                colSpan={2}
                layout="center"
                bordered
                className={styles.listItemCard_level}
                style={{
                  background: getTypeColor(item.priority),
                }}
              >
                {getPriorityText(item.priority)}
              </ProCard>
              <ProCard colSpan={4} layout="center" bordered className={styles.listItemCard_common}>
                {item.date}
              </ProCard>
              <ProCard colSpan={5} layout="center" bordered className={styles.listItemCard_common}>
                {item.time}
              </ProCard>
              <ProCard colSpan={2} layout="center" bordered className={styles.listItemCard_common}>
                <Dropdown overlay={menu}>
                  <EllipsisOutlined className={styles.listItemOperate} />
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
