/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 登录接口 POST /api/v1/login */
export async function login(
  body?: API.LoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.Result_LoginResponse_>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出接口 POST /api/v1/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.Result_>('/api/v1/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
