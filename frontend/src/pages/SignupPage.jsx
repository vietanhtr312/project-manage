import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/authApi";

export const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      const res = await registerUser(values);
      if (res.success) {
        toast.success("Đăng ký thành công!");
        navigate("/");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-sky-300">
      <div className="flex items-center justify-center min-h-screen bg-white/10">
        <div className="w-full max-w-[360px] mx-auto mt-30 p-3 px-6 bg-white rounded-lg">
          <Typography.Title className="text-center pb-6" level={2}>
            Signup
          </Typography.Title>
          <Form
            form={form}
            onFinish={handleSignup}
            validateTrigger={["onBlur", "onChange"]}
          >
            <Form.Item name="username" rules={[{ required: true }]}>
              <Input placeholder="Username" />
            </Form.Item>
  
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
              rules={[{ required: true, min: 3, message: "Ít nhất 3 ký tự" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
  
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Xác nhận lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
  
            <Form.Item>
              <Button htmlType="submit" block type="primary">
                Signup
              </Button>
            </Form.Item>
          </Form>
  
          <Button type="link" block>
            <span className="text-black">You have account?</span> <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
