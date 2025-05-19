import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { toast } from "react-toastify";
import useUserStore from "../store/userStore";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values);

      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-[350px] mx-auto mt-30 p-3 rounded-lg bg-white">
        <Typography.Title className="text-center" level={2}>
          Login
        </Typography.Title>
        <Form
          form={form}
          onFinish={handleLogin}
          validateTrigger={["onBlur", "onChange"]}
        >
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
