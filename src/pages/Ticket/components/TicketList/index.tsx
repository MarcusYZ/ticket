import {
  ControlOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExpandOutlined,
  FieldTimeOutlined,
  FunnelPlotOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Avatar, Button, Col, Dropdown, List, Menu, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { ListType } from '../../enum';
import { getTypeColor } from '../../util';
import styles from './index.less';
import ListHeader from './ListHeader';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const TicketList = () => {
  const [initLoading, setInitLoading] = useState(true); // 初始加载状态
  const [loading, setLoading] = useState(false); // 加载状态
  const [data, setData] = useState([]); // 数据
  const [list, setList] = useState([]); // 列表

  // 更新
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

        window.dispatchEvent(new Event('resize'));
      });
  };

  // 下拉框
  const menu = (
    <Menu
      items={[
        {
          label: '编辑',
          key: 'edit',
        },
        {
          label: '删除',
          key: 'delete',
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
    !initLoading && !loading ? (
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
          <ExpandOutlined style={{ marginRight: 8 }} />
          <ControlOutlined style={{ marginRight: 8 }} />
          <FunnelPlotOutlined />
        </Col>
      </Row>
    );
  };

  return (
    <>
      <TopFunction />
      <ListHeader text="Escalation Level 3" type={ListType.DANGER} />
      <TitleRender />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            style={{
              borderLeft: '4px solid',
              borderLeftColor: getTypeColor(ListType.DANGER),
              paddingLeft: 20,
              borderRadius: '3px 0 0 3px',
              marginBottom: 4,
              padding: 0,
              borderBottom: 0,
              height: 82,
            }}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <ProCard ghost gutter={8}>
                <ProCard
                  colSpan={7}
                  className={styles.cardText}
                  layout="center"
                  bordered
                  style={{ background: '#fafafa' }}
                >
                  <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: 12 }} />
                  移动端的页面出现异常
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
            </Skeleton>
          </List.Item>
        )}
      />
      {/* 正常 */}
      <ListHeader text="正常" type={ListType.NORMAL} />
      <TitleRender />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            style={{
              paddingLeft: 20,
              marginBottom: 4,
              padding: 0,
              borderBottom: 0,
              height: 82,
            }}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <ProCard ghost gutter={8}>
                <ProCard
                  colSpan={7}
                  className={styles.cardText}
                  layout="center"
                  bordered
                  style={{ background: '#fafafa' }}
                >
                  <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: 12 }} />
                  移动端的页面出现异常
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
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default TicketList;
