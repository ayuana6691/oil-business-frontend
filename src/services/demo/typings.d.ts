/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<Record<string, any>>;
  }

  interface PageInfo_UserInfo_ {
    /** 
1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_UserInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_UserInfo_;
  }

  interface Result_UserInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: UserInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  interface Result_LoginResponse_ {
    success?: boolean;
    errorMessage?: string;
    data?: LoginResponse;
  }

  interface Result_EmployeeInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: EmployeeInfo;
  }

  interface Result_PageInfo_EmployeeInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_EmployeeInfo_;
  }

  interface PageInfo_EmployeeInfo_ {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<EmployeeInfo>;
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
    /** 邮箱 */
    email?: string;
    /** 部门 */
    department?: string;
    /** 职位 */
    position?: string;
    /** 入职时间 */
    joinDate?: string;
    /** 状态 */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  interface EmployeeInfoVO {
    /** 员工姓名 */
    name?: string;
    /** 手机号 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 部门 */
    department?: string;
    /** 职位 */
    position?: string;
    /** 入职时间 */
    joinDate?: string;
    /** 状态 */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  type definitions_0 = null;
}
