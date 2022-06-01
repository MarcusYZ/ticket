import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const UserInfoCard: React.FC = () => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://joeschmoe.io/api/v1/random" />}
    >
      <Meta title="曹晓蕾" description="Director, Partner Technology" />
    </Card>
  );
};

export default UserInfoCard;
