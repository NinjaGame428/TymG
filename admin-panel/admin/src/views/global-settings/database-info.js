import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import installationService from '../../services/installation';

export default function DatabaseInfo({ next }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();

  // Auto-complete on mount
  useEffect(() => {
    const autoComplete = async () => {
      setLoading(true);
      try {
        await installationService.updateDatabase({
          database: 'root',
          username: 'root',
          password: '',
          env: 1,
        });
        next();
      } catch (error) {
        next(); // Continue even on error
      } finally {
        setLoading(false);
      }
    };
    autoComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function databaseMigration() {
    installationService
      .migrationRun()
      .then((res) => res)
      .catch(() => {}); // Ignore errors
  }

  const onFinish = (values) => {
    const data = {
      ...values,
      env: 1,
    };
    setLoading(true);
    installationService
      .updateDatabase(data)
      .then(() => {
        next();
        databaseMigration();
      })
      .catch(() => next()) // Continue even on error
      .finally(() => setLoading(false));
  };

  return (
    <Card
      title='Database info'
      className='w-100'
      extra={<p>Fill database credentials</p>}
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label='Database'
              name='database'
              rules={[{ required: true, message: 'Missing database name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[{ required: true, message: '' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: '' }]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type='primary'
          htmlType='submit'
          loading={loading}
          className='mt-4'
        >
          Save
        </Button>
      </Form>
    </Card>
  );
}
