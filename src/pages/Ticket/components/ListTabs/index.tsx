import { Tabs } from 'antd';
const { TabPane } = Tabs;

const ListTabs = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="待我处理" key="1" />
    <TabPane tab="我发起的" key="2" />
    <TabPane tab="我参与的" key="3" />
    <TabPane tab="全部" key="4" />
    <TabPane tab="草稿" key="5" />
  </Tabs>
);

export default ListTabs;
