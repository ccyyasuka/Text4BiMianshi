import React, { useState } from "react"
import { Button, Row, Col, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import { AppState } from "../../store"
import { GlobalSettingStateType } from "../../types"

const { Option } = Select

const ControlFont: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  // 选中的字体大小
  const [selectedFontSize, setSelectedFontSize] = useState("16px")
  // 下拉框显示的值
  const [dropdownDisplay, setDropdownDisplay] = useState("...")

  const handleFontSizeChange = (size: string) => {
    setSelectedFontSize(size) // 设置选中的字体大小
    setDropdownDisplay(size) // 同时更改下拉框的显示

    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        fontsize: size,
      }),
    )
  }

  // 生成字体大小选项的数组
  const fontSizeOptions = []
  for (let i = 10; i <= 25; i += 1) {
    fontSizeOptions.push(<Option key={`${i}px`} value={`${i}px`}>{`${i}px`}</Option>)
  }

  // 固定按钮宽度
  const buttonWidth = 52 // 按布局需要调整

  return (
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">
          Font size
        </Col>
        <Col span={14}>
          <Button.Group style={{ display: "flex", textAlign: "center" }}>
            {["14px", "15px", "16px"].map((size) => (
              <Button
                key={size}
                type={selectedFontSize === size ? "primary" : "default"}
                onClick={() => {
                  handleFontSizeChange(size)
                  setDropdownDisplay("...") // 点击按钮后重置下拉框显示
                }}
                style={{ width: `${buttonWidth}px`, display: "inline-flex", textAlign: "center", justifyContent: "center", alignItems: "center" }} // 设置固定宽度
              >
                {size}
              </Button>
            ))}
            <Select
              value={dropdownDisplay} // 下拉框显示的值
              style={{ width: `${buttonWidth + 20}px` }}
              onChange={handleFontSizeChange}
              dropdownMatchSelectWidth={false}
              onFocus={() => setDropdownDisplay(selectedFontSize)} // 聚焦时显示实际选中的值
              // onBlur={() => setDropdownDisplay("....")} // 失焦时显示....
            >
              {fontSizeOptions}
            </Select>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlFont
