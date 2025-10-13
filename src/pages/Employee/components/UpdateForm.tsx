import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.EmployeeInfo) => Promise<boolean>;
  updateModalVisible: boolean;
  values: Partial<API.EmployeeInfo>;
};

export type FormValueType = {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  department?: string;
  position?: string;
  joinDate?: string;
  status?: 'ACTIVE' | 'INACTIVE';
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onCancel, onSubmit, values } = props;

  return (
    <Modal
      destroyOnClose
      title="编辑员工"
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        layout="vertical"
        initialValues={values}
        onFinish={async (value) => {
          const success = await onSubmit(value as FormValueType);
          if (success) {
            return true;
          }
          return false;
        }}
      >
        <ProFormText
          name="name"
          label="员工姓名"
          rules={[{ required: true, message: '请输入员工姓名!' }]}
          width="md"
        />
        <ProFormText
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '请输入手机号!' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' },
          ]}
          width="md"
        />
        <ProFormText
          name="email"
          label="邮箱"
          rules={[{ type: 'email', message: '请输入有效的邮箱地址!' }]}
          width="md"
        />
        <ProFormText
          name="department"
          label="部门"
          rules={[{ required: true, message: '请输入部门!' }]}
          width="md"
        />
        <ProFormText
          name="position"
          label="职位"
          rules={[{ required: true, message: '请输入职位!' }]}
          width="md"
        />
        <ProFormDatePicker
          name="joinDate"
          label="入职时间"
          rules={[{ required: true, message: '请选择入职时间!' }]}
          width="md"
        />
        <ProFormSelect
          name="status"
          label="状态"
          options={[
            { value: 'ACTIVE', label: '在职' },
            { value: 'INACTIVE', label: '离职' },
          ]}
          rules={[{ required: true, message: '请选择状态!' }]}
          width="md"
        />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
