import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  message,
  Typography,
  Radio,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { apiFailureAction } from "../../commonApiLogic";
import { AppDispatch, RootState } from "../../store";
import { session } from "../../utils";
import { signupAction, signupApiCall, UserCredentials } from "./logic";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiState } from "./../../index.d";
import "./login.scss";
import { getData } from "../../utils/storageService";

interface FuncProps {
  open: boolean;
  setOpen: any;
  openRegisterFrom: boolean;
  setOpenRegisterForm: any;
}
const LoginPage: React.FC<FuncProps> = ({
  open,
  setOpen,
  openRegisterFrom,
  setOpenRegisterForm,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const userLoginData: ApiState = useSelector(
    (state: RootState) => state.userLoginData
  );

  // const [openRegisterFrom, setOpenRegisterForm] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [formRef] = Form.useForm();
  const queryParam = new URLSearchParams(location.search);
  const { Link } = Typography;

  const onRegister = (values: UserCredentials): void => {
    if (values.confirmPassword !== values.password) {
      message.error("Password & confirm password doesn't match !");
      return;
    }
    setOpenRegisterForm(false);
    setOpenVerifyModal(true);
    dispatch(signupAction.userDetail(values as any));
    formRef.resetFields();
  };

  const onLogin = (values: UserCredentials): void => {
    console.log(values);
    const userDetail = getData("userDetail");
    console.log("userDetail", userDetail);
    if (
      userDetail?.email === values.email &&
      userDetail?.password === values.password
    ) {
      session.addSession({
        userName: values?.email,
        isLoggedIn: true,
        token: "erpvb12345",
      });
      navigate("/");
      setOpen(false);
      formRef.resetFields();
    } else {
      message.error("Email or Password incorrect !");
    }
  };

  return (
    <>
      <Modal
        title={
          !openRegisterFrom ? (
            <div className="modal-title">
              <p>Welcome back</p>
              <h2>Login to your account</h2>
            </div>
          ) : (
            <div className="modal-title register">
              <h2>Register new user</h2>
            </div>
          )
        }
        centered
        open={open}
        onCancel={() => {
          setOpen(false);
          setOpenRegisterForm(false);
        }}
        footer={null}
        className="login-modal"
      >
        {!openRegisterFrom ? (
          <>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onLogin}
              autoComplete="off"
              layout="vertical"
              className="modal-form"
              form={formRef}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="modal-login-input"
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    type: "regexp",
                    pattern: new RegExp(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
                    ),
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  className="modal-login-input"
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  className="modal-login-btn"
                >
                  Login
                </Button>
              </Form.Item>

              <Row
                className="row"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  gap: "10px",
                  fontSize: "16px",
                }}
              >
                Dont have an account?{" "}
                <Link onClick={() => setOpenRegisterForm(true)}>
                  {" "}
                  Join now{" "}
                </Link>
              </Row>
            </Form>
          </>
        ) : (
          <>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onRegister}
              autoComplete="off"
              layout="vertical"
              className="modal-form"
              form={formRef}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input valid email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  size="large"
                  className="modal-login-input"
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    type: "regexp",
                    pattern: new RegExp(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/g
                    ),
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  className="modal-login-input"
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  className="modal-login-input"
                  placeholder="Re-enter your password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  className="modal-login-btn"
                >
                  Register now
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default LoginPage;
