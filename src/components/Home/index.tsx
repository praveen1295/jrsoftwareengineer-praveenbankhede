import { Col, Row, Image } from "antd";
import React from "react";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Row justify="space-between" align="middle" className="section-1">
        <Col className="section-1-left" span={7}>
          <h3
            style={{
              color: "black",
              fontWeight: 1000,
              fontSize: 22,
            }}
          ></h3>
          <h3
            style={{
              color: "#db4743",
              fontSize: 35,
              fontWeight: 500,
            }}
          ></h3>
          <h3
            style={{
              fontSize: 35,
              fontWeight: 1000,
              width: 300,
            }}
          ></h3>
        </Col>
        <Col>
          <Image
            src={"/assets/images/Dashboard.png"}
            alt="Pic"
            preview={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
