import { Col, Row } from 'antd';
import deal from '../../../../../public/icons/deal.png';
import filter from '../../../../../public/icons/filter.png';
import operate from '../../../../../public/icons/operate.png';
import styles from './index.less';

// 顶部功能
const TopControl = () => {
  return (
    <Row justify="end" style={{ marginTop: 42, marginBottom: 34, marginRight: 40 }}>
      <Col>
        <img src={deal} alt="" className={styles.controlDeal} />
        <img src={operate} alt="" className={styles.controlOperate} />
        <div className={styles.controlFilter}>
          <img src={filter} alt="" className={styles.controlIcon} />
          <span className={styles.controlFilterText}>2项</span>
        </div>
      </Col>
    </Row>
  );
};

export default TopControl;
