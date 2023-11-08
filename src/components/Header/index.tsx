import { Col, Row, Image, Button } from "antd";
import React from "react";
import "./navbar.scss";
import { checkIfLogin, getUserName } from "../../utils/sessionManagement";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { headerUtils, session } from "../../utils";

interface FuncProps {
  setOpen: any;
}
const Header: React.FC<FuncProps> = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = (): void => {
    session.clearSession();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <Row justify="space-between">
        <Col style={{ width: "80%", textAlign: "left" }}>
          {/* <Image
            src={"/assets/images/"}
            alt="pic"
            preview={false}
            style={{ width: "80%" }}
          /> */}
          <span className="navbarText" style={{ marginLeft: "10px" }}>
            jrsoftwareengineer
          </span>
        </Col>
        <Col>
          <Row align="middle">
            <Col className="login-btn-right">
              {checkIfLogin() ? (
                <Row align="middle" className="username">
                  <Col>
                    <Image
                      src={"/assets/images/LoginProfile.png"}
                      alt="pic"
                      preview={false}
                    />
                  </Col>
                  <Col className="myProfile-subHeadings">
                    <p
                      title={getUserName()}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        marginBottom: "0px",
                      }}
                    >
                      {getUserName()?.length > 16
                        ? getUserName().slice(0, 12) + "..."
                        : getUserName()}
                    </p>
                  </Col>
                  <Col className="myProfile-subHeadings">
                    <Button
                      type="primary"
                      size="large"
                      className="project-btn"
                      style={{ background: "#005cf6", borderRadius: "5px" }}
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                  </Col>
                </Row>
              ) : (
                <div onClick={() => setOpen(true)}>
                  <span className="navbarText">Login</span>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Header;
