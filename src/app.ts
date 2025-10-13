// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name?: string;
  currentUser?: API.UserInfo;
  settings?: any;
}> {
  // 从本地存储中获取token
  const token = localStorage.getItem('token');

  // 如果没有token，返回未登录状态
  if (!token) {
    return {
      name: '员工管理系统',
      currentUser: undefined,
    };
  }

  // 如果有token，可以在这里验证token并获取用户信息
  // 这里简化处理，实际项目中应该调用API验证token
  try {
    // 这里可以调用API验证token并获取用户信息
    // const userInfo = await getUserInfo();
    // return {
    //   name: '员工管理系统',
    //   currentUser: userInfo,
    // };

    // 暂时返回模拟数据
    return {
      name: '员工管理系统',
      currentUser: {
        id: '1',
        name: '管理员',
        nickName: 'admin',
        email: 'admin@example.com',
      },
    };
  } catch (error) {
    console.error('验证token失败:', error);
    // token无效，清除本地存储
    localStorage.removeItem('token');
    return {
      name: '员工管理系统',
      currentUser: undefined,
    };
  }
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
