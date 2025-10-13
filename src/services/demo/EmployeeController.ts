/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 查询员工列表 GET /api/v1/employee/list */
export async function queryEmployeeList(
  params: {
    // query
    /** 关键词 */
    keyword?: string;
    /** 当前页 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_EmployeeInfo__>('/api/v1/employee/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建员工 POST /api/v1/employee */
export async function addEmployee(
  body?: API.EmployeeInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_EmployeeInfo_>('/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取员工详情 GET /api/v1/employee/${param0} */
export async function getEmployeeDetail(
  params: {
    // path
    /** 员工ID */
    employeeId?: string;
  },
  options?: { [key: string]: any },
) {
  const { employeeId: param0 } = params;
  return request<API.Result_EmployeeInfo_>(`/api/v1/employee/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 更新员工信息 PUT /api/v1/employee/${param0} */
export async function updateEmployee(
  params: {
    // path
    /** 员工ID */
    employeeId?: string;
  },
  body?: API.EmployeeInfoVO,
  options?: { [key: string]: any },
) {
  const { employeeId: param0 } = params;
  return request<API.Result_EmployeeInfo_>(`/api/v1/employee/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 删除员工 DELETE /api/v1/employee/${param0} */
export async function deleteEmployee(
  params: {
    // path
    /** 员工ID */
    employeeId?: string;
  },
  options?: { [key: string]: any },
) {
  const { employeeId: param0 } = params;
  return request<API.Result_string_>(`/api/v1/employee/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
