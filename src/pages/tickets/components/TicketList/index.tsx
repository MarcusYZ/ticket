import { deleteTicket, getTicketList } from '@/services/swagger/ticket';
import { DownOutlined, EllipsisOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Col, Dropdown, List, Menu, message, Popover, Row } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useRequest } from 'umi';
import { more_data } from '../../constant';
import { ListType } from '../../enum';
import type { TICKET } from '../../typings';
import { getPriorityText, getTypeColor } from '../../util';
import TicketInfoCard from '../TicketInfoCard';
import UserInfoCard from '../UserInfoCard';
import styles from './index.less';
import ListHeader from './ListHeader';
const LEVEL_THREE_NUM = 8;

interface TicketListProps {
  themeType: API.ListType; // 颜色
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>; // 控制表单的显隐
  getTicketData: React.Dispatch<React.SetStateAction<TICKET.TicketItem | undefined>>; // 设置表单数据
  setCurrentType: React.Dispatch<React.SetStateAction<ListType | undefined>>; // 当前类型
}

const TicketList: React.FC<TicketListProps> = forwardRef((props, ref) => {
  const { themeType, setVisible, getTicketData, setCurrentType } = props;
  const [list, setList] = useState<TICKET.TicketItem[]>([]); // 列表
  const [handleLoading, setHandleLoading] = useState<boolean>(false); // 让更多在加载中

  // 加载列表
  const { run, loading } = useRequest(getTicketList, {
    manual: true,
    onSuccess: ({ ticketList }) => {
      setList(ticketList || []);
    },
  });

  useImperativeHandle(ref, () => ({
    run,
  }));

  // 删除表单
  const { run: deleteTicketRun, loading: deleteTicketLoading } = useRequest(deleteTicket, {
    manual: true,
    onSuccess: (data) => {
      message.success('删除成功');
      setList(data as any); // TODO
    },
  });

  // 初始化
  useEffect(() => {
    run({ level: ListType.DANGER });
  }, []);

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
    // 获取最后一个id为添加项赋上新的id
    const last_id = list[list.length - 1].id;
    more_data.map((item, index) => {
      return {
        ...item,
        id: last_id + index + 1,
      };
    });
    const newData = list.concat(more_data);
    setHandleLoading(true);
    await waitTime(1000);
    setList(newData);
    setHandleLoading(false);
  };

  // 下拉框
  const menu = (item: TICKET.TicketItem) => (
    <Menu
      items={[
        {
          label: '编辑',
          key: 'edit',
          onClick: () => {
            setVisible(true);
            getTicketData(item);
            setCurrentType(themeType);
          },
        },
        {
          label: '删除',
          key: 'delete',
          onClick: () => {
            console.log(item.id, 'id');
            deleteTicketRun({ id: item.id });
          },
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
        loading={loading || deleteTicketLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item: TICKET.TicketItem) => (
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
                  {item.question}
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
                <Dropdown overlay={menu(item)}>
                  <EllipsisOutlined className={styles.listItemOperate} />
                </Dropdown>
              </ProCard>
            </ProCard>
          </List.Item>
        )}
      />
    </div>
  );
});

export default TicketList;
