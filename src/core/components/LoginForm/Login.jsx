import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "./Login.scss";
import api from "./../../../api/api";
import { setUserData } from "./../../../api/authService";

function Login() {

  const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
    
            const formData = new FormData();
    
            formData.append("Username", values.Username);
            formData.append("Password", values.Password);
    
            const response = await api.post(
                "/Auth/Login",
                formData
            );
    
            console.log(response.data);
            setUserData(response.data)
            navigate("/select-role");

          //  const result = response.data;


    
        } catch (error) {
            console.log(error);
        }
    };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="brand">
          <h1>سامانه مدیریت</h1>
          <p>وارد حساب کاربری شوید</p>
        </div>

        <Form layout="vertical" onFinish={onFinish}     onFinishFailed={onFinishFailed}>

          <Form.Item
            label="نام کاربری"
            name="Username"
            rules={[
              { required: true, message: "نام کاربری الزامی است" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="نام کاربری"
            />
          </Form.Item>

          <Form.Item
            label="رمز عبور"
            name="Password"
            rules={[
              { required: true, message: "رمز عبور الزامی است" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="رمز عبور"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox>مرا به خاطر بسپار</Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
          >
            ورود
          </Button>

        </Form>

      </div>
    </div>
  );
}

export default Login;