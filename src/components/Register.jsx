import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, SafetyOutlined, UserOutlined } from "@ant-design/icons";
import Axios from "axios";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user !== null) {
      navigate("/home");
    }
  }, [navigate, user]);

  const [alert, setAlert] = useState({ type: "", message: "" });
  const onFinish = (values) => {
    Axios.post("http://localhost:100/register", values)
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          setAlert({ type: "error", message: response.data.message });
        }
      })
      .catch((error) => {
        setAlert({ type: "error", message: error });
        console.log("Error ========>", error);
      });
    console.log("Received values of form: ", values);
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-form">
      <h1 className="login-heading">Register on CryptoPedia</h1>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Full Name!",
            },
          ]}
        >
          <Input
            placeholder="Full Name"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            placeholder="Username"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="E-Mail" prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" prefix={<SafetyOutlined />} />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            prefix={<SafetyOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          Or <a href="/">Login!</a>
        </Form.Item>

        <Alert type={alert.type} message={alert.message} />
      </Form>
    </div>
  );
};

export default Register;
