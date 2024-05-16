import React from "react"
import { Col, Row, Divider, Collapse } from "antd"
import ControlSelectedData from "./components/ControlSystemSetting/ControlSelectedData"
import ControlSelectedCards from "./components/ControlSystemSetting/ControlSelectedCards"
import ControlSelectedInsights from "./components/ControlSystemSetting/ControlSelectedInsights"

const { Panel } = Collapse

const ImportBar: React.FC = () => (
  <div
    className="panel2"
    style={{ height: "55px", display: "flex", alignItems: "center", alignContent: "center" }}
  >
    <Row
      className="control-row"
      style={{ width: "80%", paddingTop: "10px" }}
      align="middle" // 设置Row的align属性为middle来垂直居中子元素
    >
      <Col span={4} className="control-label" style={{ color: "#050404", textAlign: "center" }}>
        Select Data
      </Col>
      <Col span={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ControlSelectedData />
      </Col>
      <Col span={4} className="control-label" style={{ color: "#050404", textAlign: "center" }}>
        Select Insights
      </Col>
      <Col span={11} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ControlSelectedInsights />
      </Col>
    </Row>
  </div>
)

export default ImportBar
