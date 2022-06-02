import { Badge } from 'antd';
import React from 'react';
import { ListType } from '../../enum';
import { getTypeColor } from '../../util';
import styles from './index.less';

interface ListHeaderProps {
  num: number; // 数量
  text: string; // 文字
  type: API.ListType; // 类型
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const { num = 0, text = '', type = ListType.NORMAL } = props;

  const badgeRender = (
    <Badge
      count={num}
      style={{ marginLeft: 40, backgroundColor: getTypeColor(type), marginBottom: 4 }}
    />
  );
  return (
    <h2
      className={styles.text}
      style={{ color: getTypeColor(type), fontSize: '26px', lineHeight: '31px' }}
    >
      {text}
      {type !== ListType.NORMAL ? badgeRender : null}
    </h2>
  );
};

export default ListHeader;
