/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/**
 * 查询员工列表
 * @param params 查询参数
 */
export async function queryEmployeeList(
  params: {
    /** 关键词（手机号或姓名） */
    keyword?: string;
    /** 状态筛选（0-禁用，1-启用） */
    status?: string;
    /** 角色ID筛选 */
    roleId?: string;
    /** 页码 */
    page?: number;
    /** 每页数量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_EmployeeInfo__>('/api/admin/employees', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 创建员工
 * @param body 员工信息
 */
export async function addEmployee(
  body?: API.EmployeeInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_EmployeeInfo_>('/api/admin/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 获取员工详情
 * @param params 员工ID
 */
export async function getEmployeeDetail(
  params: {
    /** 员工ID */
    employeeId?: string;
  },
  options?: { [key: string]: any },
) {
  const { employeeId: param0 } = params;
  return request<API.Result_EmployeeInfo_>(`/api/admin/employees/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/**
 * 更新员工信息
 * @param params 员工ID
 * @param body 员工信息（仅包含name, roleId, status）
 */
export async function updateEmployee(
  params: {
    /** 员工ID */
    employeeId?: string;
  },
  body?: API.EmployeeUpdateVO,
  options?: { [key: string]: any },
) {
  const { employeeId: param0 } = params;
  return request<API.Result_EmployeeInfo_>(`/api/admin/employees/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/**
 * 删除员工
 * @param params 员工ID
 */
export async function deleteEmployee(
  params: {
    /** 员工ID */
    employeeId?: string;
  },
  options?: { [key: string]: any },
) {
  const { employeeId: param0 } = params;
  return request<API.Result_string_>(`/api/admin/employees/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
