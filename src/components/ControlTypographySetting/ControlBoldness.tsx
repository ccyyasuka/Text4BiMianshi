import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType } from "../../types"
import { AppState } from "../../store"

const ControlBoldness: React.FC = () => {
  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )
  const [isBoldnessOn, setIsBoldnessOn] = useState(true)
  // 需要更新二级boldness的显示值，当选择的实体类型改变时
  const { selectedEntityType, entityStyles } = useSelector((state: AppState) => state.typographySetting)
  useEffect(() => {
    setIsBoldnessOn(entityStyles[selectedEntityType].boldness)
  }, [selectedEntityType])

  const handleBoldnessChange = (value: boolean) => {
    setIsBoldnessOn(value)
    entityStyles[selectedEntityType].boldness = value
    // setShowSecondaryOptions(value === 'temporality')
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        boldness: value,
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
          Boldness
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "100%" }}>
            <Button
              className="custom-btn"
              type={isBoldnessOn ? "primary" : "default"}
              onClick={() => handleBoldnessChange(true)}
            >
              On
            </Button>
            <Button
              className="custom-btn"
              type={!isBoldnessOn ? "primary" : "default"}
              onClick={() => handleBoldnessChange(false)}
            >
              Off
            </Button>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlBoldness
