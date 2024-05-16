import React, { useState, useEffect } from "react"
import { App, ColorPicker, Row, Col } from "antd"
import type { ColorPickerProps, Color } from "antd/es/color-picker"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType, GlobalSettingStateType } from "../../types"
import { AppState } from "../../store"

const ControlBackgroundColor = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<ColorPickerProps["value"]>("#fff")
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )

  const { selectedEntityType, entityStyles } = useSelector((state: AppState) => state.typographySetting)
  useEffect(() => {
    setValue(entityStyles[selectedEntityType].backgroundColor)
  }, [selectedEntityType])
  const handleChangeColor = (backgroundColor: Color) => {
    const hexColor = backgroundColor.toHexString() // 去除 '#' 符号
    // console.log('Selected HEX Color:', hexColor)
    setValue(hexColor)
    entityStyles[selectedEntityType].backgroundColor = String(hexColor)
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        backgroundColor: String(hexColor),
        entityStyles: {
          ...entityStyles,
        },
      }),
    )
  }
  return (
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">
          Background color
        </Col>
        <Col span={14}>
          <App>
            <ColorPicker value={value} onChangeComplete={handleChangeColor} />
          </App>
        </Col>
      </Row>
    </div>
  )
}

export default ControlBackgroundColor
