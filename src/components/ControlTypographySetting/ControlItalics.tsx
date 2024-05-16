import React, { useState, useEffect } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType } from "../../types"
import { AppState } from "../../store"

const ControlItalics: React.FC = () => {
  const [isItalicsOn, setIsItalicsOn] = useState(false)

  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )

  const { selectedEntityType, entityStyles } = useSelector((state: AppState) => state.typographySetting)
  useEffect(() => {
    setIsItalicsOn(entityStyles[selectedEntityType].italics)
  }, [selectedEntityType])

  const handleItalicsChange = (value: boolean) => {
    setIsItalicsOn(value)
    // setShowSecondaryOptions(value === 'temporality')
    entityStyles[selectedEntityType].italics = value
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        italics: value,
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
          Italics
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "100%" }}>
            <Button
              className="custom-btn"
              type={isItalicsOn ? "primary" : "default"}
              onClick={() => handleItalicsChange(true)}
            >
              On
            </Button>
            <Button
              className="custom-btn"
              type={!isItalicsOn ? "primary" : "default"}
              onClick={() => handleItalicsChange(false)}
            >
              Off
            </Button>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlItalics
