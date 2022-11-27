import React, { useState } from "react";

import { Button, Card, Form, Input, Layout, Typography } from "antd";

import Box from "../../atoms/Box";
import LoginBg from "../../../assets/login_bg.jpg";
import { LoginPayload } from "../../../domain/auth/types";
import useLogin from "../../../domain/auth/useLogin";
import { AxiosError, isAxiosError } from "axios";

const { Title, Text } = Typography;
const { Content } = Layout;

const Login = () => {
  const login = useLogin();
  const [authError, setAuthError] = useState("");

  const onFinish = (values: LoginPayload) => {
    setAuthError("");
    login.mutate(values, {
      onError: (error) => {
        if (isAxiosError(error)) {
          setAuthError(error.response?.data.message);
        } else {
          setAuthError("Ocorreu um erro, tente novamente");
        }
      },
    });
  };

  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        params={{
          flexBasis: "60%",
          background: `#ffffff url(${LoginBg}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      ></Box>
      <Content style={{ padding: "0 50px" }}>
        <Box
          params={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Title style={{ textAlign: "center" }} italic level={2}>
            #WEGOGYM
          </Title>
          <Card>
            <Form
              requiredMark={false}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Insira seu email!" },
                  { type: "email", message: "Email inválido!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: "Insira sua senha!" }]}
              >
                <Input type="password" />
              </Form.Item>

              <Text type="danger">{authError}</Text>
              <Form.Item>
                <Button
                  loading={login.isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Box>
      </Content>
    </Layout>
  );
};

export default Login;
