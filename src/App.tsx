import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";

import AuthRoutes from "./components/AuthRoute";
import { Layout, Space, Spin } from "antd";
import { checkIfLogin } from "./utils/sessionManagement";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Login = React.lazy(() => import("./components/Login"));

function App() {
  const [open, setOpen] = useState<any>(false);
  const [login, setLogin] = useState<any>(false);
  const [openRegisterFrom, setOpenRegisterForm] = useState(false);

  useEffect(() => {
    // setLogin(checkIfLogin());
  }, [open]);
  return (
    <div className="App">
      <ErrorBoundary>
        <Layout>
          <Layout>
            <Layout.Content>
              <Suspense
                fallback={
                  <Space size="large" align="center">
                    <Spin size="large" />
                  </Space>
                }
              >
                <Header
                  setOpen={setOpen}
                  setOpenRegisterForm={setOpenRegisterForm}
                />
                <Login
                  open={open}
                  setOpen={setOpen}
                  openRegisterFrom={openRegisterFrom}
                  setOpenRegisterForm={setOpenRegisterForm}
                />

                <Routes>
                  {!checkIfLogin() && (
                    <Route path="/login" element={<Home />} />
                  )}

                  <Route element={<AuthRoutes />}>
                    <Route path="/" element={<Dashboard />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </Suspense>
            </Layout.Content>
          </Layout>
        </Layout>
      </ErrorBoundary>
    </div>
  );
}

export default App;
