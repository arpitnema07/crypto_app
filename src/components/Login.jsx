import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user !== null) {
      navigate("/home");
    }
  }, [navigate, user]);

  const onFinish = (values) => {
    Axios.post("http://localhost:100/login", values)
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/home");
        } else {
          setAlert({ type: "error", message: response.data.message });
        }
      })
      .catch((error) => {
        setAlert({ type: "error", message: error });

        console.log("Error ========>", error);
      });
  };

  return (
    <div className="login-form">
      <h1 className="login-heading">Login to CryptoPedia</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
          Forgot password
        </a>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>

        <Alert type={alert.type} message={alert.message} />
      </Form>
    </div>
  );
};

export default Login;
