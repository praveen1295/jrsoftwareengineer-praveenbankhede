import React from "react";
import { Col, Row } from "antd";
import ProjectList from "./projectList";
import "./dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-heading">Dashboard</div>
      <Row align={"middle"} className="projectList-container">
        <Col span={24}>
          <ProjectList />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
