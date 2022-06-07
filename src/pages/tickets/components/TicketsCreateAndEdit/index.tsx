import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Divider, Form } from 'antd';
import React, { useState } from 'react';
import ConfirmCancel from '../ConfrimCancel';
import TicketUpload from '../TicketUpload';

const formLayoutType = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface ticketCreateAndEditProps {
  id?: number; // 传递的id
  visible?: boolean; // 弹窗的开关
  trigger?: any; // 按钮
  setVisible: any; // 控制开关
}

const TicketCreateAndEdit: React.FC<ticketCreateAndEditProps> = (props) => {
  const { id, visible = false, trigger, setVisible } = props;
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  return (
    <>
      <ModalForm
        visible={visible}
        title="新建表单"
        {...formLayoutType}
        trigger={trigger}
        layout="horizontal"
        autoFocusFirstInput
        onValuesChange={(v) => {
          console.log(v);
        }}
        onVisibleChange={(v) => {
          // 当取消并且当前数据为空时 TODO
          console.log('触发', v);
          if (v === false) setConfirmVisible(true);
        }}
        onFinish={async () => {
          // await waitTime(2000);
          // console.log(values.name);
          // message.success('提交成功');
          // return true;
        }}
      >
        <ProFormText
          required
          name="name"
          label="问题"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormTextArea name="text" label="详细说明" placeholder="请输入..." />
        <Divider />
        <ProFormText name="name" label="咨询员工" tooltip="最长为 24 位" placeholder="请输入名称" />
        <ProFormText name="name" label="所属团队" tooltip="最长为 24 位" placeholder="请输入名称" />
        <ProFormSelect
          name="select"
          label="问题分类"
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormDatePicker width={634} name="expirationTime" label="发生时间" />
        {/* <ProFormUploadDragger max={4} label="上传表单" name="dragger" /> */}
        <Form.Item label="上传菜单">
          <TicketUpload />
        </Form.Item>
      </ModalForm>
      {/* 确认取消 */}
      <ConfirmCancel visible={confirmVisible} setVisible={setConfirmVisible} confirm={setVisible} />
    </>
  );
};

export default TicketCreateAndEdit;
