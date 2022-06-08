import { addTicket } from '@/services/swagger/ticket';
import useRequest from '@ahooksjs/use-request';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AutoComplete, Button, Col, Divider, Form, Input, message, Row } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { commonQuestion } from '../../constant';
import { CommonQuestion } from '../../enum';
import type { TICKET } from '../../typings';
import ConfirmCancel from '../ConfrimCancel';
import TicketUpload from '../TicketUpload';
import styles from './index.less';

interface ticketCreateAndEditProps {
  id?: number; // 传递的id
  visible?: boolean; // 弹窗的开关
  trigger?: any; // 按钮
  setVisible: any; // 控制开关
}

// 表单布局
const formLayoutType = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

// 表单初始值
const initialValues = {
  questionSort: 'holiday',
  expirationTime: new Date(),
  question: CommonQuestion.ONE,
  staff: 'Gates',
  team: '北京石景山万达店',
};

const TicketCreateAndEdit: React.FC<ticketCreateAndEditProps> = (props) => {
  const { visible = false, trigger, setVisible } = props;
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [questionInputVal, setQuestionInputVal] = useState<string>(''); // 问题的值
  const formRef = useRef<ProFormInstance>(); // 受控表单

  const { run, loading } = useRequest(addTicket, {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      setVisible(false);
    },
  });

  // 表单变更
  const onValuesChange = (fieldsValue: TICKET.TicketForm) => {
    console.log(fieldsValue, 'fieldsValue');
    const { question } = fieldsValue;
    console.log(questionInputVal, 'questionInputVal');
    if (question && question.length <= 70) setQuestionInputVal(question);
  };

  // 改变状态
  const onVisibleChange = (v: boolean) => {
    // 当取消并且当前数据为空时 TODO
    console.log('触发', v);
    if (v === false) setConfirmVisible(true);
  };

  // 提交
  const onFinish = async () => {
    const fieldsValue = await formRef.current?.validateFields();
    await run(fieldsValue);
    setVisible(false);
  };

  // 取消
  const onCancel = () => {
    setConfirmVisible(true);
  };

  return (
    <>
      <ModalForm<TICKET.TicketForm>
        formRef={formRef}
        visible={visible}
        title="新建表单"
        {...formLayoutType}
        trigger={trigger}
        layout="horizontal"
        autoFocusFirstInput
        initialValues={initialValues}
        onValuesChange={onValuesChange}
        onVisibleChange={onVisibleChange}
        onFinish={onFinish}
        submitter={false}
        className={`${styles.ticketInput} ${styles.ticketArea} ${styles.ticketDate} ${styles.formLabel} `}
      >
        {/* TODO 不受控 */}
        {/* 名称 */}
        <Form.Item label="问题" name="question" rules={[{ required: true, message: '请输入名称' }]}>
          <AutoComplete options={commonQuestion}>
            <Input suffix={`${questionInputVal.length} / 70`} placeholder="请输入" />
          </AutoComplete>
        </Form.Item>
        {/* 详细说明 */}
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
        {/* 咨询员工 */}
        <ProFormText name="staff" disabled label="咨询员工" fieldProps={{ value: 'Gates' }} />
        {/* 所属团队 */}
        <ProFormText
          name="team"
          disabled
          label="所属团队"
          fieldProps={{ value: '北京石景山万达店' }}
        />
        {/* 问题分类 */}
        <ProFormSelect
          name="questionSort"
          label="问题分类"
          valueEnum={{
            holiday: '假期',
          }}
          placeholder="请选择"
        />
        {/* 发生时间 */}
        <ProFormDatePicker
          width={634}
          name="expirationTime"
          label="发生时间"
          fieldProps={{
            showTime: { defaultValue: moment('00:00', 'HH:mm') },
            format: 'YYYY年MM月DD日 HH:mm',
          }}
        />
        {/* <ProFormUploadDragger max={4} label="上传表单" name="dragger" /> */}
        <Form.Item label="上传菜单" style={{ marginBottom: 40 }}>
          <TicketUpload />
        </Form.Item>
        {/* <div style={{ position: 'absolute', bottom: 30, right: 29 }}> */}
        <Row justify="end">
          <Col style={{ marginBottom: 6, marginRight: 5 }}>
            <Button
              style={{
                marginRight: 20,
                width: 85,
                height: 30,
                color: '#00C78B',
                background: '#FFFFFF',
              }}
              onClick={onCancel}
            >
              取消
            </Button>
            <Button
              loading={loading}
              onClick={onFinish}
              style={{ width: 85, height: 30, color: '#FFFFFF', background: '#00C78B' }}
            >
              提交
            </Button>
          </Col>
        </Row>
      </ModalForm>
      {/* 确认取消 */}
      <ConfirmCancel visible={confirmVisible} setVisible={setConfirmVisible} confirm={setVisible} />
    </>
  );
};

export default TicketCreateAndEdit;
