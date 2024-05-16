import React, { useState } from "react"
import { Button, Col, Row, Switch } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { ChangeGlobalSetting } from "../../actions/GlobalSettingAction"
import { AppState } from "../../store"
import { GlobalSettingStateType } from "../../types"

const ControlGlobalBoolean: React.FC = () => {
  const dispatch = useDispatch()
  const globalSetting: GlobalSettingStateType = useSelector(
    (state: AppState) => state.globalSetting,
  )
  const [isLineBreakOn, setIsLineBreakOn] = useState(true)
  const [bulletPointStyle, setBulletPointStyle] = useState("•")

  const handleIsLineBreakOn = (value: boolean) => {
    setIsLineBreakOn(value)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        isLineBreakOn: value,
      }),
    )
  }

  const handleBulletPointChange = (style: string) => {
    setBulletPointStyle(style)
    dispatch(
      ChangeGlobalSetting({
        ...globalSetting,
        bulletPointStyle: style,
      }),
    )
  }

  return (
    <div className="control-panel">
      <Row>
        <Col span={10} className="control-label">Line break</Col>
        <Col span={14}>
          <Switch
            checked={isLineBreakOn}
            onChange={handleIsLineBreakOn}
          />
        </Col>
      </Row>
      {isLineBreakOn && (
        <Row style={{ marginTop: 10 }}>
          <Col span={10} className="control-label-layer2">Bullet Point</Col>
          <Col span={14}>
            <Button.Group>
              {["•", "#", "-"].map((style) => (
                <Button
                  key={style}
                  type={bulletPointStyle === style ? "primary" : "default"}
                  onClick={() => handleBulletPointChange(style)}
                >
                  {style}
                </Button>
              ))}
            </Button.Group>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ControlGlobalBoolean
