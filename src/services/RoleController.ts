import { request } from '@umijs/max';

/**
 * 查询角色列表
 * @param params 查询参数
 */
export async function queryRoleList(
  params: {
    /** 关键词（角色名称或代码） */
    keyword?: string;
    /** 状态筛选（0-禁用，1-启用） */
    status?: string;
    /** 页码 */
    page?: number;
    /** 每页数量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_RoleInfo__>('/api/admin/roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 创建角色
 * @param body 角色信息
 */
export async function addRole(
  body?: API.RoleInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_RoleInfo_>('/api/admin/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 获取角色详情
 * @param params 角色ID
 */
export async function getRoleDetail(
  params: {
    /** 角色ID */
    roleId?: number;
  },
  options?: { [key: string]: any },
) {
  const { roleId: param0 } = params;
  return request<API.Result_RoleInfo_>(`/api/admin/roles/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/**
 * 更新角色信息
 * @param params 角色ID
 * @param body 角色信息
 */
export async function updateRole(
  params: {
    /** 角色ID */
    roleId?: number;
  },
  body?: API.RoleInfoVO,
  options?: { [key: string]: any },
) {
  const { roleId: param0 } = params;
  return request<API.Result_RoleInfo_>(`/api/admin/roles/${param0}`, {
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
 * 删除角色
 * @param params 角色ID
 */
export async function deleteRole(
  params: {
    /** 角色ID */
    roleId?: number;
  },
  options?: { [key: string]: any },
) {
  const { roleId: param0 } = params;
  return request<API.Result_string_>(`/api/admin/roles/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
