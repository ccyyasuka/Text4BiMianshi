import React, { useState, useEffect } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType, GlobalSettingStateType } from "../../types"
import { AppState } from "../../store"

const ControlUnderline: React.FC = () => {
  const [isUnderlineOn, setIsUnderlineOn] = useState(false)

  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )
  const { selectedEntityType, entityStyles } = useSelector((state: AppState) => state.typographySetting)
  useEffect(() => {
    setIsUnderlineOn(entityStyles[selectedEntityType].underline)
  }, [selectedEntityType])

  const handleUnderlineChange = (value: boolean) => {
    setIsUnderlineOn(value)
    // setShowSecondaryOptions(value === 'temporality')
    entityStyles[selectedEntityType].underline = value
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        underline: value,
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
          Underline
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "100%" }}>
            <Button
              className="custom-btn"
              type={isUnderlineOn ? "primary" : "default"}
              onClick={() => handleUnderlineChange(true)}
            >
              On
            </Button>
            <Button
              className="custom-btn"
              type={!isUnderlineOn ? "primary" : "default"}
              onClick={() => handleUnderlineChange(false)}
            >
              Off
            </Button>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlUnderline
