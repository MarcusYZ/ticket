import { Modal } from 'antd';
import React from 'react';

interface ConfirmCancelProps {
  visible: boolean; // 控制开启关闭标识
  setVisible: any; // 开启关闭
  confirm: any; // 确认信息
}

const ConfirmCancel: React.FC<ConfirmCancelProps> = (props) => {
  const { visible, setVisible, confirm } = props;

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={() => {
        confirm();
        setVisible(false);
      }}
    >
      <p>确认取消么？</p>
      <p>取消后消息将不会保留。</p>
    </Modal>
  );
};

export default ConfirmCancel;
