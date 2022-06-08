import { Button, Col, Row, Upload } from 'antd';
import React from 'react';
import up1 from '../../../../../public/icons/up1.png';

const TicketUpload: React.FC = () => {
  return (
    <>
      <Row style={{ marginBottom: 24 }}>
        <Col style={{ height: 80 }}>
          <img src={up1} alt="" />
        </Col>
        <Col>
          <div style={{ marginLeft: 20 }}>效果.png</div>
          <p style={{ marginLeft: 20 }}>16MB</p>
          <Button style={{ padding: 4, marginLeft: 16 }} type="text">
            删除
          </Button>

          <Button style={{ padding: 4 }} type="text">
            替换
          </Button>
        </Col>
      </Row>
      <Upload style={{ marginBottom: 40 }}>
        <Button>+ 继续上传</Button>
      </Upload>
    </>
  );
};

export default TicketUpload;
