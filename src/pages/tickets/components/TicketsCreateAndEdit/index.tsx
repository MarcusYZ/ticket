import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Button, Divider, message } from 'antd';
import React from 'react';

const formLayoutType = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

interface ticketCreateAndEditProps {
  id?: number; // 传递的id
  visible?: boolean; // 弹窗的开关
}

const TicketCreateAndEdit: React.FC<ticketCreateAndEditProps> = (props) => {
  const { id, visible = false } = props;

  // 等待时间
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  return (
    <>
      <ModalForm
        visible={visible}
        title="新建表单"
        {...formLayoutType}
        trigger={
          <Button
            shape="circle"
            type="primary"
            style={{
              background: '#333333',
              position: 'sticky',
              float: 'right',
              right: 40,
              bottom: 52,
            }}
          >
            <span style={{ fontSize: 22, lineHeight: '20px' }}>+</span>
          </Button>
        }
        layout="horizontal"
        autoFocusFirstInput
        modalProps={{
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText
          required
          name="name"
          label="问题"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText name="name" label="详细说明" tooltip="最长为 24 位" placeholder="请输入名称" />
        <Divider />
        <ProFormText name="name" label="详细说明" tooltip="最长为 24 位" placeholder="请输入名称" />
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
        <ProFormUploadDragger max={4} label="上传表单" name="dragger" />
      </ModalForm>
    </>
  );
};

export default TicketCreateAndEdit;
