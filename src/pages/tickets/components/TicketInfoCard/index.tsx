import {
  BulbOutlined,
  ExclamationCircleOutlined,
  FieldTimeOutlined,
  HddOutlined,
} from '@ant-design/icons';
import { Button, Col, List, Row } from 'antd';
import React from 'react';
import styles from './index.less';

const ListItem = List.Item;
const TicketInfoCard: React.FC = () => {
  return (
    <List split={false} className={styles.infoCard}>
      <ListItem>
        <BulbOutlined /> <span className={styles.infoCardText}>日常运营</span>
      </ListItem>
      <ListItem className={styles.infoCardDetail}>
        咖啡机在冲煮时，冲煮把手周边有渗漏情况，影响正常使用，需尽快安排维修
      </ListItem>
      <ListItem className={styles.moreDetail}>
        员工在制作咖啡时，咖啡机把手周边出现渗漏，影响正常使用。员工在制作咖啡时，咖啡机把手周边出现渗漏，影响正常使用，需尽快维修
      </ListItem>
      <ListItem>
        <FieldTimeOutlined /> <span className={styles.infoCardText}>耗时 3 小时 26 分</span>
        <HddOutlined /> <span className={styles.infoCardText}>E1029568</span>
        <ExclamationCircleOutlined color="red" /> <span className={styles.infoCardText}>紧急</span>
      </ListItem>
      <ListItem>
        <Row>
          <Col>
            <Button className={styles.operateCancel}>撤销</Button>
            <Button>重新提交</Button>
          </Col>
          {/* <Col>
            <FieldTimeOutlined /> 待伙伴验收
          </Col> */}
        </Row>
      </ListItem>
    </List>
  );
};

export default TicketInfoCard;
