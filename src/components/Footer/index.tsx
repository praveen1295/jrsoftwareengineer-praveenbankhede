import { Col, Row, Image } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import "./footer.scss";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <Row className="bottom-section" align="middle">
        <Col>
          <p>Copyright 2023 | jrsoftwareenjeenir | All Rights Reserved.</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
