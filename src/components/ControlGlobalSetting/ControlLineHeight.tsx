import React, { useState, useEffect } from "react"
import { Button, InputNumber, Row, Col } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import { AppState } from "../../store"
import { GlobalSettingStateType } from "../../types"

const ControlLineHeight: React.FC = () => {
  const dispatch = useDispatch()
  const [selectedLineHeight, setSelectedLineHeight] = useState(2)
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  useEffect(() => {
    // 当 globalSetting.lineHeight 更改时，更新 selectedLineHeight
    setSelectedLineHeight(globalSetting.lineHeight)
  }, [globalSetting.lineHeight])

  const handleLineHeightChange = (value: number | null) => {
    let newValue = 1.5
    if (value !== null) {
      newValue = parseFloat(String(value))
      // Fix to remove trailing zeros
      newValue = parseFloat(newValue.toFixed(2))
    }
    setSelectedLineHeight(newValue)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        lineHeight: newValue,
      }),
    )
  }

  // 固定按钮宽度
  const buttonWidth = 45 // 根据实际布局调整宽度

  return (
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">
          Line height
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: "flex" }}>
            {["1", "1.5", "2"].map((lineHeight) => (
              <Button
                key={lineHeight}
                type={selectedLineHeight === parseFloat(lineHeight) ? "primary" : "default"}
                onClick={() => handleLineHeightChange(parseFloat(lineHeight))}
                style={{ width: `${buttonWidth}px`, display: "inline-flex" }}
              >
                {lineHeight}
              </Button>
            ))}
            <InputNumber
              min={1}
              max={10}
              step={0.25}
              value={selectedLineHeight}
              onChange={handleLineHeightChange}
              style={{ width: `${buttonWidth + 100}px` }} // 设置和按钮相同的宽度以保持一致
              formatter={(value) => {
                // Custom formatter to remove unnecessary zeros
                if (!value) {
                  return ""
                }
                const [integer, decimal] = value.toString().split(".")
                if (decimal && decimal.length > 0) {
                  // Only show decimal if it's not .00
                  return `${integer}.${decimal.replace(/0+$/, "")}`
                }
                return integer
              }}
            />
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlLineHeight
