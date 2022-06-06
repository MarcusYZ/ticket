import { Badge } from 'antd';
import React from 'react';
import { ListType } from '../../enum';
import { getTypeColor } from '../../util';
import styles from './index.less';

interface ListHeaderProps {
  num: number; // 数量
  type: API.ListType; // 类型
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const { num = 0, type = ListType.NORMAL } = props;

  const getTitle = () => {
    switch (type) {
      case ListType.DANGER:
        return 'Escalation Level 3';
      case ListType.WARN:
        return 'Escalation Level 2';
      case ListType.COMMON:
        return 'Escalation Level 1';
      default:
        return '正常';
    }
  };
  const badgeRender = (
    <Badge
      count={num}
      style={{ backgroundColor: getTypeColor(type) }}
      className={styles.headerBadge}
    />
  );
  return (
    <h2 className={styles.text} style={{ color: getTypeColor(type) }}>
      {getTitle()}
      {type !== ListType.NORMAL ? badgeRender : null}
    </h2>
  );
};

export default ListHeader;
