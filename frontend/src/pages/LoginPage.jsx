import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [form] = Form.useForm();
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-[350px] mx-auto mt-30 p-3 rounded-lg bg-white">
        <Typography.Title className="text-center" level={2}>
          Login
        </Typography.Title>
        <Form form={form} validateTrigger={["onBlur", "onChange"]}>
          <Form.Item
            name="gmail"
            rules={[
              { required: true, message: "Vui lòng nhập Gmail" },
              { type: "email", message: "Gmail không hợp lệ" },
            ]}
          >
            <Input placeholder="Gmail" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu " }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" block>
          You haven't account? <Link to="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};
