import { addTicket, modifyTicket } from '@/services/swagger/ticket';
import useRequest from '@ahooksjs/use-request';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { AutoComplete, Button, Col, Divider, Form, Input, message, Row, Upload } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import up1 from '../../../../../public/icons/up1.png';
import { commonQuestion } from '../../constant';
import { CommonQuestion } from '../../enum';
import type { TICKET } from '../../typings';
import ConfirmCancel from '../ConfirmCancel';
import styles from './index.less';

interface ticketCreateAndEditProps {
  id?: number; // 传递的id
  visible?: boolean; // 弹窗的开关
  trigger?: any; // 按钮
  setVisible: any; // 控制开关
  updateList: any; // 更新列表
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
  const { id, visible = false, trigger, setVisible, updateList } = props;
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [questionInputVal, setQuestionInputVal] = useState<string>(''); // 问题的值
  const formRef = useRef<ProFormInstance>(); // 受控表单
  const [uploadList, setUploadList] = useState<any>(); // 上传列表
  // 新建
  const { run: addTicketRun, loading: addTicketLoading } = useRequest(addTicket, {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      updateList();
    },
  });

  // 更新
  const { run: modifyTicketRun, loading: modifyTicketLoading } = useRequest(modifyTicket, {
    manual: true,
    onSuccess: () => {
      message.success('编辑成功');
      updateList();
    },
  });

  // 表单变更
  const onValuesChange = (fieldsValue: TICKET.TicketForm) => {
    console.log(fieldsValue, 'fieldsValue');
    const { question } = fieldsValue;
    if (question && question.length <= 70) setQuestionInputVal(question);
  };

  // 改变状态
  const onVisibleChange = (v: boolean) => {
    if (v === false) setConfirmVisible(true);
  };

  // 提交按钮
  const onFinish = async () => {
    const fieldsValue = await formRef.current?.validateFields();
    if (id === undefined) {
      const result = { ...fieldsValue, menu: fieldsValue.menu ? fieldsValue.menu.fileList : [] };
      await addTicketRun(result);
    } else {
      const result = {
        ...fieldsValue,
        menu: fieldsValue.menu ? fieldsValue.menu.fileList : [],
        id,
      };
      await modifyTicketRun(result);
    }
    setVisible(false);
    formRef.current?.resetFields();
  };

  // 变更上传列表
  const onChangeUploadList = ({ fileList: newFileList }) => {
    setUploadList(newFileList);
  };

  // 取消
  const onCancel = () => {
    setConfirmVisible(true);
  };

  // 页脚
  const footerBottomRender = (
    <Row justify="end">
      <Col className={styles.footerCol}>
        <Button className={styles.footerCancel} onClick={onCancel}>
          取消
        </Button>
        <Button
          loading={addTicketLoading || modifyTicketLoading}
          onClick={onFinish}
          className={styles.footerSubmit}
        >
          提交
        </Button>
      </Col>
    </Row>
  );

  // 删除文件
  const onDeleteFile = ({ file, fileList }: { file: any; fileList: any }) => {
    console.log(file, fileList, '触发');
    const newList = fileList.filter((item: { uid: any }) => item.uid !== file.uid);
    setUploadList(newList);
  };

  // 自定义上传列表
  const uploadListRender = (node: any, file: any, fileList: any) => (
    <Row style={{ marginBottom: 24, position: 'relative', bottom: 10 }}>
      <Col style={{ height: 80 }}>
        <img src={up1} alt="" style={{ height: 80 }} />
      </Col>
      <Col>
        <div style={{ marginLeft: 20, fontSize: 14, color: '#333333' }}>效果.png</div>
        <p style={{ marginLeft: 20, fontSize: 14, color: '#999999' }}>16MB</p>
        <Button
          onClick={() => onDeleteFile(node, file, fileList)}
          style={{ padding: 4, marginLeft: 16, fontSize: 14, color: '#FF3B3F' }}
          type="text"
        >
          删除
        </Button>
        <span style={{ position: 'relative', top: -3 }}>.</span>
        <Button style={{ padding: 4, fontSize: 14, color: '#23AF8C' }} type="text">
          替换
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <ModalForm<TICKET.TicketForm>
        formRef={formRef}
        visible={visible}
        title={`${id ? '编辑' : '新建'}表单`}
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
        <Form.Item label="附件" name="menu">
          <Upload
            style={{ marginBottom: 40 }}
            itemRender={uploadListRender}
            fileList={uploadList}
            onChange={onChangeUploadList}
          >
            <Button type="text" style={{ position: 'absolute', bottom: -6, color: '#20BB7A' }}>
              + 继续上传
            </Button>
          </Upload>
        </Form.Item>
        {/* 操作按钮 */}
        {footerBottomRender}
      </ModalForm>
      {/* 确认取消 */}
      <ConfirmCancel
        visible={confirmVisible}
        setVisible={setConfirmVisible}
        confirm={() => {
          setVisible(false);
          formRef.current?.resetFields();
        }}
      />
    </>
  );
};

export default TicketCreateAndEdit;
