/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    current?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    current?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    message?: string;
    code?: number;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    message?: string;
    code?: number;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    message?: string;
    code?: number;
    data?: UserInfo;
  }

  interface Result_string_ {
    message?: string;
    code?: number;
    data?: string;
  }

  interface Result_LoginResponse_ {
    message?: string;
    code?: number;
    data?: LoginResponse;
  }

  interface Result_EmployeeInfo_ {
    message?: string;
    code?: number;
    data?: EmployeeInfo;
  }

  interface Result_PageInfo_EmployeeInfo__ {
    message?: string;
    code?: number;
    data?: PageInfo_EmployeeInfo_;
  }

  interface PageInfo_EmployeeInfo_ {
    current?: number;
    total?: number;
    list?: Array<EmployeeInfo>;
  }

  interface Result_RoleInfo_ {
    message?: string;
    code?: number;
    data?: RoleInfo;
  }

  interface Result_PageInfo_RoleInfo__ {
    message?: string;
    code?: number;
    data?: PageInfo_RoleInfo_;
  }

  interface PageInfo_RoleInfo_ {
    current?: number;
    total?: number;
    list?: Array<RoleInfo>;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }

  interface LoginRequest {
    /** 手机号 */
    phone?: string;
    /** 密码 */
    password?: string;
  }

  interface LoginResponse {
    /** token */
    token?: string;
    /** 用户信息 */
    userInfo?: UserInfo;
  }

  interface EmployeeInfo {
    /** 员工ID */
    id?: string;
    /** 员工姓名 */
    name?: string;
    /** 手机号 */
    phone?: string;
    /** 角色ID */
    roleId?: number;
    /** 角色名称 */
    roleName?: string;
    /** 状态：0-禁用，1-启用 */
    status?: number;
  }

  interface EmployeeInfoVO {
    /** 员工姓名 */
    name?: string;
    /** 手机号 */
    phone?: string;
    /** 密码 */
    password?: string;
    /** 角色ID */
    roleId?: number;
  }

  interface EmployeeUpdateVO {
    /** 员工姓名 */
    name?: string;
    /** 角色ID */
    roleId?: number;
    /** 状态：0-禁用，1-启用 */
    status?: number;
  }

  interface RoleInfo {
    /** 角色ID */
    id?: number;
    /** 角色名称 */
    name?: string;
    /** 角色代码 */
    code?: string;
    /** 角色描述 */
    description?: string;
    /** 权限ID列表 */
    permissionIds?: number[];
    /** 状态：0-禁用，1-启用 */
    status?: number;
  }

  interface RoleInfoVO {
    /** 角色名称 */
    name?: string;
    /** 角色代码 */
    code?: string;
    /** 角色描述 */
    description?: string;
    /** 权限ID列表 */
    permissionIds?: number[];
  }

  type definitions_0 = null;
}
