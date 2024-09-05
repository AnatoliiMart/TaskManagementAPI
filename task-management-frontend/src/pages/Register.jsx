import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await registerUser(values);
      message.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: '400px', margin: '100px auto' }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="passwordHash"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
