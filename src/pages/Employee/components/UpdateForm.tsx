import { queryRoleList } from '@/services';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: API.EmployeeUpdateVO) => Promise<boolean>;
  updateModalVisible: boolean;
  values: Partial<API.EmployeeInfo>;
};

export type FormValueType = {
  id?: string;
  name?: string;
  roleId?: number;
  status?: number;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { updateModalVisible, onCancel, onSubmit, values } = props;
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
    if (updateModalVisible) {
      loadRoles();
    }
  }, [updateModalVisible]);

  return (
    <Modal
      title="编辑员工"
      open={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm
        layout="vertical"
        initialValues={values}
        onFinish={async (value) => {
          const success = await onSubmit(value as API.EmployeeUpdateVO);
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
        <ProFormSelect
          name="roleId"
          label="角色"
          options={roleOptions}
          rules={[{ required: true, message: '请选择角色!' }]}
          width="md"
        />
        <ProFormSelect
          name="status"
          label="启用状态"
          options={[
            { value: 1, label: '启用' },
            { value: 0, label: '禁用' },
          ]}
          rules={[{ required: true, message: '请选择状态!' }]}
          width="md"
        />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
