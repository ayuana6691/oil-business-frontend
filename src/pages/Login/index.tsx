import { login } from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Card, Form, Input, message } from 'antd';
import React from 'react';
import styles from './index.less';

const LoginPage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  /**
   * 处理登录
   * @param values 表单值
   */
  const handleLogin = async (values: API.LoginRequest) => {
    try {
      const { data, success } = await login(values);
      if (success && data) {
        // 保存token和用户信息
        localStorage.setItem('token', data.token || '');

        // 更新全局状态
        setInitialState({
          ...initialState,
          currentUser: data.userInfo,
        } as any);

        message.success('登录成功');
        // 跳转到首页
        history.push('/home');
      } else {
        message.error('登录失败，请检查用户名和密码');
      }
    } catch (error) {
      console.error('登录失败:', error);
      message.error('登录失败，请稍后重试');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card title="员工管理系统" className={styles.loginCard}>
        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入手机号"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
