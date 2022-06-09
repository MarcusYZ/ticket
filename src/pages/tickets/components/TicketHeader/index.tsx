import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Col, Input, Row, Tabs } from 'antd';
import React from 'react';
import config from '../../../../../public/icons/config.png';
import report from '../../../../../public/icons/report.png';
import search_global from '../../../../../public/icons/search.png';
import styles from './index.less';
const { TabPane } = Tabs;

interface TicketHeaderProps {
  navigationListVisible: boolean; // 侧边栏是否收起
  setNavigationListVisible: React.Dispatch<React.SetStateAction<boolean>>; // 设置侧边栏是否收起
}
const TicketHeader: React.FC<TicketHeaderProps> = (props) => {
  const { navigationListVisible, setNavigationListVisible } = props;

  return (
    <div style={{ height: 100 }} className={styles.headerWrapper}>
      <div
        style={{
          position: 'fixed',
          top: -1,
          background: '#ffffff',
          width: '100%',
          paddingTop: 24,
          zIndex: 999,
        }}
      >
        <Row justify="space-between">
          {/* 控制导航栏展示隐藏 */}
          <Col style={{ verticalAlign: 'middle' }}>
            <MenuOutlined
              onClick={() => setNavigationListVisible(!navigationListVisible)}
              style={{
                height: 16,
                lineHeight: '16px',
                marginLeft: 24,
                marginRight: 23,
                position: 'relative',
                bottom: 2,
              }}
            />
            <span className={styles.headerTitleText}>Tickets</span>
          </Col>
          {/* 搜索栏 */}
          <Col span={12} className={styles.headerSearch}>
            <Input
              placeholder="Search"
              prefix={<img src={search_global} className={styles.headerInputImg} />}
              className={styles.headerInput}
            />
          </Col>
          {/* 头像等按钮 */}
          <Col>
            <img src={report} alt="" className={styles.iconReport} />
            <img src={config} alt="" className={styles.iconConfig} />
            <Avatar src="https://joeschmoe.io/api/v1/random" className={styles.headerAvatar} />
          </Col>
        </Row>
        {/* Tab页 */}
        <div
          className={`${styles.tabTitle} ${styles.tabShadow}`}
          style={{ boxShadow: '0 5px 6px -3px rgb(0 0 0 / 15%)' }}
        >
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="待我处理" key="1" />
            <TabPane tab="我发起的" key="2" />
            <TabPane tab="我参与的" key="3" />
            <TabPane tab="全部" key="4" />
            <TabPane tab="草稿" key="5" />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;
