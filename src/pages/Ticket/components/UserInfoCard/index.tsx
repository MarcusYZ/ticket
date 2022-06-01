import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const UserInfoCard: React.FC = () => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Meta title="曹晓蕾" description="Director, Partner Technology" />
    </Card>
  );
};

export default UserInfoCard;
