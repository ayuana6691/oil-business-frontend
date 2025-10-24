import { queryRoleList } from '@/services';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export type CreateFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.EmployeeInfoVO) => Promise<boolean>;
  modalVisible: boolean;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel, onSubmit } = props;
  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const loadRoles = async () => {
    try {
      const response = await queryRoleList({
        status: '1',
        pageSize: 100,
      });
      if (response.data?.list) {
        const options = response.data.list.map((role) => ({
          label: role.name || '',
          value: role.id || 0,
        }));
        setRoleOptions(options);
      }
    } catch (error) {
      console.error('加载角色列表失败:', error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      loadRoles();
    }
  }, [modalVisible]);

  return (
    <Modal
      title="新建员工"
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        layout="vertical"
        onFinish={async (values) => {
          const success = await onSubmit(values as API.EmployeeInfoVO);
          return success;
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
        <ProFormText.Password
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码!' }]}
          width="md"
        />
        <ProFormSelect
          name="roleId"
          label="角色"
          options={roleOptions}
          rules={[{ required: true, message: '请选择角色!' }]}
          width="md"
        />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
