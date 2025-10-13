import {
  addEmployee,
  deleteEmployee,
  queryEmployeeList,
  updateEmployee,
} from '@/services/demo';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

/**
 * 添加员工
 * @param fields 员工信息
 */
const handleAdd = async (fields: API.EmployeeInfo) => {
  const hide = message.loading('正在添加');
  try {
    await addEmployee({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    console.error('添加员工失败:', error);
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新员工信息
 * @param fields 员工信息
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateEmployee(
      {
        employeeId: fields.id || '',
      },
      {
        name: fields.name || '',
        phone: fields.phone || '',
        email: fields.email || '',
        department: fields.department || '',
        position: fields.position || '',
        joinDate: fields.joinDate || '',
        status: fields.status || 'ACTIVE',
      },
    );
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    console.error('更新员工失败:', error);
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 * 删除员工
 * @param selectedRows 选中的员工
 */
const handleRemove = async (selectedRows: API.EmployeeInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteEmployee({
      employeeId: selectedRows.find((row) => row.id)?.id || '',
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    console.error('删除员工失败:', error);
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const EmployeeList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState<
    Partial<API.EmployeeInfo>
  >({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.EmployeeInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.EmployeeInfo[]>([]);

  const columns: ProColumns<API.EmployeeInfo>[] = [
    {
      title: '员工姓名',
      dataIndex: 'name',
      tip: '员工姓名是唯一的标识',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '员工姓名为必填项',
          },
        ],
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '手机号为必填项',
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号',
          },
        ],
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            type: 'email',
            message: '请输入有效的邮箱地址',
          },
        ],
      },
    },
    {
      title: '部门',
      dataIndex: 'department',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '部门为必填项',
          },
        ],
      },
    },
    {
      title: '职位',
      dataIndex: 'position',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '职位为必填项',
          },
        ],
      },
    },
    {
      title: '入职时间',
      dataIndex: 'joinDate',
      valueType: 'date',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '入职时间为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        ACTIVE: { text: '在职', status: 'Success' },
        INACTIVE: { text: '离职', status: 'Error' },
      },
      render: (_, record) => (
        <Tag color={record.status === 'ACTIVE' ? 'green' : 'red'}>
          {record.status === 'ACTIVE' ? '在职' : '离职'}
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setRow(record);
            }}
          >
            详情
          </a>
        </>
      ),
    },
  ];

  const descriptionColumns: ProDescriptionsItemProps<API.EmployeeInfo>[] = [
    {
      title: '员工姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '部门',
      dataIndex: 'department',
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '入职时间',
      dataIndex: 'joinDate',
      valueType: 'date',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => (
        <Tag color={record.status === 'ACTIVE' ? 'green' : 'red'}>
          {record.status === 'ACTIVE' ? '在职' : '离职'}
        </Tag>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '员工管理',
      }}
    >
      <ProTable<API.EmployeeInfo>
        headerTitle="员工列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建员工
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryEmployeeList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
            total: data?.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.EmployeeInfo, API.EmployeeInfo>
          onSubmit={async (value: API.EmployeeInfo) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value: FormValueType) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
            return success;
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.EmployeeInfo>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={descriptionColumns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default EmployeeList;
