import React, { useState } from "react"
import { Button, Row, Col, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import { AppState } from "../../store"
import { GlobalSettingStateType } from "../../types"

const ControlTextPosition: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const [showBigGraph, setShowBigGraph] = useState(true) // State to control visibility
  const [selectedPosition, setSelectedPosition] = useState("vertical")
  const handleChangeTextPosition = (newPosition: string) => {
    setSelectedPosition(newPosition)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        textPosition: newPosition,
      }),
    )
  }

  const handleShowBigGraph = (newShowBigGraph: boolean) => {
    setShowBigGraph(newShowBigGraph)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        showBigGraph: newShowBigGraph,
      }),
    )
  }

  // Calculate the button width dynamically based on the text content
  const calculateButtonWidth = (text: string) => {
    const characterWidth = 8 // Average width of character in pixels; adjust as needed for your font
    const padding = 16 // Total horizontal padding for button
    return text.length * characterWidth + padding
  }

  return (
    <div className="control-panel">
      <Row align="middle" style={{ paddingBottom: 10 }}>
        <Col span={10} className="control-label">
          Normal-sized vis
        </Col>
        <Col span={14}>
          <Switch checked={showBigGraph} onChange={handleShowBigGraph} />
        </Col>
      </Row>
      <Row
        align="middle"
        style={{
          transition: "max-height 0.3s ease",
          maxHeight: showBigGraph ? "100px" : "0", // Adjust max height
          overflow: "hidden",
        }}
      >
        <Col span={10} className="control-label-layer2">
          Vis-text layout
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: "flex", width: "100%" }}>
            {/* <Button
              className={`custom-btn ${selectedPosition === "vertical" ? "primary" : "default"}`}
              onClick={() => handleChangeTextPosition("vertical")}
              style={{ width: calculateButtonWidth("vertical") }}
            >
              vertical
            </Button>
            <Button
              className={`custom-btn ${selectedPosition === "parallel" ? "primary" : "default"}`}
              onClick={() => handleChangeTextPosition("parallel")}
              style={{ width: calculateButtonWidth("parallel") }}
            >
              parallel
            </Button> */}
            {["vertical", "parallel"].map((position) => (
              <Button
                key={position}
                type={selectedPosition === position ? "primary" : "default"}
                onClick={() => handleChangeTextPosition(position)}
                style={{
                  width: calculateButtonWidth(position),
                  display: "inline-flex",
                  // minWidth: position === 'parallel' ? '100px' : 'auto', // 设置最小宽度
                }} // Set width based on text length
              >
                {position}
              </Button>
            ))}
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlTextPosition
