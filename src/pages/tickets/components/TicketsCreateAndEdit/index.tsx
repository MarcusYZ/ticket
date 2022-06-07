import { addTicket } from '@/services/swagger/ticket';
import useRequest from '@ahooksjs/use-request';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Divider, Form, message } from 'antd';
import React, { useState } from 'react';
import ConfirmCancel from '../ConfrimCancel';
import TicketUpload from '../TicketUpload';
import styles from './index.less';

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
  const { loading, run } = useRequest(addTicket, {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
    },
  });

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
        onFinish={async (v) => {
          run({ test: 'test' });
          console.log('提交', v);
        }}
        className={styles.ticketInput}
      >
        <ProFormText
          name="question"
          label="问题"
          placeholder="请输入"
          fieldProps={{
            maxLength: 70,
            showCount: true,
          }}
          rules={[{ required: true, message: '请输入名称' }]}
        />
        <ProFormTextArea
          name="detail"
          label="详细说明"
          fieldProps={{
            maxLength: 200,
            showCount: true,
          }}
          placeholder="请输入..."
          rules={[{ required: true, message: '请输入详细说明' }]}
        />
        <Divider />
        <ProFormText name="staff" label="咨询员工" fieldProps={{ value: 'Gates' }} />
        <ProFormText name="team" label="所属团队" fieldProps={{ value: '北京石景山万达店' }} />
        <ProFormSelect
          name="questionSort"
          label="问题分类"
          valueEnum={{
            holiday: '假期',
          }}
          placeholder="请选择"
          rules={[{ required: true, message: '请选择问题分类' }]}
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
