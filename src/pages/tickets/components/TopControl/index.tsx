import { ControlOutlined, ExpandOutlined, FunnelPlotOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';

// 顶部功能
const TopControl = () => {
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

export default TopControl;
