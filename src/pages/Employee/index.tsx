import {
  addEmployee,
  deleteEmployee,
  queryEmployeeList,
  queryRoleList,
  updateEmployee,
} from '@/services';
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
import React, { useEffect, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

/**
 * 添加员工
 * @param fields 员工信息
 */
const handleAdd = async (fields: API.EmployeeInfoVO) => {
  const hide = message.loading('正在添加');
  try {
    await addEmployee(fields);
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
const handleUpdate = async (fields: FormValueType, employeeId: string) => {
  const hide = message.loading('正在更新');
  try {
    await updateEmployee(
      {
        employeeId,
      },
      {
        name: fields.name,
        roleId: fields.roleId,
        status: fields.status,
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
  const [roleMap, setRoleMap] = useState<Record<number, string>>({});

  const loadRoles = async () => {
    try {
      const response = await queryRoleList({
        pageSize: 100,
      });
      if (response.data?.list) {
        const map: Record<number, string> = {};
        response.data.list.forEach((role) => {
          if (role.id) {
            map[role.id] = role.name || '';
          }
        });
        setRoleMap(map);
      }
    } catch (error) {
      console.error('加载角色列表失败:', error);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const columns: ProColumns<API.EmployeeInfo>[] = [
    {
      title: '员工姓名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: Object.keys(roleMap).map((key) => ({
          label: roleMap[Number(key)],
          value: Number(key),
        })),
      },
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      hideInSearch: true,
      render: (_, record) => {
        return record.roleId ? roleMap[record.roleId] || record.roleName : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        0: { text: '禁用', status: 'Error' },
      },
      render: (_, record) => (
        <Tag color={record.status === 1 ? 'green' : 'red'}>
          {record.status === 1 ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyword',
      hideInTable: true,
      hideInDescriptions: true,
      fieldProps: {
        placeholder: '手机号或姓名',
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
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
      title: '角色',
      dataIndex: 'roleName',
      render: (_, record) => {
        return record.roleId ? roleMap[record.roleId] || record.roleName : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => (
        <Tag color={record.status === 1 ? 'green' : 'red'}>
          {record.status === 1 ? '启用' : '禁用'}
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
        request={async (params) => {
          const { current, pageSize, keyword, status, roleId } = params;
          const { data, code } = await queryEmployeeList({
            page: current,
            pageSize,
            keyword,
            status: status as string,
            roleId: roleId as string,
          });
          return {
            data: data?.list || [],
            success: code === 200,
            total: data?.total || 0,
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
        onSubmit={async (value: API.EmployeeInfoVO) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return success;
        }}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value: API.EmployeeUpdateVO) => {
            const success = await handleUpdate(value, stepFormValues.id || '');
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
