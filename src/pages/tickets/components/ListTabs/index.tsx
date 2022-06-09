import { Tabs } from 'antd';
import styles from './index.less';
const { TabPane } = Tabs;

const ListTabs = () => (
  // TODO Tab样式
  <div className={styles.tabTitle}>
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="待我处理" key="1" style={{ width: 200 }} />
      <TabPane tab="我发起的" key="2" />
      <TabPane tab="我参与的" key="3" />
      <TabPane tab="全部" key="4" />
      <TabPane tab="草稿" key="5" />
    </Tabs>
  </div>
);

export default ListTabs;
