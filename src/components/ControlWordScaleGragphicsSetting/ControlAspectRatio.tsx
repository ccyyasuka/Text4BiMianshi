import React, { useState } from "react"
import { Button, Row, Col, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeWordScaleGraphicsSetting } from "../../actions/wordScaleGraphicsSettingAction"
import { AppState } from "../../store"
import { wordScaleGraphicsSettingStateType } from "../../types"

const { Option } = Select

const ControlAspectRatio: React.FC = () => {
  const dispatch = useDispatch()
  const wordScaleGraphicsSetting: wordScaleGraphicsSettingStateType = useSelector(
    (state: AppState) => state.wordScaleGraphicsSetting,
  )
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("4:1")
  // 下拉框显示的值
  const [dropdownDisplay, setDropdownDisplay] = useState("...")

  const handleChangeAspectRatio = (ratio: string) => {
    setSelectedAspectRatio(ratio)
    setDropdownDisplay(ratio) // 同时更改下拉框的显示
    dispatch(
      ChangeWordScaleGraphicsSetting({
        ...wordScaleGraphicsSetting,
        aspectRatio: ratio,
      }),
    )
  }

  const aspectRatios = {
    "1:1": "tiny",
    "2:1": "medium",
    "4:1": "big",
  }
  // 固定按钮宽度
  const buttonWidth = 30 // 按布局需要调整

  return (
    <div className="control-panel">
      <Row align="middle">
        <Col span={10} className="control-label-layer2">
          Sizing
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: "flex", width: "100%" }}>
            {["1:1", "2:1", "4:1"].map((ratio) => (
              <Button
                key={ratio}
                type={selectedAspectRatio === ratio ? "primary" : "default"}
                onClick={() => {
                  handleChangeAspectRatio(ratio)
                  setDropdownDisplay("...") // 点击按钮后重置下拉框显示
                }}
                style={{
                  flex: 1,
                  // borderRight: ratio !== 'big' ? 'none' : undefined,
                  textAlign: "center", // Ensure the text is centered
                  width: `${buttonWidth}px`, // 设置固定宽度
                  display: "inline-flex",
                }}
              >
                {ratio}
              </Button>
            ))}
            <Select
              style={{ width: `${buttonWidth + 50}px`, textAlign: "center" }}
              value={dropdownDisplay} // 下拉框显示的值
              onChange={handleChangeAspectRatio}
              onFocus={() => setDropdownDisplay(selectedAspectRatio)} // 聚焦时显示实际选中的值
              onBlur={() => setDropdownDisplay("...")} // 失焦时显示....
            >
              {["4:3", "16:9", "6:1", "8:1", "10:1"].map((ratio) => (
                <Option key={ratio} value={ratio}>
                  {ratio}
                </Option>
              ))}
            </Select>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlAspectRatio
