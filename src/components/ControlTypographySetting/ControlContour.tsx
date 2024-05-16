import React, { useState, useEffect } from "react"
import { Button, Col, Row } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeTypographySetting } from "../../actions/typographySettingAction"
import { typographySettingStateType, GlobalSettingStateType } from "../../types"
import { AppState } from "../../store"

const ControlContour: React.FC = () => {
  const [isContourOn, setIsContourOn] = useState(false)
  const dispatch = useDispatch()
  const typographySetting: typographySettingStateType = useSelector(
    (state: AppState) => state.typographySetting,
  )

  const { selectedEntityType, entityStyles } = useSelector((state: AppState) => state.typographySetting)
  useEffect(() => {
    setIsContourOn(entityStyles[selectedEntityType].contour)
  }, [selectedEntityType])

  const toggleGlobalSetting = (value: boolean) => {
    // console.log("Before dispatch, isContourOn:", isContourOn)
    setIsContourOn(value)
    // console.log("After setIsContourOn, isContourOn:", value)
    entityStyles[selectedEntityType].contour = value
    dispatch(
      ChangeTypographySetting({
        ...typographySetting,
        contour: value,
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
          Contour
        </Col>
        <Col span={14}>
          <Button.Group style={{ width: "100%" }}>
            <Button
              className="custom-btn"
              type={isContourOn ? "primary" : "default"}
              onClick={() => toggleGlobalSetting(true)}
            >
              On
            </Button>
            <Button
              className="custom-btn"
              type={!isContourOn ? "primary" : "default"}
              onClick={() => toggleGlobalSetting(false)}
            >
              Off
            </Button>
          </Button.Group>
        </Col>
      </Row>
    </div>
  )
}

export default ControlContour
